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
