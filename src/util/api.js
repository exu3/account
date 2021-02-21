import { print } from 'graphql';
import { apiFetch } from '@codeday/topo/utils';

export async function tryAuthenticatedApiQuery(gql, params, token) {
  const headers = {
    'Account-Authorization': `Bearer ${token}`,
  };

  try {
    return {
      result: await apiFetch(print(gql), params || {}, token ? headers : {}),
    };
  } catch (err) {
    return { error: err };
  }
}

export async function tryAuthenticatedServerApiQuery(gql, params, token) {
  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  try {
    return {
      result: await apiFetch(print(gql), params || {}, token ? headers : {}),
    };
  } catch (err) {
    return { error: err };
  }
}
