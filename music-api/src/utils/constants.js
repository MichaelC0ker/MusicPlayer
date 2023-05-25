import * as dotenv from 'dotenv';

dotenv.config();

export const URL = process.env.NODE_ENV === "development"
                    ? "http://localhost:5500"
                    : "https://main.d2m0czas1vg68p.amplifyapp.com/"

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
            'Access-Control-Allow-Origin': URL,
            'Access-Control-Request-Method': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }
    }
}
