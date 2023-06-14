import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  UpdateProfileReducer,
  userPortfolioReducer,
  getCreatorProfileJobsInProgressReducer,
  memberApproverJobsInProgressReducer,
  memberMarketerJobsInProgressReducer,
  getAgencyRatingDetailsReducer,
  getCreatorRatingDetailsReducer,
} from "./redux/reducers/auth-reducer";
import { loaderReducer } from "./redux/reducers/other-reducer";

import {
  categoryReducer,
  categoryDetailsReducer,
  categoryDeleteReducer,
} from "./redux/reducers/category-reducer";

import {
  CountReducer,
  listAllAgencycountReducer,
  updateAllAgencycountReducer,
  DeleteReducer,
  AllDeleteReducer,
} from "./redux/reducers/Notification.reducer";

import {
  companyDeleteReducer,
  companyDetailsReducer,
  companyReducer,
  companyUpdateReducer,
  companyAdminDeleteReducer,
  companyAdminReducer,
  creatorCompanyFilterReducer,
  companydecpReducer,
} from "./redux/reducers/company-reducer";
import {
  jobReducer,
  agencyJobReducer,
  jobDeleteReducer,
  jobDetailsReducer,
  jobDetailsCreatorReducer,
  jobDetailsAgencyReducer,
  freshJobsListReducer,
  relatedJobsReducer,
  DraftJoblistReducer,
  updateJobReducer,
  AdminrelatedJobsReducer,
  updateJobStatusReducer,
  detailsSharereducer,
  publicJobDetailsReducer,
  availableJobListReducer,
  jobAppliedDetailsReducer,
  jobDetailsMemberReducer,
  getIndustryDetailsReducer,
  listAgencyInHouseUsersReducer,
  AdminDetailsJobReducer,
  AdminJobReducer,
  listAdminInHouseUsersReducer,
  SuperAdminInReviewListReducer,
  SuperAdminInProgressListReducer,
  AdminDetailsJobNewPageReducer,
} from "./redux/reducers/job-reducer";

import {
  DamReducer,
  RootDamReducer,
  DamIDReducer,
  PostDamReducer,
  DamDetailsReducer,
  PostDamParentReducer,
  DamimageReducer,
  DamIDIMAGESReducer,
  DamDeleteReducer,
  DamCollectionReducer,
  PostDamCollectionReducer,
  PostDamIdCollectionReducer,
  DamIDCollectionReducer,
  DamRootImages,
  DamParentCollection,
  DamMultipleMove,
  Favourite,
  Titlereducer,
  CollectionDelete,
  Collectionviewreducer,
  Collectionfilespostreducer,
  DamMovepostreducer,
  damfoldermovereducer,
  damrootfoldermovereducer,
  damrenamereducer,
  damcollectionmovereducer,
  damcollectionIDmovereducer,
  DamcollectionMultipleDelete,
  DamInsideMove,
  DamSearch,
  DamVideo,
  DamSearchfolder,
  DamFilterFavourateID,
  DamFilterFavourate,
  DamFilterFavourateCount,
  DamFilterFavourateCountID,
  listAllMostUsed,
  AllParentFilter,
  DamShareReducer,
  Companyreducer,
  CompanyCountreducer,
  CompanyCountIDreducer,
  DaminsideData,
  CompanyIDreducer,
  CollectionDamSearch,
  CollectionDamFilter,
  CollectionDamIDFilter,
  CollectionDamCount,
} from "./redux/reducers/Dam-reducer";

import {
  skillsetAddReducer,
  skillsetDetailsReducer,
  skillsetDeleteReducer,
  skillsetEditReducer,
  userskillsetDetailsReducer,
} from "./redux/reducers/skillset-reducer";
import {
  industryReducer,
  industryDetailsReducer,
  industryDeleteReducer,
  AgencyindustryReducer,
  AgencyindustryDetailsReducer,
  AgencyindustryDeleteReducer,
  AgencyindustryAddReducer,
} from "./redux/reducers/industry-reducer";
import {
  levelReducer,
  levelDetailsReducer,
  levelDeleteReducer,
} from "./redux/reducers/level-reducer";
import {
  skillReducer,
  skillDetailsReducer,
  skillDeleteReducer,
} from "./redux/reducers/skill-reducer";
import {
  mediaReducer,
  mediaDetailsReducer,
  mediaDeleteReducer,
  mediaCreateReducer,
} from "./redux/reducers/media-reducer";
import {
  workflowlevelReducer,
  workflowlevelDetailsReducer,
  workflowlevelDeleteReducer,
} from "./redux/reducers/wordkflowslevel-reducer";

