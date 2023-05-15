import fetch from 'node-fetch';

import config from '../resources/config.json' assert { type: 'json' };

const processAuthResponse = (error, meta, body) => {
  if (error) {
    // TODO: Handle error scenarios
  }

  // TODO: Handle success
  return {
    ok: true,
    data: {
      body,
      meta
    }
  };
};

export const authService = async (requestToken) => {
  let url = 'https://github.com/login/oauth/access_token';

  url += `?client_id=${config.auth.client_id}`;
  url += `&client_secret=${config.auth.client_secret}`;
  url += `&code=${requestToken}`;

  const options = {
    method: 'POST',
    // mode: 'cors',
    headers: {
      // 'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/json'
    }
  };

  const fetchResponse = await fetch(url, options);
  const data = await fetchResponse.json();
  const accessToken = data['access_token'];

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
    data: {
      token: accessToken
    }
  };
};
