import Constants from "expo-constants";

const debbugerHost = Constants.expoConfig?.hostUri;
const localhost = debbugerHost?.split(":")[0];

export const API_URL =
  process.env.NODE_ENV === "development" ? `http://${localhost}:8080/api` : "";
