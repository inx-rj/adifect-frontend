import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

// Common
// import Job_add_edit from "./MyComponents/Common/Job-add-edit";
import Job_add_edit from "./MyComponents/Common/Job-add-edit";
// import Job_add_edit_dev from "./MyComponents/Common/Job-add-edit-dev";
import Projects from "./MyComponents/Common/Projects";
import Company_projects from "./MyComponents/Common/Company-projects.jsx";
import Dashboard from "./MyComponents/Common/Dashboard";
import Analytics from "./MyComponents/Common/Analytics";
import Job_list from "./MyComponents/Common/Job-list";
import Earnings from "./MyComponents/Common/Earnings";
import Job_details from "./MyComponents/Common/Job-details";
import Settings from "./MyComponents/Common/Settings";
import Transactions from "./MyComponents/Common/Transactions";
import Error from "./MyComponents/Common/Error";
import Activity from "./MyComponents/Common/Activity";
import Approval_workflow from "./MyComponents/Common/Approval-workflow";
import Approval_workflow_list from "./MyComponents/Common/Approval-workflow-list";
import Help_Common from "./MyComponents/Common/Help-Common";
import Help_info_table from "./MyComponents/Common/Help-info-table";
import Help_view_message from "./MyComponents/Common/Help-view-message";

// Authentication
import Login from "./MyComponents/Authentication/Login";
import Signup from "./MyComponents/Authentication/Signup";
import Profile from "./MyComponents/Authentication/Profile";
import Profile_dev from "./MyComponents/Authentication/Profile_dev";
import Profile_design from "./MyComponents/Authentication/Profile_design";
import Profileedit from "./MyComponents/Authentication/Profile-edit";
import Profile_new from "./MyComponents/Authentication/Profile_new";
import ForgotPassword from "./MyComponents/Authentication/Forgot-password";
import Thank_you from "./MyComponents/Authentication/Thank-you";

// Admin
import Agency_data from "./MyComponents/Admin/Agency-data";
import Workflow_stage_add from "./MyComponents/Admin/workflowstage-add.js";
import Admin_jobs_workflowlevels from "./MyComponents/Admin/Admin-jobs-workflowlevels";
import Admin_jobs_workflowstage from "./MyComponents/Admin/Workflow-stages";
import Workflow_level_add from "./MyComponents/Admin/Workflow-level-add.js";
import Skill_add_edit from "./MyComponents/Admin/Skill-add-edit";
import SkillsList from "./MyComponents/Admin/Skills-list";
import Level_add_edit from "./MyComponents/Admin/Level-add-edit";
import LevelsList from "./MyComponents/Admin/Levels-list";
import IndustryList from "./MyComponents/Admin/Industry-list";
import Industry_add_edit from "./MyComponents/Admin/Industry-add-edit";
import CategoryList from "./MyComponents/Admin/Category-list";
import Category_add_edit from "./MyComponents/Admin/Category-add-edit";
import Company_add_edit from "./MyComponents/Admin/Company-add-edit";
import CompanyList from "./MyComponents/Admin/Company-list";
import Admin_agency_users_list from "./MyComponents/Admin/Admin-agency-users-list";
import Admin_Help_Chat from "./MyComponents/Admin/Admin-Help-Chat";
import Admin_Help_Table from "./MyComponents/Admin/Admin-Help-Table";

import UserList from "./MyComponents/Admin/user-list";
import AgencyList from "./MyComponents/Admin/agency-list";

// Development
import Admin_jobs_add_edit_dev from "./MyComponents/Admin/Admin-jobs-add-edit-dev";
import Admin_jobs_list_dev from "./MyComponents/Admin/Admin-job-list-dev";
import Job_details_dev from "./MyComponents/Admin/Admin-job-details-dev";

import Agency_jobs_add_edit from "./MyComponents/Agency/Agency-jobs-add-edit-dev";
import Agency_approval_workflow_dev2 from "./MyComponents/Agency/Agency-approval-workflow-dev.js";

import Creator_apply_job_dev from "./MyComponents/Creator/Creator-apply-job-dev.js";
// Dev Design
import Agency_jobs_add_edit_dev_design from "./MyComponents/Agency/Agency-jobs-add-edit-dev-design";

// Creator
// import Creator_latest_jobs from "./MyComponents/Agency/Creator-latest-jobs";
import Creator_Apply_Job from "./MyComponents/Creator/Creator-apply-job";

