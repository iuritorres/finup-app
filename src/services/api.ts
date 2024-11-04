import Constants from 'expo-constants';

const debbugerHost = Constants.expoConfig?.hostUri;
const localhost = debbugerHost?.split(':')[0];
const port = 3000;

export const API_URL =
  process.env.NODE_ENV === 'development'
    ? `http://${localhost}:${port}/api`
    : '';
