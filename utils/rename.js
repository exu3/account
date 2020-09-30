import { managementApi } from '../lib/auth0';

export async function rename(id, newUsername) {
  await managementApi.updateUser({ id }, { username: newUsername, nickname: newUsername });
}
