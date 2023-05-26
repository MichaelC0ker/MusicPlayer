import httpStatus from 'http-status-codes';
import btoa from 'btoa';
import * as AuthService from '../services/authService.js';
import { queryParamExtrator } from '../utils/requestHelper.js';
import { addUser } from '../services/userService.js';

export const getUserData = async (req) => {
  const headers = req.headers;

  let token;

  let isValidRequest = !headers || !headers.token || headers.token === '';

  try {
    token = btoa(headers.token);
  } catch {
    isValidRequest = false;
  }

  if (!isValidRequest) {
    return {
      status: httpStatus.BAD_REQUEST,
      data: 'Failed to get request token from request'
    };
  }

  try {
    const response = await AuthService.getUserData(token);

    if (!response || !response.ok) {
      const status = response.data.error === 'bad_verification_code'
        ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;

      return {
        ...response,
        status: status
      };
    }

    addUser(response.data.id);

    return {
      ok: true,
      headers: {
        token: response.data.token
      }
    };
  } catch (err) {
    return {
      ok: false,
      data: {
        error: err.message ?? 'No error description found'
      }
    };
  }
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
