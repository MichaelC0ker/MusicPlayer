import httpStatus from 'http-status-codes';

import { getPostData, getIdParam } from './src/utils/requestHelper.js';

import { Constants } from './src/utils/constants.js';
import { getCredentials } from './src/controllers/credentialsController.js';
import * as Auth from './src/controllers/authController.js';
import { createPlaylist, addSongToPlaylist, getPlaylist, getAllPlaylists, updatePlaylistInfo, deletePlaylist, removeSong } from './src/controllers/playlistController.js';
import { uploadSong, getAllSongs, getSong, deleteSong } from './src/controllers/songController.js';
import * as https from 'https';
import * as fs from 'fs';

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8443;

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
  console.log(`Received ${req.method} request for ${req.url}`);
  switch (true) {
    case (req.url === '/' && req.method === 'GET'): {
      let data = {
        data: {
          message: "Welcome!"
        }
      }
      writeResponse(res,  httpStatus.OK, null, data);
      return;
    }
    case (req.url === '/credentials' && req.method ==='GET'): {
      const result = await getCredentials(req);
      writeResponse(res, result.status ?? httpStatus.OK, result?.headers, result?.data);
      return;
    }
    case (req.method === 'OPTIONS'):
      writeResponse(res, httpStatus.OK);
      break;
    case (req.url.startsWith('/auth/magic') && req.method === 'GET'): {
      const result = await Auth.getAccessToken(req);

      writeResponse(res, result.status ?? httpStatus.OK, result?.headers, result?.data);
      return;
    }
    case (req.url.startsWith('/auth/user') && req.method === 'GET'): {
      const result = await Auth.getUserData(req);

      writeResponse(res, result.status ?? httpStatus.OK, result?.headers, result?.data);
      return;
    }
    case (req.url.startsWith('/playlist/search?') && req.method === 'GET'):

      writeResponse(res, httpStatus.NOT_IMPLEMENTED);
      break;
    case (req.url === '/playlist' && req.method === 'POST'): {
      const body = await getPostData(req);
      const response = await createPlaylist(body);

      writeResponse(res, response.status, null, response.data);
      break;
    }
    case (req.url === '/playlist/song' && req.method === 'POST'): {
      const body = await getPostData(req);
      const response = await addSongToPlaylist(body);

      writeResponse(res, response.status, null, response.data);
      break;
    }
    case (req.url === ('/playlist/all') && req.method === 'POST'): {
      const body = await getPostData(req);
      const response = await getAllPlaylists(body);

      writeResponse(res, response.status, null, response.data);
      break;
    }
    case (req.url.startsWith('/playlist/') && req.method === 'GET'): {
      const param = await getIdParam(req.url);
      const response = await getPlaylist(param);

      writeResponse(res, response.status, null, response.data);
      break;
    }
    case (req.url === ('/playlist') && req.method === 'PUT'): {
      const body = await getPostData(req);
      const response = await updatePlaylistInfo(body);

      writeResponse(res, response.status, null, response.data);
      break;
    }
    case (req.url.startsWith('/playlist/song/') && req.method === 'DELETE'): {
      const param = await getIdParam(req.url);
      const response = await removeSong(param);

      writeResponse(res, response.status, null, response.data);
      break;
    }
    case (req.url.startsWith('/playlist/') && req.method === 'DELETE'): {
      const param = await getIdParam(req.url);
      const response = await deletePlaylist(param);

      writeResponse(res, response.status, null, response.data);
      break;
    }
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
      const response = await getAllSongs(body);

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
      returnNotFoundResponse(req, res);
  }
};

const sslOptions = {
  key: fs.readFileSync('./ssl/newprivate.key'),
  cert: fs.readFileSync('./ssl/server.crt'),
  ca: [
    fs.readFileSync('./ssl/root.crt'),
    fs.readFileSync('./ssl/intm.crt')
  ]
};

// eslint-disable-next-line no-unused-vars
const server = https.createServer(sslOptions, await reqListener).listen(PORT);

server.keepAliveTimeout = (60 * 1000) + 1000;
server.headersTimeout = (60 * 1000) + 2000;

