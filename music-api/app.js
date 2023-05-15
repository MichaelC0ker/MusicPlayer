import http from 'http';
import httpStatus from 'http-status-codes';

import { Constants } from './src/utils/constants.js';
import * as authController from './src/controllers/authController.js';

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

const writeResponse = (res, statusCode, headers, data, contentType = Constants.headers.CONTENT_TYPE) => {
  if (!statusCode || !statusCode instanceof Number) {
    const error = new Error('Invalid status code - Failed to write response');

    res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, httpStatus.getStatusText(500), contentType);
    res.end(error.message);
    throw error;
  }

  let responseHeaders = Constants.headers.CORS_CONFIG;

  if (headers !== null && typeof headers === 'object') {
    responseHeaders = { ...responseHeaders, ...headers };
  }
  Object.keys(responseHeaders).forEach((key) => {
    res.setHeader(key, responseHeaders[key]);
  });

  res.writeHead(statusCode, httpStatus.getStatusText(statusCode), contentType);

  if (data !== null && (Array.isArray(data) || typeof data === 'object')) {
    res.write(JSON.stringify(data));
  }
  res.end();
};

const returnNotFoundResponse = (req, res) => {
  writeResponse(res, httpStatus.NOT_FOUND, null, Constants.responses.NOT_FOUND);
};

const reqListener = async (req, res) => {
  switch (true) {
    case (req.method === 'OPTIONS'):
      writeResponse(res, httpStatus.OK);
      break;
    case (req.url.startsWith('/auth/callback') && req.method === 'GET'): {
      const result = await authController.handler(req);

      writeResponse(res, result.status ?? httpStatus.OK, result?.headers, result?.data);
      return;
    }
    case (req.url === '/favicon.ico' && req.method === 'GET'):
      writeResponse(res, httpStatus.NO_CONTENT);
      break;
    case (req.url === '/playlist' && req.method === 'GET'):
      writeResponse(res, httpStatus.NOT_IMPLEMENTED);
      break;
    case (req.url === '/playlist' && req.method === 'POST'):
      writeResponse(res, httpStatus.NOT_IMPLEMENTED);
      break;
    case (req.url === '/playlist' && req.method === 'PUT'):
      writeResponse(res, httpStatus.NOT_IMPLEMENTED);
      break;
    case (req.url === '/playlist' && req.method === 'DELETE'):
      writeResponse(res, httpStatus.NOT_IMPLEMENTED);
      break;
    case (req.url === '/song' && req.method === 'GET'):
      writeResponse(res, httpStatus.NOT_IMPLEMENTED);
      break;
    case (req.url === '/song' && req.method === 'POST'):
      writeResponse(res, httpStatus.NOT_IMPLEMENTED);
      break;
    case (req.url === '/song' && req.method === 'PUT'):
      writeResponse(res, httpStatus.NOT_IMPLEMENTED);
      break;
    case (req.url === '/song' && req.method === 'DELETE'):
      writeResponse(res, httpStatus.NOT_IMPLEMENTED);
      break;
    case (req.url === '/album' && req.method === 'GET'):
      writeResponse(res, httpStatus.NOT_IMPLEMENTED);
      break;
    case (req.url === '/album' && req.method === 'PUT'):
      writeResponse(res, httpStatus.NOT_IMPLEMENTED);
      break;
    case (req.url === '/artist' && req.method === 'GET'):
      writeResponse(res, httpStatus.NOT_IMPLEMENTED);
      break;
    case (req.url === '/artist' && req.method === 'PUT'):
      writeResponse(res, httpStatus.NOT_IMPLEMENTED);
      break;
    default:
      console.log(`${req.method} request failed: ${req.url}`);
      returnNotFoundResponse(req, res);
  }
};

// eslint-disable-next-line no-unused-vars
const server = http.createServer(await reqListener).listen(PORT);

