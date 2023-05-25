import fetch from 'node-fetch';

import config from '../resources/config.json' assert { type: 'json' };
import { addUser } from '../data/client';

export const getUserData = async (accessToken) => {
  const url = 'https://api.github.com/user';

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  };

  const fetchResponse = await fetch(url, options);
  const data = await fetchResponse.json();

  if (fetchResponse.status !== 200) {
    return {
      ok: false,
      data: data
    };
  }

  addUser(data.id, data.email, data.name);

  return {
    ok: true,
    data: {
      email: data.email
    }
  };
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