// Agency
import Workflow_agency_stage_add from "./MyComponents/Agency/Agency-workflow-stage-add-edit";
import Workflow_company_add from "./MyComponents/Agency/Agency-Company-add";
import Agency_jobs_workflowstage from "./MyComponents/Agency/Agency-workflow-stage-list.js";
import Agency_jobs_company from "./MyComponents/Agency/Agency-company-list";
import Agency_jobs_workflowlevels from "./MyComponents/Agency/Agency-workflow-level-list.js";
import Workflow_agency_level_add from "./MyComponents/Agency/Agency-workflow-level-add-edit.js";
import Agency_approval_workflow_dev from "./MyComponents/Agency/Workflowdev.js";
import DragDrop from "./MyComponents/Agency/test-reorder.js";
import Agency_template_list from "./MyComponents/Agency/Agency-template-list";
import Agency_template_edit from "./MyComponents/Agency/Agency-template-edit";
import Agency_company_datalist from "./MyComponents/Agency/Agency-company-datalist";
import Agency_Notifications_view from "./MyComponents/Agency/Agency-Notifications-view";
import Agency_company_projects_details from "./MyComponents/Agency/Company-projects/Agency-company-projects-details.jsx";

import Agency_draft_jobs_list from "./MyComponents/Agency/Agency-draft-jobs-list.js";

// Others
import AppLayout from "./containers/Layout/App-layout";

// Frontend
import PopupMedia from "./MyComponents/Frontend/media-popup";

// Routing
import PublicRoute from "./routing/PublicRoute";
import ProtectedRoute from "./routing/ProtectedRoute";
import AdminRoute from "./routing/AdminRoute";

// Member
import Member_Company from "./MyComponents/Member/Member-Company";
// import Member_Approver_Company_datalist from "./MyComponents/Member/Member-Approver-Company-datalist";
import Member_Admin_invite from "./MyComponents/Member/Member-Admin-invite";
import Member_Admin_draft_jobs_list from "./MyComponents/Member/Member-Admin-draft-jobs-list";
import Member_Admin_template_list from "./MyComponents/Member/Member-Admin-template-list";
import Member_Admin_template_Edit from "./MyComponents/Member/Member-Admin-template-Edit";
import Member_MovefolderDam from "./MyComponents/Member/Member-MovefolderDam";
import Member_Admin_Company_Add_Edit from "./MyComponents/Member/Member-Admin-Company-Add-Edit";
import Member_Company_Datalist from "./MyComponents/Member/Member-Company-Datalist";
import Company_projects_tags from "./MyComponents/Common/Company-projects-tags";

// invite
import Main_Invite from "./MyComponents/Common/Main-Invite";

// Email Template
import EmailTemplates from "./containers/EmailTemplates";

import {
  Routes,
  Route,
} from "react-router-dom";
import Community_settings from "./MyComponents/Common/Community-settings";
import Audiences from "./MyComponents/Common/Audiences";
import Programs from "./MyComponents/Common/Programs";
import Creative_code from "./MyComponents/Common/Creative-code";
import Copy_code from "./MyComponents/Common/Copy-code";
import IntakeForms from "./MyComponents/Common/IntakeForms";
import IntakeFormResponseList from "./MyComponents/Agency/Intake-Forms/IntakeFormResponseList";
import DynamicForm from "./MyComponents/Agency/Intake-Forms/DynamicForm";
import store from "./store";

