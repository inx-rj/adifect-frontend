import { creatorJobsListSlice } from "./creatorJobsList.slice";
import { combineReducers } from "redux";
import { jobsListSlice } from "./jobsList.slice";
import { inReviewJobsListSlice } from "./inReviewJobsList.slice";
import { freshersJobsListSlice } from "./fresherJobsList.slice";
import { membersApprovalJobsListSlice } from "./membersApprovalJobsList.slice";
import { membersAdminJobsListInReviewSlice } from "./membersJobListInReview.slice";
import { membersAdminJobsListInProgressSlice } from "./membersJobsListInProgress.slice";
import { jobsActivitySlice } from "./jobsActivity.slice";
import { jobsFilesSlice } from "./jobsFiles.slice";
import { jobsProposalsSlice } from "./jobsProposals.slice";
import { jobsQueAnsSlice } from "./jobsQuestionAnswer.slice";
import { jobsCompletedUsers } from "./jobsCompletedUsers.slice";
import { jobsMemberDetails } from "./jobsMemeberDetails.slice";
import { jobsSubmitStatus } from "./jobsSubmitStatus.slice";
import { creatorRatingActivitySlice } from "./creatorRatingActivity.slice";
import { jobAppliedSlice } from "./jobsApplied.slice";
import { creatorActivitySlice } from "./creatorActivity.slice";
import { completedTaskListSlice } from "./completedTask.slice";
import { approvalRejectedStatusSlice } from "./ApprovalRejectedStatus.slice";
import { jobsWorkApprovalSlice } from "./workApproval.slice";

export const homePageReducer = combineReducers({
  jobsList: jobsListSlice.reducer,
  inReviewJobsList: inReviewJobsListSlice.reducer,
  freshersJobsList: freshersJobsListSlice.reducer,
  membersApprovalJobsList: membersApprovalJobsListSlice.reducer,
  membersJobListInReview: membersAdminJobsListInReviewSlice.reducer,
  membersAdminJobsListInProgress: membersAdminJobsListInProgressSlice.reducer,
  creatorJobsList: creatorJobsListSlice.reducer,
  jobsActivity: jobsActivitySlice.reducer,
  jobsFiles: jobsFilesSlice.reducer,
  jobsProposals: jobsProposalsSlice.reducer,
  jobsQuestionAnswer: jobsQueAnsSlice.reducer,
  jobsCompletedUsers: jobsCompletedUsers.reducer,
  jobsSubmitStatus: jobsSubmitStatus.reducer,
  jobsMemberDetails: jobsMemberDetails.reducer,
  creatorRatingActivity: creatorRatingActivitySlice.reducer,
  jobApplied: jobAppliedSlice.reducer,
  creatorActivity: creatorActivitySlice.reducer,
  completedTaskList: completedTaskListSlice.reducer,
  approvalRejectedStatus: approvalRejectedStatusSlice.reducer,
  jobsWorkApproval: jobsWorkApprovalSlice.reducer
});
