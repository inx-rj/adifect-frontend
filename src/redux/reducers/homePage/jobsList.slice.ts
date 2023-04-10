import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";
import { jobsListInitialStateType } from "helper/types/jobs/jobsType";

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
const initialState = {
  loading: false,
  JobsListsList: {
    loading: false,
    data: {
      count: 0,
      prev: null,
      next: null,
      results: [jobsListInitialState],
    },
  },
  JobsDetails: {
    loading: false,
    details: null,
    successMessage: "",
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
