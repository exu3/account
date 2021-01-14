import { tryAuthenticatedApiQuery } from "../../util/api";
import { UpdateUserProfileMutation, AddRoleToUserMutation, SetDisplayedBadgesMutation } from './update.gql';
import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import phone from 'phone';

const { serverRuntimeConfig } = getConfig();

export default async (req, res) => {
    let token = req && req.query && req.query.token;
    const { body } = req;
    const userId = jwt.verify(token, serverRuntimeConfig.auth0.hookSharedSecret).id
    
    if (!userId) return res.status(400).send({ error: "You don't have permission to do this, please refresh the page and try again." });
    let updates = body;
    delete updates._meta
    if (updates.addRole) {
        if (serverRuntimeConfig.volunteerCode.split(/,/g).includes(updates.addRole)) {
            let { result, error } = await tryAuthenticatedApiQuery(AddRoleToUserMutation, { id: "", roleId: serverRuntimeConfig.auth0.volunteerRole }, token);
            if (error) {
                return res.status(400).send({ error: "There was an error while giving you the volunteer role." });
            }
            delete updates.addRole
        } else if (serverRuntimeConfig.mentorCode.split(/,/g).includes(updates.addRole)) {
            let { result, error } = await tryAuthenticatedApiQuery(AddRoleToUserMutation, { id: "", roleId: serverRuntimeConfig.auth0.mentorRole }, token);
            if (error) {
                return res.status(400).send({ error: "There was an error while giving you the mentor role." });
            }
            delete updates.addRole
        } else return res.status(400).send({ error: `${updates.addRole} is not a volunteer code.` });
    }
    if (updates.badges) {
        updates.badges = updates.badges.filter((el) => el.displayed)
        let { result, error } = await tryAuthenticatedApiQuery(SetDisplayedBadgesMutation, { badges: updates.badges.map((badge) => ({ id: badge.id, order: badge.order })) }, token);
        if (error) {
            return res.status(400).send({ error: "There was an error while changing your displayed badges." });
        }
        delete updates.badges
    }
    if (updates.phoneNumber) {
        updates.phoneNumber = phone(updates.phoneNumber)[0]
    }
    if (Object.keys(updates).length > 0) {
        let { result, error } = await tryAuthenticatedApiQuery(UpdateUserProfileMutation, { updates: { ...updates } }, token);
        if (error) {
            return res.status(400).send({ error: error.response.errors[0].message });
        }
    }
    return res.send({ ok: true });
}