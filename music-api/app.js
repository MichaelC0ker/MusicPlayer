'use strict';
import http from 'http';
import httpStatus from 'http-status-codes'

import { Constants } from "./src/utils/constants.js";

const PORT = process.env.PORT || 5000;

const reqListener = async (req, res) => {
    if (req.method === 'OPTIONS') {
        writeResponse(res, httpStatus.OK);
    } else if(req.url === "/playlist"){
        writeResponse(res, httpStatus.NOT_IMPLEMENTED);
    } else if(req.url === "/song") {
        writeResponse(res, httpStatus.NOT_IMPLEMENTED);
    } else if(req.url === "/album") {
        writeResponse(res, httpStatus.NOT_IMPLEMENTED);
    } else {
        writeResponse(res, httpStatus.NOT_FOUND, null, Constants.responses.NOT_FOUND);
    }
};

const writeResponse = (res, statusCode, headers, data, contentType = Constants.headers.CONTENT_TYPE) => {
    if(!statusCode || !statusCode instanceof Number) {
        const error = new Error("Invalid status code - Failed to write response");
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, httpStatus.getStatusText(500), contentType);
        res.end(error.message);
        throw error;
    }

    let responseHeaders = Constants.headers.CORS_CONFIG;
    if(null !== headers && typeof headers === 'object') {
        responseHeaders = [...responseHeaders, ...headers];
    }
    Object.keys(responseHeaders).map((key) => {
        res.setHeader(key, responseHeaders[key]);
    });

    res.writeHead(statusCode, httpStatus.getStatusText(statusCode), contentType);

    if(null !== data && (Array.isArray(data) || typeof data === 'object')) {
        res.write(JSON.stringify(data));
    }
    res.end();
};

const server = http.createServer(reqListener).listen(PORT);
console.log(`Server running at port ${PORT}`);
