export const env = {
  APP_NAME: "Adifect",
  API_URL: process.env['REACT_APP_BACKEND_API_URL'],
};

export const API_URL = {
  AUTH: {
    REGISTER: `${env.API_URL}registerview`,
    LOGIN: `${env.API_URL}loginview`,
  },
};
