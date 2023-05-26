import httpStatus from 'http-status-codes';
import * as AuthService from '../services/authService.js';
import { queryParamExtrator } from '../utils/requestHelper.js';

export const getUserData = async (req) => {
  const headers = req.headers;

  let username;

  let isValidRequest = !headers || !headers.user || headers.user === '';

  try {
    username = headers.user;
  } catch {
    isValidRequest = false;
  }

  if (!isValidRequest) {
    return {
      status: httpStatus.BAD_REQUEST,
      data: 'Failed to get request token from request'
    };
  }

  const response = await AuthService.getUserData(username);

  if (!response || !response.ok) {
    const status = response.data.error === 'bad_verification_code'
      ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;

    return {
      ...response,
      status: status
    };
  }

  return {
    ok: true,
    headers: {
      user: response.data.token
    }
  };
};

export const getAccessToken = async (req) => {
  const queryParameters = queryParamExtrator(req.url);

  if (!queryParameters || !queryParameters.code) {
    return {
      status: httpStatus.BAD_REQUEST,
      data: 'Failed to get request token from request'
    };
  }

  try {
    const response = await AuthService.getAccessToken(queryParameters.code);

    if (!response || !response.ok) {
      const status = response.data.error === 'bad_verification_code'
        ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;

      return {
        ...response,
        status: status
      };
    }

    return await getUserData({ headers: response.data.token });
  } catch (err) {
    return {
      ok: false,
      data: {
        error: err.message ?? 'No error description found'
      }
    };
  }
};
