import http from 'http';
import httpStatus from 'http-status-codes';

import { getPostData, getIdParam } from './src/utils/requestHelper.js';

import { Constants } from './src/utils/constants.js';
import authController from './src/controllers/authController.js';
import {createPlaylist, addSongToPlaylist} from './src/controllers/playlistController.js';
import { uploadSong, getAllSongs, getSong, deleteSong } from './src/controllers/songController.js';

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

  if (headers && typeof headers === 'object') {
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
  // TODO: Reduce complexity
  switch (true) {
    case (req.method === 'OPTIONS'):
      writeResponse(res, httpStatus.OK);
      break;
    case (req.url.startsWith('/auth/callback') && req.method === 'GET'): {
      const result = await authController(req);

      writeResponse(res, result.status ?? httpStatus.OK, result?.headers, result?.data);
      return;
    }
    case (req.url.startsWith('/playlist/search?') && req.method === 'GET'):
      

      writeResponse(res, httpStatus.NOT_IMPLEMENTED);
      break;
    case (req.url === '/playlist/new' && req.method === 'POST'):
      writeResponse(res, httpStatus.NOT_IMPLEMENTED);
      break;
    case (req.url === '/playlist/edit' && req.method === 'PUT'):
      writeResponse(res, httpStatus.NOT_IMPLEMENTED);
      break;
    case (req.url === '/playlist/remove' && req.method === 'DELETE'):
      writeResponse(res, httpStatus.NOT_IMPLEMENTED);
      break;
    case (req.url === '/song' && req.method === 'POST'): {
      const body = await getPostData(req);
      const response = await uploadSong(body);
      writeResponse(res, response.status, null, response.data);
      break;
    }
    case (req.url.startsWith('/song/') && req.method === 'GET'): {
      const param = getIdParam(req.url);
      const response = await getSong(param);
      writeResponse(res, response.status, null, response.data);
      break;
    }
    case (req.url === '/song/all' && req.method === 'POST'): {
      const body = await getPostData(req);
      const response = await getAllSongs(body)
      writeResponse(res, response.status, null, response.data);
      break;
    }
    case (req.url.startsWith('/song') && req.method === 'DELETE'): {
      const param = getIdParam(req.url);
      const response = await deleteSong(param);
      writeResponse(res, response.status, null, response.data);
      break;
    }
    
    default:
      // TODO: Improve error handling
      console.log(`${req.method} request failed: ${req.url}`);
      returnNotFoundResponse(req, res);
  }
};

// eslint-disable-next-line no-unused-vars
const server = http.createServer(await reqListener).listen(PORT);

