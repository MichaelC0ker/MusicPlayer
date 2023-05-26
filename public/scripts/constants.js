export const api_endpoint = process.env.WEB_ENV === "deployed"
                            ? process.env.API_ENDPOINT
                            : "http://localhost:5000"