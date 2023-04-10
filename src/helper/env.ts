export const env = {
  APP_NAME: "Adifect",
  API_URL: process.env["REACT_APP_BACKEND_API_URL"],
};

export const BASE_URL = {
  COMPANIES: `https://dev-api.adifect.com/community/`,
  AGENCY: `https://dev-api.adifect.com/agency/`,
  COMPANY: `https://dev-api.adifect.com/company/`,
  MEMBER: `https://dev-api.adifect.com/member/`,
};

export const API_URL = {
  AUTH: {
    REGISTER: `https://dev-api.adifect.com/registerview/`,
    LOGIN: `https://dev-api.adifect.com/loginview/`,
    FORGOT_PASSWORD: `https://dev-api.adifect.com/forget-password/`,
    CHANGE_PASSWORD: `https://dev-api.adifect.com/loginview/`,
    EDIT_PROFILE: `https://dev-api.adifect.com/edit-profile/`,
  },
  COMPANIES: {
    COMPANY_PROJECTS: `${BASE_URL.COMPANIES}stories/`,
    FILTERS: `${BASE_URL.COMPANIES}list-community-status-tag-data/`,
    TAGS: `${BASE_URL.COMPANIES}tags/`,
  },
  COMPANY: {
    COMPANY_LIST: `${BASE_URL.AGENCY}company/`,
  },
  INVITE: {
    INVITE_USERS: `${BASE_URL.AGENCY}invite-member/`,
  },
  NOTIFICATION: {
    AGENCY_NOTIFICATION: `${BASE_URL.AGENCY}agency-notification/`,
    MEMBER_NOTIFICATION: `${BASE_URL.MEMBER}member-notification/`,
  },
  PROFILE: {
    USER_COMMUNICATION: `https://dev-api.adifect.com/user-communication/`
  }
};
