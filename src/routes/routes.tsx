import React, { lazy, Suspense } from 'react';
import { RouteType } from '../helper/types';
import {
  AUTH_ROUTE,
  COMPANIES_ROUTE,
  COMPANY_ROUTE,
  DRAFT_JOBS_ROUTE,
  HELP_ROUTE,
  INTAKE_FORMS_ROUTE,
  MEDIA_ROUTE,
  MY_JOBS_ROUTE,
  PAGE_ROUTE,
  TEMPLATES_ROUTE,
  WORKFLOW_ROUTE
} from './baseRoute';
import Templates from 'components/pages/templates/Templates';
import EditTemplate from 'components/pages/templates/EditTemplate';
import JobsDetail from 'components/pages/jobs/JobsDetail';
import { ROLES } from 'helper/config';
import { getUserRole } from 'helper/utility/customFunctions';
import { IntakeFormConstant } from 'helper/constants/intakeForm/IntakeFormConstant';
import MediaHome from 'components/pages/media/MediaHome';
import UsersList from 'pages/users/UsersList';

const userData = () => JSON.parse(localStorage.getItem('userData')) ?? '';

// ---------------------------- Import lazy load component ----------------------------

// => Auth pages
const Login = lazy(() => import('components/auth/Login'));
const Signup = lazy(() => import('components/auth/Signup'));
const Thankyou = lazy(() => import('components/auth/Thankyou'));
const ForgotPassword = lazy(() => import('components/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('components/auth/ResetPassword'));

// ==> Header Pages

// Profile dropdown pages
const Profile = lazy(() => import('components/profileDropdown/profile/Profile'));

// Invite Pages and Components
const InviteUser = lazy(() => import('components/profileDropdown/invite/InviteUser'));

// ==> Sidebar pages

// Home Pages and Components
const HomePage = lazy(() => import('pages/dashboard/home/HomePage'));

// Workflow Pages and Components
const WorkFlowList = lazy(() => import('components/pages/workflow/WorkFlowList'));
const ApprovalWorkflow = lazy(() => import('components/pages/workflow/ApprovalWorkflow'));

// MyProjects Pages and Components
const MyProjects = lazy(() => import('components/pages/myProjects/MyProjects'));

// Company Projects(Communities) Pages and Components
const AgencyCompanyProjects = lazy(() => import('components/pages/agency/companyProjects/AgencyCompanyProjects'));
const AgencyCompanyProjectsDetails = lazy(
  () => import('components/pages/agency/companyProjects/AgencyCompanyProjectsDetails')
);
const AgencyCompanyProjectsTags = lazy(
  () => import('components/pages/agency/companyProjects/AgencyCompanyProjectsTags')
);

// Intake form Pages and Components
const AgencyIntakeForms = lazy(() => import('components/pages/intakeForm/listing/IntakeFormList'));

// Intake form - Create/Edit Components
const CreateIntakeForms = lazy(() => import('components/pages/intakeForm/create/CreateOrUpdateDynamicForm'));

// Intake form -Res details Components
const IntakeFormFields = lazy(() => import('components/pages/intakeForm/global/GlobalFormResponseDetails'));

// Intake form Form List Components
const IntakeFormResponseList = lazy(() => import('components/pages/intakeForm/listing/IntakeFormResponseList'));

//Intake Form Wrapper

const IntakeFormWrapper = lazy(() => import('components/pages/intakeForm/view/IntakeFormWrapper'));

// Jobs Pages and Components
const AdminJobsList = lazy(() => import('components/pages/jobs/AdminJobsList'));
const AdminJobsAddEdit = lazy(() => import('components/pages/jobs/adminJobs/AdminJobsAddEdit'));
const DraftJobs = lazy(() => import('components/pages/draftJobs/DraftJobs'));

// Company Pages and Components
const AgencyCompanyList = lazy(() => import('components/pages/agency/companyTab/AgencyCompanyList'));
const AgencyCompanyProfile = lazy(() => import('components/pages/companyProfile/AgencyCompanyProfile'));

const CommunitySettings = lazy(() => import('components/pages/agency/communitySettings/CommunitySettings'));

const Programs = lazy(() => import('components/pages/agency/programs/Programs'));

const CopyCode = lazy(() => import('components/pages/agency/copyCode/CopyCode'));

const CreativeCode = lazy(() => import('components/pages/agency/creativeCode/CreativeCode'));

const Audience = lazy(() => import('components/pages/agency/audience/Audience'));

//help components

const HelpList = lazy(() => import('components/pages/help/HelpList'));

const HelpAdd = lazy(() => import('../components/pages/help/HelpAdd'));

const HelpChat = lazy(() => import('../components/pages/help/HelpChat'));

// ---------------------------- Define main pages routes ----------------------------

// => Authentication Route
export const AUTH_ROUTES: RouteType[] = [
  {
    path: AUTH_ROUTE.LOGIN,
    component: (
      <Suspense fallback={''}>
        <Login />
      </Suspense>
    )
  },
  {
    path: AUTH_ROUTE.SIGNUP,
    component: (
      <Suspense fallback={''}>
        <Signup />
      </Suspense>
    )
  },
  {
    path: AUTH_ROUTE.THANK_YOU,
    component: (
      <Suspense fallback={''}>
        <Thankyou />
      </Suspense>
    )
  },
  {
    path: AUTH_ROUTE.FORGOT_PASSWORD,
    component: (
      <Suspense fallback={''}>
        <ForgotPassword />
      </Suspense>
    )
  },
  {
    path: AUTH_ROUTE.RESET_PASSWORD,
    component: (
      <Suspense fallback={''}>
        <ResetPassword />
      </Suspense>
    )
  }
];

// => Header Dropdown Pages Route
export const HEADER_ROUTES: RouteType[] = [
  {
    path: PAGE_ROUTE.INVITE,
    component: (
      <Suspense fallback={''}>
        <InviteUser />
      </Suspense>
    )
  },
  {
    path: PAGE_ROUTE.PROFILE,
    component: (
      <Suspense fallback={''}>
        <Profile />
      </Suspense>
    )
  }
];

// => Tabs/Pages Wise Route
export const PAGES_ROUTES: RouteType[] = [
  {
    path: PAGE_ROUTE.HOME,
    component: (
      <Suspense fallback={''}>
        <HomePage />
      </Suspense>
    ),
    permission: []
  },
  {
    path: PAGE_ROUTE.WORKFLOW,
    component: (
      <Suspense fallback={''}>
        <WorkFlowList />
      </Suspense>
    ),
    permission: [ROLES.AGENCY, ROLES.ADMIN, getUserRole(userData()?.user?.role, userData()?.user?.user_level)]
  },
  {
    path: PAGE_ROUTE.COMPANY_PROJECTS,
    component: (
      <Suspense fallback={''}>
        <AgencyCompanyProjects />
      </Suspense>
    )
  },
  //Intake-form Routes
  {
    path: PAGE_ROUTE.INTAKE_FORMS,
    component: (
      <Suspense fallback={''}>
        <AgencyIntakeForms />
      </Suspense>
    ),
    permission: [ROLES.AGENCY, ROLES.ADMIN]
  },
  //Media Routes
  {
    path: PAGE_ROUTE.MEDIA,
    component: (
      <Suspense fallback={''}>
        <MediaHome />
      </Suspense>
    )
  },
  {
    path: MY_JOBS_ROUTE.HOME,
    component: (
      <Suspense fallback={''}>
        <AdminJobsList />
      </Suspense>
    )
  },
  {
    path: PAGE_ROUTE.COMPANY,
    component: (
      <Suspense fallback={''}>
        <AgencyCompanyList />
      </Suspense>
    )
  },
  {
    path: PAGE_ROUTE.USERS,
    component: (
      <Suspense fallback={''}>
        <UsersList />
      </Suspense>
    )
  }
];

// ---------------------------- Define other routes then main pages ----------------------------

// Workflow page routes
export const WORKFLOW_ROUTES: RouteType[] = [
  {
    path: WORKFLOW_ROUTE.CREATE_WORKFLOW,
    component: (
      <Suspense fallback={''}>
        <ApprovalWorkflow />
      </Suspense>
    ),
    permission: [ROLES.ADMIN, ROLES.AGENCY, getUserRole(userData()?.user?.role, userData()?.user?.user_level)]
  }
];
// => MY Projects page routes
export const MY_PROJECTS_ROUTES: RouteType[] = [
  {
    path: PAGE_ROUTE.MY_PROJECTS,
    component: (
      <Suspense fallback={''}>
        <MyProjects />
      </Suspense>
    ),
    permission: [ROLES.AGENCY, getUserRole(userData()?.user?.role, userData()?.user?.user_level)]
  }
];
// => Company(Community) page routes
export const COMPANIES_ROUTES: RouteType[] = [
  {
    path: COMPANIES_ROUTE.COMPANY_PROJECTS_DETAILS,
    component: (
      <Suspense fallback={''}>
        <AgencyCompanyProjectsDetails />
      </Suspense>
    )
  },
  {
    path: COMPANIES_ROUTE.TAGS,
    component: (
      <Suspense fallback={''}>
        <AgencyCompanyProjectsTags />
      </Suspense>
    )
  },
  {
    path: COMPANIES_ROUTE.COMMUNITY_SETTINGS,
    component: (
      <Suspense fallback={''}>
        <CommunitySettings />
      </Suspense>
    )
  },
  {
    path: COMPANIES_ROUTE.PROGRAMS,
    component: (
      <Suspense fallback={''}>
        <Programs />
      </Suspense>
    )
  },
  {
    path: COMPANIES_ROUTE.COPY_CODE,
    component: (
      <Suspense fallback={''}>
        <CopyCode />
      </Suspense>
    )
  },
  {
    path: COMPANIES_ROUTE.CREATIVE_CODE,
    component: (
      <Suspense fallback={''}>
        <CreativeCode />
      </Suspense>
    )
  },
  {
    path: COMPANIES_ROUTE.AUDIENCE,
    component: (
      <Suspense fallback={''}>
        <Audience />
      </Suspense>
    )
  }
];
// =>Intake forms page routes
export const INTAKE_FORMS_ROUTES: RouteType[] = [
  {
    path: INTAKE_FORMS_ROUTE.CREATE_INTAKE_FORM,
    component: (
      <Suspense fallback={''}>
        <CreateIntakeForms action={IntakeFormConstant.Create} />
      </Suspense>
    )
  },
  {
    path: INTAKE_FORMS_ROUTE.EDIT_INTAKE_FORM,
    component: (
      <Suspense fallback={''}>
        <CreateIntakeForms action={IntakeFormConstant.EDIT} />
      </Suspense>
    )
  },
  {
    path: INTAKE_FORMS_ROUTE.VIEW_INTAKE_FORM,
    component: (
      <Suspense fallback={''}>
        <IntakeFormResponseList />
      </Suspense>
    )
  },
  {
    path: INTAKE_FORMS_ROUTE.RESPONSE_INTAKE_FORM,
    component: (
      <Suspense fallback={''}>
        <IntakeFormFields />
      </Suspense>
    )
  }
];
export const PUBLIC_INTAKE_FORM_ROUTE: RouteType =
  //PUBLIC_INTAKE_FORM
  {
    path: INTAKE_FORMS_ROUTE.PUBLIC_INTAKE_FORM,
    component: (
      <Suspense fallback={''}>
        <IntakeFormWrapper />
      </Suspense>
    )
  };
// => Media page routes
export const MEDIA_ROUTES: RouteType[] = [
  // {
  //   path: MEDIA_ROUTE.MEDIA_HOME,
  //   component: (
  //     <Suspense fallback={""}>
  //       <IntakeFormWrapper />
  //     </Suspense>
  //   ),
  // },
];
// => Jobs page routes
export const JOBS_ROUTES: RouteType[] = [
  {
    path: MY_JOBS_ROUTE.CREATE_MY_JOB,
    component: (
      <Suspense fallback={''}>
        <AdminJobsAddEdit />
      </Suspense>
    )
  },
  {
    path: MY_JOBS_ROUTE.UPDATE_MY_JOB,
    component: (
      <Suspense fallback={''}>
        <AdminJobsAddEdit />
      </Suspense>
    )
  },
  {
    path: MY_JOBS_ROUTE.MY_JOB_DETAILS,
    component: (
      <Suspense fallback={''}>
        <JobsDetail />
      </Suspense>
    )
  }
];
// => Draft jobs routes
export const DRAFT_JOBS_ROUTES: RouteType[] = [
  {
    path: DRAFT_JOBS_ROUTE.HOME,
    component: (
      <Suspense fallback={''}>
        <DraftJobs />
      </Suspense>
    )
  },
  {
    path: MY_JOBS_ROUTE.UPDATE_MY_JOB,
    component: (
      <Suspense fallback={''}>
        <AdminJobsAddEdit />
      </Suspense>
    )
  }
];
// => Template jobs routes
export const TEMPLATES_ROUTES: RouteType[] = [
  {
    path: TEMPLATES_ROUTE.HOME,
    component: (
      <Suspense fallback={''}>
        <Templates />
      </Suspense>
    )
  },
  {
    path: TEMPLATES_ROUTE.UPDATE_TEMPLATE,
    component: (
      <Suspense fallback={''}>
        <EditTemplate />
      </Suspense>
    )
  }
];
// => Company page routes
export const COMPANY_ROUTES: RouteType[] = [
  {
    path: COMPANY_ROUTE.COMPANY_LIST_DETAILS,
    component: (
      <Suspense fallback={''}>
        <AgencyCompanyProfile />
      </Suspense>
    )
  }
];

// => Help page routes
export const HELP_ROUTES: RouteType[] = [
  {
    path: HELP_ROUTE.HOME,
    component: (
      <Suspense fallback={''}>
        <HelpList />
      </Suspense>
    )
  },
  {
    path: HELP_ROUTE.CREATE_HELP,
    component: (
      <Suspense fallback={''}>
        <HelpAdd />
      </Suspense>
    )
  },
  {
    path: HELP_ROUTE.VIEW_HELP,
    component: (
      <Suspense fallback={''}>
        <HelpChat />
      </Suspense>
    )
  }
];
// => Intake Form page routes
export const INTAKE_FORMS: RouteType[] = [
  {
    path: COMPANY_ROUTE.COMPANY_LIST_DETAILS,
    component: (
      <Suspense fallback={''}>
        <AgencyCompanyProfile />
      </Suspense>
    )
  }
];
