// const BACKEND_API_URL = process.env["REACT_APP_BACKEND_LOCAL_API_URL"]; // Inx-rj(root347) network-ip API URL, when on same LAN
// const BACKEND_API_URL = "192.168.0.166:8001" // Inx-rj(root347) network-ip API URL, when on same LAN
const BACKEND_API_URL = process.env['REACT_APP_BACKEND_API_URL']; // DEV API URL
// const BACKEND_API_URL = process.env["REACT_APP_BACKEND_QA_API_URL"]; // QA API URL
// const BACKEND_API_URL = process.env["REACT_APP_BACKEND_PROD_API_URL"]; // PROD API URL
const FRONTEND_API_URL = process.env['REACT_APP_FRONTEND_URL'];

export const env = {
  APP_NAME: 'Adifect',
  API_URL: `https://${BACKEND_API_URL}/`,
  FRONTEND_SITE_URL: `https://${FRONTEND_API_URL}/`
};

export const BASE_URL = {
  AGENCY: `${env.API_URL}agency/`,
  CREATOR: `${env.API_URL}creator/`,
  MEMBER: `${env.API_URL}members/`,
  LEVELS: `${env.API_URL}levels/`,
  WORKFLOW: `${env.API_URL}workflows/`,
  COMPANIES: `${env.API_URL}community/`,
  MEDIA: `${env.API_URL}`,
  TEMPLATES: `${env.API_URL}job-template/`,
  SKILLS: `${env.API_URL}skills/`,
  USERS_LIST: `${env.API_URL}users-list/`,
  COMPANY: `${env.API_URL}company/`,
  HELP: `${env.API_URL}`
};

