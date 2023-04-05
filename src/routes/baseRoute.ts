export const SYSTEM: Readonly<{ LOGIN: string; HOME: string }> = Object.freeze({
  LOGIN: "/login",
  HOME: "/",
});

export const MAIN_ROUTE: Readonly<{ HOME: string }> = Object.freeze({
  HOME: `${SYSTEM.HOME}`,
});

// Authentication Route
export const AUTH_ROUTE: Readonly<{
  LOGIN: string;
  SIGNUP: string;
  THANK_YOU: string;
  FORGOT_PASSWORD: string;
}> = Object.freeze({
  LOGIN: `${SYSTEM.LOGIN}`,
  SIGNUP: `${SYSTEM.HOME}signup`,
  THANK_YOU: `${SYSTEM.HOME}/thank-you`,
  FORGOT_PASSWORD: `${SYSTEM.HOME}/forgot-password`,
});

// Authentication Route
export const PAGE_ROUTE: Readonly<{
  HOME: string;
  DASHBOARD: string;
  WORKFLOW: string;
  COMPANY: string;
  COMPANIES: string;
  MEDIA: string;
  MY_JOBS: string;
  DRAFT_JOBS: string;
  TEMPLATES: string;
  HELP: string;
}> = Object.freeze({
  HOME: `${MAIN_ROUTE.HOME}`,
  DASHBOARD: `${MAIN_ROUTE.HOME}/home`,
  WORKFLOW: `${MAIN_ROUTE.HOME}`,
  COMPANY: `${MAIN_ROUTE.HOME}company`,
  COMPANIES: `${MAIN_ROUTE.HOME}`,
  MEDIA: `${MAIN_ROUTE.HOME}media`,
  MY_JOBS: `${MAIN_ROUTE.HOME}jobs`,
  DRAFT_JOBS: `${MAIN_ROUTE.HOME}draft-jobs`,
  TEMPLATES: `${MAIN_ROUTE.HOME}templates`,
  HELP: `${MAIN_ROUTE.HOME}`,
});

// Companies Route
export const DASHBOARD_COMPANIES_ROUTE: Readonly<{
  HOME: string;
  COMPANIES_PROJECTS: string;
  TAGS: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.HOME}`,
  COMPANIES_PROJECTS: `${PAGE_ROUTE.HOME}company-projects`,
  TAGS: `${PAGE_ROUTE.HOME}company-project/tags`,
});

// Workflow Route
export const DASH_WORKFLOW: Readonly<{
  HOME: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.WORKFLOW}workflow`,
});

// Workflow Route
export const DASHBOARD_WORKFLOW_ROUTE: Readonly<{
  HOME: string;
  CREATE_WORKFLOW: string;
  UPDATE_WORKFLOW: string;
}> = Object.freeze({
  HOME: `${DASH_WORKFLOW.HOME}`,
  CREATE_WORKFLOW: `${DASH_WORKFLOW.HOME}add`,
  UPDATE_WORKFLOW: `${DASH_WORKFLOW.HOME}update`,
});

// My Jobs Route
export const DASH_MY_JOBS: Readonly<{
  HOME: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.MY_JOBS}`,
});

// My Jobs Route
export const DASHBOARD_MY_JOBS_ROUTE: Readonly<{
  HOME: string;
  CREATE_MY_JOB: string;
  UPDATE_MY_JOB: string;
}> = Object.freeze({
  HOME: `${DASH_MY_JOBS.HOME}list`,
  CREATE_MY_JOB: `${DASH_MY_JOBS.HOME}add`,
  UPDATE_MY_JOB: `${DASH_MY_JOBS.HOME}update`,
});

// Templates Route
export const DASHBOARD_TEMPLATES_ROUTES: Readonly<{
  HOME: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.TEMPLATES}list`,
});

// Company Route
export const DASH_COMPANY: Readonly<{
  HOME: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.COMPANY}agency/company`,
});

// Company Route
export const DASHBOARD_COMPANY_ROUTE: Readonly<{
  HOME: string;
  CREATE_COMPANY: string;
}> = Object.freeze({
  HOME: `${DASH_COMPANY.HOME}`,
  CREATE_COMPANY: `${DASH_COMPANY.HOME}add`,
});

// Help Route
export const DASH_HELP: Readonly<{
  HOME: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.HELP}help`,
});

// Help Route
export const DASHBOARD_HELP_ROUTE: Readonly<{
  HOME: string;
  CREATE_HELP: string;
}> = Object.freeze({
  HOME: `${DASH_HELP.HOME}`,
  CREATE_HELP: `${DASH_HELP.HOME}add`,
});