import {
  QuestionReducer,
  QuestionDetailsReducer,
  QuestionDeleteReducer,
  SearchQuestionReducer,
  PostQuestionReducer,
  SearchQuestionAdminReducer,
} from "./redux/reducers/Question-reducer";

import {
  AnswerReducer,
  AnswerDetailsReducer,
  AnswerDeleteReducer,
  PostAnswerReducer,
} from "./redux/reducers/Answer-reducer";

import {
  AllInviteReducer,
  InviteDeleteReducer,
  InviteUpdateReducer,
  inviteDetailsReducer,
  CompanyInviteProflePostReducer,
  inviteAcceptRejectReducer,
  invitedAdminMembersListReducer,
} from "./redux/reducers/invite-reducer";

import {
  agencyCompanyReducer,
  agencyCompanyDetailsReducer,
  agencyCompanyDeleteReducer,
  MemberCompanyDeleteReducer,
} from "./redux/reducers/workflow-company-reducer";
import {
  workflowReducer,
  workflowDetailsReducer,
  workflowDeleteReducer,
  workflowMemberReducer,
  workflowMainDetailsReducer,
  workflowStageDeleteReducer,
  workflowAdminReducer,
  adminWorkflowAddReducer,
  adminWorkflowEditReducer,
  workflowMemberApproversReducer,
} from "./redux/reducers/Workflow-reducer";
import {
  workflowstagestageReducer,
  workflowstagestageDetailsReducer,
  workflowstagestageDeleteReducer,
} from "./redux/reducers/workflowstage-reducer";
import {
  templateListReducer,
  templateDetailsReducer,
  templateUpdateReducer,
  templateDeleteReducer,
} from "./redux/reducers/jobTemplate-reducer";
import {
  proposalsListReducer,
  rejectProposalReducer,
  acceptProposalReducer,
  proposalsSeenReducer,
  proposalsSeenCountReducer,
} from "./redux/reducers/proposals-reducer";
import {
  agencyProjectsByFilterReducer,
  agencyProjectsByFilterDuplicateReducer,
  projectsByFilterReducer,
  projectsByFilterDuplicateReducer,
} from "./redux/reducers/project-reducer";

import {
  usersAdminReducer,
  UserAdminDetailsReducer,
  adminUpdateUserReducer,
} from "./redux/reducers/user-reducer";

import { agencyAdminReducer } from "./redux/reducers/agency-reducer";

import {
  allcompanyReducer,
  alljobReducer,
  allInvitesReducer,
  allworkflowReducer,
  blockJobsReducer,
  StatusjobReducer,
  CompanyBlockReducer,
  MemeberInviteBlockReducer,
  WorkflowBlockReducer,
} from "./redux/reducers/Agency-data-reducers";

import {
  AgencyAnalyticsAdsListReducer,
  AgencyAnalyticsChartReducer,
} from "./redux/reducers/Agency-analytics-reducers";

import {
  AgencyCompanyProjectsReducer,
  AgencyCompanyTagsReducer,
  AgencyAddCompanyTagReducer,
  AgencyCompanyProjectsFiltersReducer,
  AgencyCommunitySettingsReducer,
  AgencyAudiencesReducer,
  AgencyCompanyStoryDetailReducer,
} from "./redux/reducers/Agency-companies-tabs";

import {
  allworkflowcompanyReducer,
  allcompanyconpanyReducer,
  alljobcompanyReducer,
  allInvitescompanyReducer,
  memeberDeleteReducer,
  AgencyMemeberBlockReducer,
} from "./redux/reducers/Agency-data-company-reducers";

import {
  agencyProfileEmailChangeReducer,
  agencyProfilePasswordChangeReducer,
  agencyProfileCommunicationReducer,
  getAgencyProfileCommunicationReducer,
  agencyProfileCommDeleteReducer,
  agencyProfileCommEditDataReducer,
  getAgencyProfileJobsInProgressReducer,
} from "./redux/reducers/agency-profile-account-reducer";

