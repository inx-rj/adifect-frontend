export const env = {
  APP_NAME: "Adifect",
  API_URL: "https://dev-api.adifect.com/",
};

console.log(process.env);

export const API_URL = {
  AUTH: {
    REGISTER: `${env.API_URL}registerview`,
    LOGIN: `${env.API_URL}loginview`,
  },
};
