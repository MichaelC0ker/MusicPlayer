import httpStatus from 'http-status-codes';
import { authService } from '../services/authService.js';

export const handler = async (req) => {
  const isUrlContainsCodeParam = req.url.indexOf('code=') >= 0;

  if (!isUrlContainsCodeParam) {
    // TODO: Handle bad request
    return {
      ok: false
    };
  }
  const queryParameters = req.url.split('?')[1].split('&');
  const requestToken = queryParameters.filter((param) => param.startsWith('code'))[0].split('=')[1];

  if (!requestToken) {
    return {
      status: httpStatus.BAD_REQUEST,
      data: 'Failed to get request token from request'
    };
  }

  try {
    const response = await authService(requestToken);

    if (!response || !response.ok) {
      const status = response.data.error === 'bad_verification_code'
        ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR

      return {
        ...response,
        status: status
      };
    }

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
