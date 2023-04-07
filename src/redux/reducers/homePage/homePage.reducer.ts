import { combineReducers } from "redux";
import { jobsListSlice } from "./jobsList.slice";
import { inReviewJobsListSlice } from "./inReviewJobsList.slice";
import { freshersJobsListSlice } from "./fresherJobsList.slice";
import { membersApprovalJobsListSlice } from "./membersApprovalJobsList.slice";
import { membersAdminJobsListInReviewSlice } from "./membersJobListInReview.slice";
import { membersAdminJobsListInProgressSlice } from "./membersJobsListInProgress.slice";

export const homePageReducer = combineReducers({
  jobsList: jobsListSlice.reducer,
  inReviewJobsList: inReviewJobsListSlice.reducer,
  freshersJobsList: freshersJobsListSlice.reducer,
  membersApprovalJobsList: membersApprovalJobsListSlice.reducer,
  membersJobListInReview: membersAdminJobsListInReviewSlice.reducer,
  membersAdminJobsListInProgress: membersAdminJobsListInProgressSlice.reducer,
});