import {
  creatorActivityReducer,
  agencyActivityReducer,
  postActivityReducer,
  creatorActivityJobSubmitReducer,
  creatorAppliedJobIdReducer,
  jobSubmitStatusReducer,
  memberActivityReducer,
  isApprovalRejectedStatusReducer,
  getInvitedUsersListReducer,
  getJobCompletedUsersReducer,
  completeJobActivityReducer,
  getCompletedTaskListReducer,
  AgencyActivityRatingReducer,
  CreatorActivityGetRatingReducer,
  CreatorActivityRatingReducers,
  adminActivityReducer,
} from "./redux/reducers/activity-reducer";

import {
  getMemberJobListReducer,
  getMemberJobDetailsReducer,
  MemberViewApproveReducer,
  getMemberApprovalJobListReducer,
} from "./redux/reducers/activity-member-reducer";

import {
  memberApproverComapnyReducer,
  memberApproverComapnyDataReducer,
} from "./redux/reducers/Member-Approver-Company-Reducers";

import {
  HelpCommonPostReducer,
  GetHelpCommonReducer,
  GetDetailsHelpCommonReducer,
  HelpMessageSendReducer,
  AdminGetHelpUsersListReducer,
  AdminGetHelpMessageReducer,
  AdminHelpCommonPostReducer,
  AgencyHelpMessageSendReducer,
} from "./redux/reducers/Help-common-reducers";

import {
  memberAdminWorkflowReducer,
  memberAdminWorkflowDeleteReducer,
  memberAdminWorkflowApproverListReducer,
  MemberAdminWorkflowApproverStagesDetailsReduce,
} from "./redux/reducers/Member-Admin-Workflow-Reducers";

import { companyMemberReducer } from "./redux/reducers/Member-CompanyReducer";

import {
  SuperAdminAllParentFilter,
  SuperAdminDamReducer,
  SuperAdminRootDamReducer,
  SuperAdminDamIDReducer,
  SuperAdminPostDamReducer,
  SuperAdminDamDetailsReducer,
  SuperAdminPostDamParentReducer,
  SuperAdminDamimageReducer,
  SuperAdminDamIDIMAGESReducer,
  SuperAdminDamDeleteReducer,
  SuperAdminDamCollectionReducer,
  SuperAdminPostDamCollectionReducer,
  SuperAdminPostDamIdCollectionReducer,
  SuperAdminDamIDCollectionReducer,
  SuperAdminDamRootImages,
  SuperAdminDamParentCollection,
  SuperAdminDamMultipleMove,
  SuperAdminFavourite,
  SuperAdminTitlereducer,
  AdminCollectionDamFilter,
  SuperAdminCollectionDelete,
  SuperAdminCollectionviewreducer,
  SuperAdminCollectionfilespostreducer,
  SuperAdminDamMovepostreducer,
  SuperAdmindamfoldermovereducer,
  SuperAdmindamrootfoldermovereducer,
  SuperAdmindamrenamereducer,
  SuperAdmindamcollectionmovereducer,
  SuperAdmindamcollectionIDmovereducer,
  SuperAdminDamcollectionMultipleDelete,
  SuperAdminDamInsideMove,
  SuperAdminDamSearch,
  SuperAdminDamVideo,
  SuperAdminDamSearchfolder,
  SuperAdminDamFilterFavourateID,
  SuperAdminDamFilterFavourate,
  SuperAdminDamFilterFavourateCount,
  SuperAdminDamFilterFavourateCountID,
  SuperAdminlistAllMostUsed,
  SuperAdminDamShareReducer,
  SuperAdminCompanyreducer,
  SuperAdminCompanyCountreducer,
  SuperAdminCompanyCountIDreducer,
  AdminDaminsideData,
  SuperAdminCompanyIDreducer,
  AdminCollectionsearchFilter,
  AdminCollectioncountFilter,
} from "./redux/reducers/Admin-dan-Reducers";

