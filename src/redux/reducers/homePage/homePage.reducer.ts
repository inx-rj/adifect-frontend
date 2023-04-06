import { combineReducers } from "redux";
import { jobsListSlice } from "./jobsList.slice";
import { inReviewJobsListSlice } from "./inReviewJobsList.slice";

export const homePageReducer = combineReducers({
    jobsList: jobsListSlice.reducer,
    inReviewJobsList: inReviewJobsListSlice.reducer
})