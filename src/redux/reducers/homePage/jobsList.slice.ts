import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";
import {
  jobsDetailsInitialStateType,
  jobsListInitialStateType,
} from "helper/types/jobs/jobsType";

const jobsListInitialState: jobsListInitialStateType = {
  assigned_to: 0,
  company: 0,
  created: "",
  created_by: 0,
  description: "",
  due_date_index: 0,
  expected_delivery_date: "",
  house_member: [],
  id: 0,
  image_url: "",
  images: [],
  industry: 0,
  is_active: false,
  is_blocked: false,
  is_house_member: false,
  is_trashed: false,
  job_due_date: "",
  job_type: "",
  jobtasks_job: [],
  level: null,
  modified: "",
  price: null,
  related_jobs: null,
  sample_work_url: "",
  skills: [],
  status: 0,
  tags: "",
  template_name: null,
  title: "",
  user: 0,
  workflow: 0,
};

const jobsDetailsInitialState: jobsDetailsInitialStateType = {
  id: 0,
  images: [],
  jobtasks_job: [],
  level: {
    id: 0,
    created: "",
    modified: "",
    is_trashed: false,
    level_name: "",
    slug: "",
    description: "",
    is_active: false,
  },
  skills: [
    {
      id: 0,
      created: "",
      modified: "",
      is_trashed: false,
      skill_name: "",
      slug: "",
      is_active: false,
    },
  ],
  get_jobType_details: "",
  job_applied_status: "",
  workflow_name: "",
  company_name: "",
  industry_name: "",
  username: "",
  job_applied_id: "",
  is_edit: false,
  hired_users: [
    {
      user__username: "",
      user_id: 0,
    },
  ],
  job_applied_modified: false,
  is_expire: false,
  flag: false,
  users_applied_status: [
    {
      user__username: "",
      user_id: 0,
      status: 0,
    },
  ],
  created: "",
  modified: "",
  is_trashed: false,
  title: "",
  description: "",
  job_type: "",
  expected_delivery_date: "",
  price: "",
  tags: "",
  image_url: "",
  sample_work_url: "",
  job_due_date: "",
  due_date_index: 0,
  template_name: null,
  status: 0,
  is_active: false,
  is_blocked: false,
  is_house_member: false,
  related_jobs: null,
  company: 0,
  industry: 0,
  workflow: 0,
  user: null,
  created_by: null,
  assigned_to: null,
  house_member: [],
};

const initialState = {
  loading: false,
  JobsListsList: {
    loading: false,
    data: {
      count: 0,
      prev: null,
      next: null,
      // results: [jobsListInitialState],
      results: [],
    },
  },
  JobsDetails: {
    loading: false,
    details: null,
  },
};

export const jobsListSlice = createSlice({
  name: "jobsList",
  initialState,
  reducers: {
    SET_JOBS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_JOBS_LIST_LOADING: (state, action) => ({
      ...state,
      JobsListsList: {
        ...state.JobsListsList,
        loading: action.payload,
      },
    }),

    SET_JOBS_DATA: (state, action) => ({
      ...state,
      JobsListsList: {
        ...state.JobsListsList,
        data: action.payload,
      },
    }),

    SET_JOBS_DETAILS: (state, action) => ({
      ...state,
      JobsDetails: {
        ...state.JobsDetails,
        details: action.payload,
      },
    }),

    CLEAR_JOBS: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_JOBS_LOADING,
  SET_JOBS_LIST_LOADING,
  SET_JOBS_DATA,
  SET_JOBS_DETAILS,
  CLEAR_JOBS,
} = jobsListSlice.actions;

export const JOBS_DATA = (state: RootState) => state.homePage.jobsList;

export const GET_JOBS_DETAILS = (state: RootState) =>
  state.homePage.jobsList.JobsDetails;

// export const COMPANY_PROJECTS_FILTERS_DATA = (state: RootState) =>
//   state.homePage.JobsListsFilters;

export const COMPANY_PROJECTS = (state: RootState) => state.homePage;
