import * as dotenv from 'dotenv';
dotenv.config();

import httpStatus from 'http-status-codes';

export const getCredentials = async() => {
   

    return {
        status: httpStatus.OK,
        data: {
            AWS_REGION: process.env.AWS_REGION,
            AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
            AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
        }
    }

}