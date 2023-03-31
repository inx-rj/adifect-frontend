export const env = {
  APP_NAME: "Adifect",
  API_URL: import.meta.env["VITE_BACKEND_API_URL"],
};

export const API_URL = {
  AUTH: {
    REGISTER: `${env.API_URL}/registerview`,
    LOGIN: `${env.API_URL}/loginview`,
  },
};
