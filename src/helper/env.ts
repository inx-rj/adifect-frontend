export const env = {
  APP_NAME: "Adifect",
  API_URL: process.env["REACT_APP_BACKEND_API_URL"],
};

export const BASE_URL = {
  COMPANIES: `${env.API_URL}community/`,
};

export const API_URL = {
  AUTH: {
    REGISTER: `${env.API_URL}registerview`,
    LOGIN: `${env.API_URL}loginview`,
    FORGOT_PASSWORD: `${env.API_URL}forget-password`,
    CHANGE_PASSWORD: `${env.API_URL}loginview`,
  },
  COMPANIES: {
    COMPANY_PROJECTS: `${BASE_URL.COMPANIES}stories/`,
    FILTERS: `${BASE_URL.COMPANIES}list-community-status-tag-data/`,
    TAGS: `${BASE_URL.COMPANIES}tags/`,
  },
};
