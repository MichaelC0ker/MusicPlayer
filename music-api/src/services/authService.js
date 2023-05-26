import fetch from 'node-fetch';

import config from '../resources/config.json' assert { type: 'json' };
import { addUser } from './userService.js';

export const getUserData = async (email) => {
  try {
    const userId = addUser(email);

    return {
      ok: true,
      data: {
        id: userId
      }
    };
  } catch (e) {
    return {
      ok: false,
      data: {
        message: 'could not authenticate user',
        error: e.message
      }
    };
  }
};

export const getAccessToken = async (requestToken) => {
  let url = 'https://github.com/login/oauth/access_token';

  url += `?client_id=${config.auth.client_id}`;
  url += `&client_secret=${config.auth.client_secret}`;
  url += `&code=${requestToken}`;

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    }
  };

  const fetchResponse = await fetch(url, options);
  const data = await fetchResponse.json();
  const accessToken = data.access_token;

  if (!accessToken) {
    return {
      ok: false,
      data: {
        error: data.error ?? 'Failed to get access token',
        reason: data.error_description ?? 'No description available'
      },
      status: 500
    };
  }

  return {
    ok: true,
    data: await getUserData(accessToken)
  };
};
