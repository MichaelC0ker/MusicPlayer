import * as dotenv from 'dotenv';

dotenv.config();

export const URL = process.env.NODE_ENV === "development"
                    ? "http://localhost:5000"
                    : "http://ec2-54-155-180-111.eu-west-1.compute.amazonaws.com:5000"

export const Constants = {
    responses: {
        NOT_FOUND: {
            error: 'Failed to get the requested resource'
        },
        BAD_REQUEST: {
            error: 'Invalid request'
        }
    },
    headers: {
        CONTENT_TYPE: {
            'Content-Type': 'application/json'
        },
        CORS_CONFIG: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Request-Method': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }
    }
}
