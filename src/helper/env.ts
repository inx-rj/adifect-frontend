export const env = {
  APP_NAME: "Adifect",
  API_URL: process.env["REACT_APP_BACKEND_API_URL"],
};

export const BASE_URL = {
  COMPANIES: `https://dev-api.adifect.com/community/`,
  COMPANY: `https://dev-api.adifect.com/company/`,
};

export const API_URL = {
  AUTH: {
    REGISTER: `https://dev-api.adifect.com/registerview`,
    LOGIN: `https://dev-api.adifect.com/loginview`,
    FORGOT_PASSWORD: `https://dev-api.adifect.com/forget-password`,
    CHANGE_PASSWORD: `https://dev-api.adifect.com/loginview`,
    EDIT_PROFILE: `https://dev-api.adifect.com/edit-profile`,
  },
  COMPANIES: {
    COMPANY_PROJECTS: `${BASE_URL.COMPANIES}stories/`,
    FILTERS: `${BASE_URL.COMPANIES}list-community-status-tag-data/`,
    TAGS: `${BASE_URL.COMPANIES}tags/`,
  },
  COMPANY: {
    COMPANY_PROJECTS: `${BASE_URL.COMPANY}/`,
  },
};
