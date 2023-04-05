export const env = {
  APP_NAME: "Adifect",
  API_URL: process.env["REACT_APP_BACKEND_API_URL"],
};

export const BASE_URL = {
  AGENCY: `${env.API_URL}agency/`
}

export const API_URL = {
  AUTH: {
    REGISTER: `${env.API_URL}registerview`,
    LOGIN: `${env.API_URL}loginview`,
    FORGOT_PASSWORD: `${env.API_URL}forget-password`,
    CHANGE_PASSWORD: `${env.API_URL}loginview`,
  },
  COMPANY: {
    COMPANY_LIST: `${BASE_URL.AGENCY}company`
  },
  INVITE: {
    INVITE_USERS: `${BASE_URL.AGENCY}invite-member`,
  },
};
