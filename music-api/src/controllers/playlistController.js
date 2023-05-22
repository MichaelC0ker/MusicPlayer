import httpStatus from 'http-status-codes';
import { playlistService } from '../services/playlistService.js';
import { queryParamExtrator } from '../utils/requestHelper.js';

export default async (req) => {
  const queryParameters = queryParamExtrator(req.url);

  let isValidRequest = true;

  if (Object.keys(queryParameters).length === 0 || !queryParameters.limit) {
    isValidRequest = false;
  } else if (queryParameters?.limit === 'none') {
    // TODO: Implement retrieve all functionality
  } else if (queryParameters?.limit === 1 && queryParameters.id) {
    // TODO: Implement retrieve one playlist functionality
  } else if ((queryParameters.criteria && queryParameters.limit > 1)) {
    // TODO: Handle single song query
  }

  if (!isValidRequest) {
    return {
      status: httpStatus.BAD_REQUEST,
      data: 'Failed to get request token from request'
    };
  }

  try {
    const response = await playlistService();

    if (!response || !response.ok) {
      const status = response.data.error === 'bad_verification_code'
        ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;

      return {
        ...response,
        status: response.status ? response.status : status
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