function App() {
  const [isToggle, setIsToggle] = useState(false);
  const [headerCompany, setHeaderCompany] = useState(null);

  const location = window.location;

  useEffect(() => {
    console.log({ headerCompany, location, storeState: store.getState() }, "--- Inside App()");
  }, [location, store]);

  return (
    <>
      <Routes>

        <Route
          element={
            <AppLayout
              headerCompany={headerCompany}
              setHeaderCompany={setHeaderCompany}
              isToggle={isToggle}
              setIsToggle={setIsToggle}
            />
          }
        >
          <Route
            exact
            path="/member/company"
            element={
              <ProtectedRoute>
                <Member_Company />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/popup-media"
            element={
              <ProtectedRoute>
                <PopupMedia />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/jobs/add-dev-design"
            element={
              <ProtectedRoute>
                <Agency_jobs_add_edit_dev_design />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/workflow/test"
            element={
              <ProtectedRoute>
                <DragDrop />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/workflow/test/:workflowId"
            element={
              <ProtectedRoute>
                <DragDrop />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/email-template"
            element={
              <ProtectedRoute>
                <EmailTemplates />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/Admin-jobs-add-edit-dev/:jobId"
            element={
              <ProtectedRoute>
                <Admin_jobs_add_edit_dev />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            // path="/agencydata/:agencyid"
            path="/companydata/:companyid/:agencyId"
            element={
              <ProtectedRoute>
                <Agency_data />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            // path="/companydata/:companyid/:agencyId"
            path="/companydata/:companyid"
            element={
              <ProtectedRoute>
                <Agency_company_datalist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            // path="/companydata/:companyid/:agencyId"
            path="/notifications"
            element={
              <ProtectedRoute>
                <Agency_Notifications_view />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/Workflow/"
            element={
              <ProtectedRoute>
                <Approval_workflow_list />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/draft-jobs/"
            element={
              <ProtectedRoute>
                <Agency_draft_jobs_list />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/member-draft-jobs/"
            element={
              <ProtectedRoute>
                <Member_Admin_draft_jobs_list />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/member-templates/list"
            element={
              <ProtectedRoute>
                <Member_Admin_template_list />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/member-templates/:MembertemplateId"
            element={
              <ProtectedRoute>
                <Member_Admin_template_Edit />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/Workflow/add/"
            element={
              <ProtectedRoute>
                <Approval_workflow />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/Workflow/edit/:workflowId"
            element={
              <ProtectedRoute>
                <Approval_workflow />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/Workflow/add-dev/"
            element={
              <ProtectedRoute>
                <Agency_approval_workflow_dev2 />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/Workflow/edit-dev/:workflowId"
            element={
              <ProtectedRoute>
                <Agency_approval_workflow_dev2 />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/stages-workflow/list/add"
            element={
              <ProtectedRoute>
                <Workflow_agency_stage_add />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/stages-workflow/list"
            element={
              <ProtectedRoute>
                <Agency_jobs_workflowstage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/member-media/copy"
            element={
              <ProtectedRoute>
                <Member_MovefolderDam />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/member-media/:parentid/copy"
            element={
              <ProtectedRoute>
                <Member_MovefolderDam />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/agency/company"
            element={
              <ProtectedRoute>
                <Agency_jobs_company />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/templates/list"
            element={
              <ProtectedRoute>
                <Agency_template_list />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/templates/:templateId"
            element={
              <ProtectedRoute>
                <Agency_template_edit />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/agency/users-list"
            element={
              <AdminRoute>
                <Admin_agency_users_list />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="levels-workflow/list"
            element={
              <ProtectedRoute>
                <Agency_jobs_workflowlevels />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/levels-workflow/list/add"
            element={
              <ProtectedRoute>
                <Workflow_agency_level_add />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/levels-workflow/:levelId"
            element={
              <ProtectedRoute>
                <Workflow_agency_level_add />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/agency/company/:companyid"
            element={
              <ProtectedRoute>
                <Workflow_company_add />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/member/company/:companyAdminId"
            element={
              <ProtectedRoute>
                <Member_Admin_Company_Add_Edit />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/member/company/add"
            element={
              <ProtectedRoute>
                <Member_Admin_Company_Add_Edit />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/member/companydata/:companyid"
            element={
              <ProtectedRoute>
                <Member_Company_Datalist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/agency/company/add"
            element={
              <ProtectedRoute>
                <Workflow_company_add />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/stages-workflow/:stageId"
            element={
              <ProtectedRoute>
                <Workflow_agency_stage_add />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/jobs/activity/:jobId"
            element={
              <ProtectedRoute>
                <Activity />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/workflow/levels"
            element={
              <AdminRoute>
                <Admin_jobs_workflowlevels />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/workflow-dev"
            element={
              <ProtectedRoute>
                <Agency_approval_workflow_dev />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/workflow/stage"
            element={
              <AdminRoute>
                <Admin_jobs_workflowstage />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/workflow/levels/add"
            element={
              <AdminRoute>
                <Workflow_level_add />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/workflowlevels/:levelId"
            element={
              <AdminRoute>
                <Workflow_level_add />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/workflow/stage/:stageId"
            element={
              <AdminRoute>
                <Workflow_stage_add />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/workflow/stage/add"
            element={
              <AdminRoute>
                <Workflow_stage_add />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/companies/list"
            element={
              <ProtectedRoute>
                <CompanyList />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/user-list"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/agency-list"
            element={
              <ProtectedRoute>
                <AgencyList />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/companies/:companyId"
            element={
              <ProtectedRoute>
                <Company_add_edit />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/companies/add"
            element={
              <ProtectedRoute>
                <Company_add_edit />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/jobs/list"
            element={
              <ProtectedRoute>
                <Job_list />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/jobs/list-dev"
            element={
              <ProtectedRoute>
                <Admin_jobs_list_dev />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/jobs/add"
            element={
              <ProtectedRoute>
                <Job_add_edit />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/jobs/add-dev"
            element={
              <ProtectedRoute>
                <Agency_jobs_add_edit />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/jobs/:jobId"
            element={
              <ProtectedRoute>
                <Job_add_edit />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/jobs/details/:jobId"
            element={
              <ProtectedRoute>
                <Job_details />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/jobs/details-dev/:jobId"
            element={
              <ProtectedRoute>
                <Job_details_dev />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/jobs/apply/:jobId"
            element={
              <ProtectedRoute>
                <Creator_Apply_Job />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/jobs/apply-dev/:jobId"
            element={
              <ProtectedRoute>
                <Creator_apply_job_dev />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/industries/list"
            element={
              <AdminRoute>
                <IndustryList />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/industries/add"
            element={
              <AdminRoute>
                <Industry_add_edit />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/industries/:industryId"
            element={
              <AdminRoute>
                <Industry_add_edit />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/levels/list"
            element={
              <AdminRoute>
                <LevelsList />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/levels/add"
            element={
              <AdminRoute>
                <Level_add_edit />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/levels/:levelId"
            element={
              <AdminRoute>
                <Level_add_edit />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/skills/list"
            element={
              <AdminRoute>
                <SkillsList />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/skills/add"
            element={
              <AdminRoute>
                <Skill_add_edit />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/skills/:skillId"
            element={
              <AdminRoute>
                <Skill_add_edit />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/categories/add/"
            element={
              <AdminRoute>
                <Category_add_edit />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/categories/list"
            element={
              <AdminRoute>
                <CategoryList />
              </AdminRoute>
            }
          ></Route>
          <Route
            // exact
            path="/categories/:categoryId"
            element={
              <AdminRoute>
                <Category_add_edit />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/company-projects"
            element={
              <ProtectedRoute>
                <Company_projects />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/company-projects/:communityId"
            element={
              <ProtectedRoute>
                <Agency_company_projects_details />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/company-project/tags"
            element={
              <ProtectedRoute>
                <Company_projects_tags />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/company-project/community-settings"
            element={
              <ProtectedRoute>
                <Community_settings />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/company-project/audiences"
            element={
              <ProtectedRoute>
                <Audiences />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/company-project/programs"
            element={
              <ProtectedRoute>
                <Programs />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/company-project/creative-code"
            element={
              <ProtectedRoute>
                <Creative_code />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/company-project/copy-code"
            element={
              <ProtectedRoute>
                <Copy_code />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/intake_forms"
            element={
              <ProtectedRoute>
                <IntakeForms />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/intake_forms/createform"
            element={
              <ProtectedRoute>
                <DynamicForm />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/intake_forms/responselist/:formID/:versionNum"
            element={
              <ProtectedRoute>
                <IntakeFormResponseList />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/earnings"
            element={
              <ProtectedRoute>
                <Earnings />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/Admin-help"
            element={
              <ProtectedRoute>
                <Admin_Help_Table />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/Admin-help-chat/:helpChatId"
            element={
              <ProtectedRoute>
                <Admin_Help_Chat />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/help"
            element={
              <ProtectedRoute>
                <Help_info_table />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/help/add"
            element={
              <ProtectedRoute>
                <Help_Common />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/help/view-message/:helpId"
            element={
              <ProtectedRoute>
                <Help_view_message />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/home"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/invite"
            element={
              <ProtectedRoute>
                <Main_Invite />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/member/invite"
            element={
              <ProtectedRoute>
                <Member_Admin_invite />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/profile-dev-1"
            element={
              <ProtectedRoute>
                <Profile_dev />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/Profile_design"
            element={
              <ProtectedRoute>
                <Profile_design />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/profile-dev"
            element={
              <ProtectedRoute>
                <Profile_new />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            exact
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <Profileedit />
              </ProtectedRoute>
            }
          ></Route>
          
        </Route>

        <Route
          exact
          path="/"
          element={
            // <PublicRoute>
            <Login />
            // </PublicRoute>
          }
        ></Route>
        <Route
          exact
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        ></Route>
        <Route
          exact
          path="/thank-you"
          element={
            <PublicRoute>
              <Thank_you />
            </PublicRoute>
          }
        ></Route>
        <Route
          exact
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        ></Route>
        <Route
          // exact
          path="*"
          element={<Error />}
        ></Route>
      </Routes>

      <ToastContainer />
    </>
  );
}
export default App;
