export const env = {
  APP_NAME: "Adifect",
  API_URL: process.env["REACT_APP_BACKEND_API_URL"],
};

export const BASE_URL = {
  COMPANIES: `${env.API_URL}community/`,
  AGENCY: `${env.API_URL}agency/`,
  COMPANY: `${env.API_URL}company/`,
  MEMBER: `${env.API_URL}member/`,
  WORKFLOW: `${env.API_URL}workflows/`,
};

export const API_URL = {
  AUTH: {
    REGISTER: `${env.API_URL}registerview/`,
    LOGIN: `${env.API_URL}loginview/`,
    FORGOT_PASSWORD: `${env.API_URL}forget-password/`,
    RESET_PASSWORD: `${env.API_URL}reset-password/`,
    EDIT_PROFILE: `${env.API_URL}edit-profile/`,
  },
  COMPANIES: {
    COMPANY_PROJECTS: `${BASE_URL.COMPANIES}stories/`,
    FILTERS: `${BASE_URL.COMPANIES}list-community-status-tag-data/`,
    TAGS: `${BASE_URL.COMPANIES}tags/`,
    COMMUNITY_SETTINGS: `${BASE_URL.COMPANIES}community-setting/`,
    AUDIENCES: `${BASE_URL.AGENCY}audience/`,
  },
  COMPANY: {
    ADMIN: `${BASE_URL.COMPANY}`, //for admin
    ADMIN_COMPANY_BLOCK: `${env.API_URL}admin-company-block/`, //for status update in admin
    COMPANY_LIST: `${BASE_URL.AGENCY}company/`, //for agency
  },
  INVITE: {
    INVITE_USERS: `${BASE_URL.AGENCY}invite-member/`,
    INVITE_MEMBERS_LIST: `${BASE_URL.AGENCY}invite-member-list/`,
  },
  HOMEPAGE: {
    JOBS_LIST: `${env.API_URL}jobs/`,
    MEMBERS_LATEST_JOBS: `${env.API_URL}members/member-latest-job/`,
    LATEST_JOBS: `${env.API_URL}latest-job/`,
    MEMBERS_APPROVAL_JOBS_LIST: `${env.API_URL}members/member-approval-job-list/`,
    MEMBERS_JOBS_LIST: `${env.API_URL}members/member-job-list/`,
    CREATOR_JOBS_LIST: `${env.API_URL}creator/my-jobs/`,
    JOB_APPLIED: `${env.API_URL}job-applied/`,
  },
  NOTIFICATION: {
    AGENCY_NOTIFICATION: `${BASE_URL.AGENCY}agency-notification/`,
    MEMBER_NOTIFICATION: `${BASE_URL.MEMBER}member-notification/`,
  },
  PROFILE: {
    USER_COMMUNICATION: `${env.API_URL}user-communication/`,
  },
  MY_JOBS: {
    AGENCY_JOBS_LIST: `${BASE_URL.AGENCY}agency-jobs/`,
  },
  WORKFLOW: {
    ADMIN: `${BASE_URL.WORKFLOW}`, //for admin
    WORKFLOW_LIST: `${BASE_URL.AGENCY}works-flow/`, //for agency
  },
};
