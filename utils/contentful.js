import getConfig from 'next/config';
import axios from 'axios';

const { serverRuntimeConfig } = getConfig();

export const getSites = async (types) => {
  try {
    const base = `https://cdn.contentful.com/spaces/${serverRuntimeConfig.contentful.spaceId}/environments/master`;
    const url = `${base}/entries?content_type=site&access_token=${serverRuntimeConfig.contentful.token}`;
    const result = await axios.get(url);
    return result.data.items.map((item) => item.fields).filter((site) => types.includes(site.type));
  } catch (ex) {
    return [];
  }
};