import {
  memberAdminCompanyListReducer,
  memberAdminGetCompanyListReducer,
  memberAdminGetDetailsCompanyListReducer,
  memberAdminEditCompanyListReducer,
  memberAdminAddCompanyReducer,
} from "./redux/reducers/Member-Company-list-Reducer";
import {
  memberAdminInviteListReducer,
  memberAdminInviteListDeleteReducer,
  memberAdminInviteListPostReducer,
  memberAdminInviteListUpdateReducer,
} from "./redux/reducers/Member-Admin-Invite-list-Reducers";
import {
  MemberAdminGetJobListReducer,
  MemberAdminJobListDeleteReducer,
  MemberAdminGetJobDetailsReducer,
  MemberAdminDraftJoblistReducer,
  MemberAdminDraftJobDeleteReducer,
  MemberInHouseGetJobListReducer,
  MemberInHouseGetJobDetailsReducer,
  MemberInProgressInHouseGetJobListReducer,
  MemberAdminGetJobInProgressListReducer,
  MemberAdminGetJobInReviewListReducer,
} from "./redux/reducers/Member-Admin-Job-List-Reducers";

import {
  MemberAdminTemplateReducers,
  MemberAdminTemplateDeleteReducers,
  MemberAdminTemplateUpdateReducer,
} from "./redux/reducers/member-Admin-template-Reducers";

import {
  getActivityFilesListAdminReducer,
  getActivityFilesListReducer,
  getCreatorActivityFilesListReducer,
  getMemberActivityFilesListReducer,
} from "./redux/reducers/file-reducer";

import {
  MemberDamReducer,
  MemberRootDamReducer,
  MemberDamIDReducer,
  MemberPostDamReducer,
  MemberDamDetailsReducer,
  MemberPostDamParentReducer,
  MemberDamimageReducer,
  MemberDamIDIMAGESReducer,
  MemberDamDeleteReducer,
  MemberDamCollectionReducer,
  MemberPostDamCollectionReducer,
  MemberPostDamIdCollectionReducer,
  MemberDamIDCollectionReducer,
  MemberDamRootImages,
  MemberDamParentCollection,
  MemberDamMultipleMove,
  MemberFavourite,
  MemberTitlereducer,
  MemberCollectionDelete,
  MemberCollectionviewreducer,
  MemberCollectionfilespostreducer,
  MemberDamMovepostreducer,
  Memberdamfoldermovereducer,
  Memberdamrootfoldermovereducer,
  Memberdamrenamereducer,
  Memberdamcollectionmovereducer,
  MemberdamcollectionIDmovereducer,
  MemberDamcollectionMultipleDelete,
  MemberDamInsideMove,
  MemberDamSearch,
  MemberDamVideo,
  MemberDamSearchfolder,
  MemberDamFilterFavourateID,
  MemberDamFilterFavourate,
  MemberDamFilterFavourateCount,
  MemberDamFilterFavourateCountID,
  MemberlistAllMostUsed,
  MemberAllParentFilter,
  MemberDamShareReducer,
  MemberCompanyreducer,
  MemberCompanyCountreducer,
  MemberCompanyCountIDreducer,
  InHouseCompanyReducer,
  InhouseCollectionDamSearch,
  InhouseCollectionDamFilter,
  InhouseCollectionDamCount,
  MemberCompanyIDreducer,
} from "./redux/reducers/Member-Dam-Reducers";

import {
  MemberProjectsByFilterReducer,
  MemberInhouseProjectsByFilterReducer,
} from "./redux/reducers/Member-Project-Reducers";