export const API_URL = {
  AUTH: {
    REGISTER: `${env.API_URL}registerview/`,
    LOGIN: `${env.API_URL}loginview/`,
    FORGOT_PASSWORD: `${env.API_URL}forget-password/`,
    RESET_PASSWORD: `${env.API_URL}reset-password/`,
    EDIT_PROFILE: `${env.API_URL}edit-profile/`
  },
  COMPANIES: {
    COMPANY_PROJECTS: `${BASE_URL.COMPANIES}stories/`,
    FILTERS: `${BASE_URL.COMPANIES}list-community-status-tag-data/`,
    TAGS: `${BASE_URL.COMPANIES}tags/`,
    STORY_TAGS: `${BASE_URL.COMPANIES}story-tag/`,
    COMMUNITY_SETTINGS: `${BASE_URL.COMPANIES}community-setting/`,
    AUDIENCES: `${BASE_URL.AGENCY}audience/`,
    COMMUNITY_AUDIENCES: `${BASE_URL.AGENCY}community-audience/`,
    COPY_CODE: `${BASE_URL.COMPANIES}copy-code/`,
    CREATIVE_CODE: `${BASE_URL.COMPANIES}creative-code/`,
    PROGRAMS: `${BASE_URL.COMPANIES}program/`,
    CHANNEL: `${BASE_URL.COMPANIES}channel/`,
    MEMBER_COMPANY: `${BASE_URL.MEMBER}invited-user-company-list/`
  },
  COMPANY: {
    ADMIN: `${BASE_URL.COMPANY}`, //for admin
    //for status update in admin
    ADMIN_COMPANY_BLOCK: `${env.API_URL}admin-company-block/`,
    COMPANY_LIST: `${BASE_URL.AGENCY}company/`, //for agency
    CREATOR_COMPANY_LIST: `${BASE_URL.CREATOR}creator-company-list`, //for creator,
    MEMBER_COMPANY_LIST: `${BASE_URL.MEMBER}company/` //for member
  },
  INVITE: {
    INVITE_USERS: `${BASE_URL.AGENCY}invite-member/`,
    INVITE_MEMBERS_LIST: `${BASE_URL.AGENCY}invite-member-list/`,
    INVITE_USER_REGISTER: `${BASE_URL.AGENCY}register-view-invite/`,
    INVITE_STATUS: `${BASE_URL.AGENCY}update-invite-member/`,
    JOB_ACTIVITY_USER: `${env.API_URL}job-activity-users/`
  },
  JOBS: {
    JOBS_LIST: `${env.API_URL}jobs/`,
    AGENCY_JOBS: `${BASE_URL.AGENCY}agency-jobs/`,
    MEMBERS_LATEST_JOBS: `${env.API_URL}members/member-latest-job/`,
    LATEST_JOBS: `${env.API_URL}latest-job/`,
    MEMBERS_APPROVAL_JOBS_LIST: `${env.API_URL}members/member-approval-job-list/`,
    MEMBERS_JOBS_LIST: `${env.API_URL}members/member-job-list/`,
    CREATOR_JOBS_LIST: `${env.API_URL}creator/my-jobs/`,
    JOB_APPLIED: `${env.API_URL}job-applied/`,
    JOB_TASK: `${env.API_URL}job-task/`,
    CREATOR_JOB_COUNT: `${env.API_URL}creator/creator-job-count/`, // For Admin and Creator count
    AGENCY_JOB_COUNT: `${env.API_URL}agency/agency-jobs/`, // For Agency count
    MEMBER_JOB_COUNT: `${env.API_URL}members/member-approver-job-list/`, // For Member count
    JOBS_ACTIVITY: `${env.API_URL}job-activity/`,
    COMPLETED_JOB_STATUS: `${env.API_URL}job-completed-status/`,
    MEMBER_WORK_APPROVAL: `${env.API_URL}member-work-approval/`,
    COMPLETED_JOB_ACTIVITY: `${env.API_URL}completed-job/`,
    JOBS_FILES: `${BASE_URL.AGENCY}job-attachments`,
    JOBS_PROPOSAL: `${env.API_URL}job-proposal/`,
    JOBS_ANSWER: `${env.API_URL}answer/`,
    JOBS_QUESTION: `${env.API_URL}question/`,
    QUESTION_FILTER: `${env.API_URL}question-filter/`,
    ADMIN_QUESTION_FILTER: `${env.API_URL}admin-question-filter/`,
    ADMIN_JOBS_ACTIVITY: `${env.API_URL}admin-job-activity/`,
    ADMIN_JOBS_ATTACHMENTS: `${env.API_URL}admin-job-attachments/`,
    CREATOR_AVAILABLE_JOBS: `${env.API_URL}creator/available-jobs/`,
    JOBS_WORK_STATUS: `${env.API_URL}job-work-status/`,
    JOBS_COMPLETED_STATUS: `${env.API_URL}job-completed-status/`,
    CREATOR_JOBS_ACTIVITY: `${env.API_URL}creator/job-activity`,
    IS_APPROVAL_REJECTED_STATUS: `${env.API_URL}creator/get-resubmit-work/`,
    CREATOR_JOB_APPLIED: `${env.API_URL}creator/job-applied/`,
    CREATOR_COMPLETED_TASK_LIST: `${env.API_URL}creator/get-task-list/`,
    CREATOR_JOB_FEEDBACK: `${env.API_URL}creator/job-feedback/`,
    SUBMIT_JOB_WORK: `${env.API_URL}submit-job-work/`,
    CREATOR_JOBS_FILES_ATTACHMENTS: `${env.API_URL}creator/job-attachments/`,
    JOB_ACTIVITY_MEMBER: `${BASE_URL.AGENCY}job-activity-member/`,
    MEMBER_JOB_ATTACHMENTS: `${BASE_URL.MEMBER}job-attachments/`,
    AGENCY_JOBS_LIST: `${env.API_URL}agency-job-list/`
  },
  NOTIFICATION: {
    AGENCY_NOTIFICATION: `${BASE_URL.AGENCY}agency-notification/`,
    MEMBER_NOTIFICATION: `${BASE_URL.MEMBER}member-notification/`
  },
  USER_PROFILE: {
    USER_COMMUNICATION: `${env.API_URL}user-communication/`,
    USER_PORTFOLIO: `${env.API_URL}user-portfolio/`,
    USER_EMAIL_CHANGE: `${env.API_URL}email-change/`,
    USER_PASSWORD_CHANGE: `${env.API_URL}profile-password-change/`,
    USER_CLOSE_ACCOUNT: `${env.API_URL}authentication/close-account/`
  },
  MY_JOBS: {
    AGENCY_JOBS_LIST: `${BASE_URL.AGENCY}agency-jobs/`
  },
  WORKFLOW: {
    ADMIN: `${BASE_URL.WORKFLOW}`, //for admin
    WORKFLOW_LIST: `${BASE_URL.AGENCY}works-flow/`, //for agency
    WORKFLOW_STAGES: `${BASE_URL.AGENCY}works-flow-stages/`, //for agency
    MEMBER_WORKFLOW_LIST: `${BASE_URL.MEMBER}workflow/` //for agency
  },
  SKILLS: {
    SKILLS_LIST: `${BASE_URL.SKILLS}`,
    INDIVIDUAL_USER_SKILL_LIST: `${env.API_URL}user-skills/`
  },
  LEVELS: {
    LEVELS_LIST: `${BASE_URL.LEVELS}`
  },
  IN_HOUSE_USER: {
    ADMIN_USER_LIST: `${env.API_URL}inhouse-user-list/`,
    AGENCY_USER_LIST: `${BASE_URL.AGENCY}inhouse-user-list/`
  },
  INDUSTRY: {
    INDUSTRY_LIST: `${BASE_URL.AGENCY}industries/` //for agency
  },
  DRAFT_JOBS: {
    DRAFT_JOBS_LIST: `${BASE_URL.AGENCY}draft-jobs/`
  },
  TEMPLATES: {
    TEMPLATES_LIST: `${BASE_URL.TEMPLATES}`,
    ADMIN_JOB_TEMPLATE: `${env.API_URL}admin-job-template/`,
    MEMBER_JOB_TEMPLATE_LIST: `${BASE_URL.MEMBER}members-job-template/`
  },
  MEDIA: {
    DAM_MEDIA: `${BASE_URL.AGENCY}dam-media/`
  },
  HELP: {
    ADMIN_HELP_LIST: `${BASE_URL.HELP}admin-help/`,
    HELP_LIST: `${BASE_URL.HELP}help/`,
    AGENCY_CHAT_HELP: `${BASE_URL.HELP}agency-help-chat/`,
    ADMIN_CHAT_HELP: `${BASE_URL.HELP}help-chat/`
  }
};
