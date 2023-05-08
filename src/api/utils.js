export const DEV_BASE_URL = 'http://localhost:3000';

export const PROD_BASE_URL = 'http://ec2-18-117-78-200.us-east-2.compute.amazonaws.com:3000';

export const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_BASE_URL : DEV_BASE_URL;