const reducer = combineReducers({
  authReducer: userLoginReducer,
  AllInviteReducer,
  InviteDeleteReducer,
  InviteUpdateReducer,
  inviteDetailsReducer,
  CompanyInviteProflePostReducer,
  userRegisterReducer,
  userPortfolioReducer,
  getCreatorProfileJobsInProgressReducer,
  memberApproverJobsInProgressReducer,
  memberMarketerJobsInProgressReducer,
  UpdateProfileReducer,
  userDetailsReducer,
  categoryReducer,
  categoryDetailsReducer,
  categoryDeleteReducer,
  jobReducer,
  availableJobListReducer,
  DraftJoblistReducer,
  agencyJobReducer,
  jobDeleteReducer,
  jobDetailsReducer,
  jobDetailsCreatorReducer,
  jobDetailsAgencyReducer,
  relatedJobsReducer,
  updateJobReducer,
  updateJobStatusReducer,
  jobAppliedDetailsReducer,
  loaderReducer,
  freshJobsListReducer,
  industryReducer,
  industryDetailsReducer,
  industryDeleteReducer,
  AgencyindustryReducer,
  AgencyindustryDetailsReducer,
  AgencyindustryDeleteReducer,
  AgencyindustryAddReducer,
  companyMemberReducer,
  levelReducer,
  levelDetailsReducer,
  levelDeleteReducer,
  skillReducer,
  skillDetailsReducer,
  skillDeleteReducer,
  workflowlevelReducer,
  workflowlevelDetailsReducer,
  workflowlevelDeleteReducer,
  workflowstagestageReducer,
  workflowstagestageDetailsReducer,
  workflowstagestageDeleteReducer,
  workflowReducer,
  workflowDetailsReducer,
  workflowMainDetailsReducer,
  workflowMemberReducer,
  workflowDeleteReducer,
  workflowStageDeleteReducer,
  workflowAdminReducer,
  AnswerReducer,
  AnswerDetailsReducer,
  AnswerDeleteReducer,
  adminWorkflowEditReducer,
  adminWorkflowAddReducer,
  companyReducer,
  companyDeleteReducer,
  companyAdminDeleteReducer,
  companyDetailsReducer,
  companyUpdateReducer,
  companyAdminReducer,
  agencyCompanyReducer,
  agencyCompanyDetailsReducer,
  agencyCompanyDeleteReducer,
  MemberCompanyDeleteReducer,
  mediaReducer,
  mediaDetailsReducer,
  mediaDeleteReducer,
  mediaCreateReducer,
  QuestionReducer,
  QuestionDetailsReducer,
  SearchQuestionReducer,
  QuestionDeleteReducer,
  templateListReducer,
  templateDetailsReducer,
  templateUpdateReducer,
  templateDeleteReducer,
  proposalsListReducer,
  rejectProposalReducer,
  acceptProposalReducer,
  proposalsSeenReducer,
  proposalsSeenCountReducer,
  detailsSharereducer,
  PostAnswerReducer,
  skillsetAddReducer,
  skillsetDetailsReducer,
  skillsetDeleteReducer,
  skillsetEditReducer,
  userskillsetDetailsReducer,
  publicJobDetailsReducer,
  DamReducer,
  RootDamReducer,
  DamIDReducer,
  Titlereducer,
  PostDamReducer,
  DamDetailsReducer,
  PostDamParentReducer,
  DamimageReducer,
  DamIDIMAGESReducer,
  DamDeleteReducer,
  DamCollectionReducer,
  PostDamCollectionReducer,
  PostDamIdCollectionReducer,
  DamIDCollectionReducer,
  DamRootImages,
  DamParentCollection,
  DamMultipleMove,
  Favourite,
  CollectionDelete,
  Collectionviewreducer,
  Collectionfilespostreducer,
  DamMovepostreducer,
  damfoldermovereducer,
  damrootfoldermovereducer,
  damrenamereducer,
  damcollectionmovereducer,
  damcollectionIDmovereducer,
  DamcollectionMultipleDelete,
  DamInsideMove,
  DamSearch,
  DamVideo,
  DamSearchfolder,
  DamFilterFavourateID,
  DamFilterFavourate,
  DamFilterFavourateCount,
  DamFilterFavourateCountID,
  listAllMostUsed,
  AllParentFilter,
  DamShareReducer,
  agencyProjectsByFilterReducer,
  agencyProjectsByFilterDuplicateReducer,
  projectsByFilterReducer,
  PostQuestionReducer,
  creatorCompanyFilterReducer,
  companydecpReducer,
  projectsByFilterDuplicateReducer,
  usersAdminReducer,
  UserAdminDetailsReducer,
  agencyAdminReducer,
  adminUpdateUserReducer,
  allcompanyReducer,
  alljobReducer,
  allInvitesReducer,
  allworkflowReducer,
  blockJobsReducer,
  StatusjobReducer,
  CompanyBlockReducer,
  MemeberInviteBlockReducer,
  WorkflowBlockReducer,
  AgencyAnalyticsAdsListReducer,
  AgencyAnalyticsChartReducer,
  AgencyCompanyProjectsReducer,
  AgencyCompanyStoryDetailReducer,
  AgencyCompanyProjectsFiltersReducer,
  AgencyCompanyTagsReducer,
  AgencyAddCompanyTagReducer,
  AgencyCommunitySettingsReducer,
  AgencyAudiencesReducer,
  allworkflowcompanyReducer,
  allcompanyconpanyReducer,
  alljobcompanyReducer,
  allInvitescompanyReducer,
  memeberDeleteReducer,
  AgencyMemeberBlockReducer,
  agencyProfileEmailChangeReducer,
  agencyProfilePasswordChangeReducer,
  agencyProfileCommunicationReducer,
  getAgencyProfileCommunicationReducer,
  agencyProfileCommDeleteReducer,
  agencyProfileCommEditDataReducer,
  getAgencyProfileJobsInProgressReducer,
  creatorActivityReducer,
  agencyActivityReducer,
  postActivityReducer,
  creatorActivityJobSubmitReducer,
  creatorAppliedJobIdReducer,
  jobSubmitStatusReducer,
  getMemberJobListReducer,
  getMemberJobDetailsReducer,
  MemberViewApproveReducer,
  jobDetailsMemberReducer,
  getIndustryDetailsReducer,
  getMemberApprovalJobListReducer,
  memberActivityReducer,
  inviteAcceptRejectReducer,
  isApprovalRejectedStatusReducer,
  getInvitedUsersListReducer,
  getJobCompletedUsersReducer,
  completeJobActivityReducer,
  workflowMemberApproversReducer,
  getCompletedTaskListReducer,
  memberApproverComapnyReducer,
  memberApproverComapnyDataReducer,
  memberAdminWorkflowReducer,
  memberAdminCompanyListReducer,
  memberAdminGetCompanyListReducer,
  memberAdminGetDetailsCompanyListReducer,
  memberAdminEditCompanyListReducer,
  memberAdminAddCompanyReducer,
  memberAdminWorkflowDeleteReducer,
  memberAdminWorkflowApproverListReducer,
  MemberAdminWorkflowApproverStagesDetailsReduce,
  MemberAdminGetJobListReducer,
  MemberAdminJobListDeleteReducer,
  MemberAdminGetJobDetailsReducer,
  MemberAdminDraftJoblistReducer,
  MemberAdminDraftJobDeleteReducer,
  memberAdminInviteListReducer,
  memberAdminInviteListDeleteReducer,
  memberAdminInviteListPostReducer,
  memberAdminInviteListUpdateReducer,
  MemberAdminTemplateReducers,
  MemberAdminTemplateDeleteReducers,
  MemberAdminTemplateUpdateReducer,
  getActivityFilesListReducer,
  getCreatorActivityFilesListReducer,
  getMemberActivityFilesListReducer,
  listAgencyInHouseUsersReducer,
  Companyreducer,
  CompanyIDreducer,
  CompanyCountreducer,
  CompanyCountIDreducer,
  DaminsideData,
  CollectionDamSearch,
  MemberDamimageReducer,
  MemberPostDamReducer,
  MemberPostDamParentReducer,
  MemberPostDamIdCollectionReducer,
  MemberPostDamCollectionReducer,
  MemberTitlereducer,
  MemberDamReducer,
  MemberRootDamReducer,
  MemberDamIDReducer,
  MemberDamIDIMAGESReducer,
  MemberDamCollectionReducer,
  MemberDamIDCollectionReducer,
  MemberProjectsByFilterReducer,
  MemberInhouseProjectsByFilterReducer,
  MemberInHouseGetJobListReducer,
  MemberInHouseGetJobDetailsReducer,
  MemberDamDetailsReducer,
  MemberDamDeleteReducer,
  MemberDamRootImages,
  MemberDamParentCollection,
  MemberDamMultipleMove,
  MemberFavourite,
  MemberCollectionDelete,
  MemberCollectionviewreducer,
  MemberCollectionfilespostreducer,
  MemberDamMovepostreducer,
  Memberdamfoldermovereducer,
  Memberdamrootfoldermovereducer,
  Memberdamrenamereducer,
  Memberdamcollectionmovereducer,
  MemberdamcollectionIDmovereducer,
  MemberDamcollectionMultipleDelete,
  MemberDamInsideMove,
  MemberDamSearch,
  MemberDamVideo,
  MemberDamSearchfolder,
  MemberDamFilterFavourateID,
  MemberDamFilterFavourate,
  MemberDamFilterFavourateCount,
  MemberDamFilterFavourateCountID,
  MemberlistAllMostUsed,
  MemberAllParentFilter,
  MemberDamShareReducer,
  MemberCompanyreducer,
  MemberCompanyCountreducer,
  MemberCompanyCountIDreducer,
  InHouseCompanyReducer,
  InhouseCollectionDamSearch,
  InhouseCollectionDamFilter,
  InhouseCollectionDamCount,
  MemberCompanyIDreducer,
  CollectionDamFilter,
  CollectionDamIDFilter,
  CollectionDamCount,
  AgencyActivityRatingReducer,
  CreatorActivityGetRatingReducer,
  CreatorActivityRatingReducers,
  getAgencyRatingDetailsReducer,
  getCreatorRatingDetailsReducer,
  MemberInProgressInHouseGetJobListReducer,
  getActivityFilesListAdminReducer,
  adminActivityReducer,
  SearchQuestionAdminReducer,
  AdminDetailsJobReducer,
  AdminJobReducer,
  SuperAdminAllParentFilter,
  SuperAdminDamReducer,
  SuperAdminRootDamReducer,
  SuperAdminDamIDReducer,
  SuperAdminPostDamReducer,
  SuperAdminDamDetailsReducer,
  SuperAdminPostDamParentReducer,
  SuperAdminDamimageReducer,
  SuperAdminDamIDIMAGESReducer,
  SuperAdminDamDeleteReducer,
  SuperAdminDamCollectionReducer,
  SuperAdminPostDamCollectionReducer,
  SuperAdminPostDamIdCollectionReducer,
  SuperAdminDamIDCollectionReducer,
  SuperAdminDamRootImages,
  SuperAdminDamParentCollection,
  SuperAdminDamMultipleMove,
  SuperAdminFavourite,
  SuperAdminTitlereducer,
  AdminCollectionDamFilter,
  SuperAdminCollectionDelete,
  SuperAdminCollectionviewreducer,
  SuperAdminCollectionfilespostreducer,
  SuperAdminDamMovepostreducer,
  SuperAdmindamfoldermovereducer,
  SuperAdmindamrootfoldermovereducer,
  SuperAdmindamrenamereducer,
  SuperAdmindamcollectionmovereducer,
  SuperAdmindamcollectionIDmovereducer,
  SuperAdminDamcollectionMultipleDelete,
  SuperAdminDamInsideMove,
  SuperAdminDamSearch,
  SuperAdminDamVideo,
  SuperAdminDamSearchfolder,
  SuperAdminDamFilterFavourateID,
  SuperAdminDamFilterFavourate,
  SuperAdminDamFilterFavourateCount,
  SuperAdminDamFilterFavourateCountID,
  SuperAdminlistAllMostUsed,
  SuperAdminDamShareReducer,
  SuperAdminCompanyreducer,
  SuperAdminCompanyCountreducer,
  SuperAdminCompanyCountIDreducer,
  AdminDaminsideData,
  SuperAdminCompanyIDreducer,
  AdminCollectionsearchFilter,
  AdminCollectioncountFilter,
  invitedAdminMembersListReducer,
  CountReducer,
  HelpCommonPostReducer,
  GetHelpCommonReducer,
  GetDetailsHelpCommonReducer,
  HelpMessageSendReducer,
  AdminGetHelpUsersListReducer,
  AdminGetHelpMessageReducer,
  AdminHelpCommonPostReducer,
  AgencyHelpMessageSendReducer,
  SuperAdminInReviewListReducer,
  listAdminInHouseUsersReducer,
  SuperAdminInProgressListReducer,
  MemberAdminGetJobInProgressListReducer,
  MemberAdminGetJobInReviewListReducer,
  AdminrelatedJobsReducer,
  listAllAgencycountReducer,
  AdminDetailsJobNewPageReducer,
  updateAllAgencycountReducer,
  DeleteReducer,
  AllDeleteReducer,
});

// get userData from localStorage
const userDataFromStorage = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

// initialState
const initialState = {
  authReducer: { userData: userDataFromStorage },
};
// middleware used thunk
const middleware = [thunk];

// store variable initialized
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
