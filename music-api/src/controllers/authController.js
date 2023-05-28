import httpStatus from 'http-status-codes';
import * as AuthService from '../services/authService.js';
import { queryParamExtrator } from '../utils/requestHelper.js';

export const getUserData = async (req) => {
  const headers = req.headers;

  let code;

  let isValidRequest = !headers || !headers.code || headers.code === '';

  try {
    code = headers.code;
  } catch {
    isValidRequest = false;
  }

  if (!isValidRequest) {
    return {
      status: httpStatus.BAD_REQUEST,
      data: 'Failed to get request token from request'
    };
  }

  const response = await AuthService.getUserData(code);

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
  const headers = req.headers;

  const isInvalidRequest = !headers.code || headers.code === '';

  if (isInvalidRequest) {
    return {
      status: httpStatus.BAD_REQUEST,
      data: 'Failed to get request token from request'
    };
  }

  try {
    const response = await AuthService.getAccessToken(headers.code);

    if (!response || !response.ok) {
      const status = response.data.error === 'bad_verification_code'
        ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;

      return {
        ...response,
        status: status
      };
    }

    return response;
  } catch (err) {
    return {
      ok: false,
      data: {
        error: err.message ?? 'No error description found'
      }
    };
  }
};
