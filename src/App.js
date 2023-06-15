import "./App.css";
import "./Responsive.css";
import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

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
import Profileedit from "./MyComponents/Authentication/Profile-edit";
import Profile_dev from "./MyComponents/Authentication/Profile_dev";
import Profile_design from "./MyComponents/Authentication/Profile_design";
import Profile_new from "./MyComponents/Authentication/Profile_new";
import ResetPassword from "./MyComponents/Authentication/Reset-password";
import ForgotPassword from "./MyComponents/Authentication/Forgot-password";
import VerifyEmail from "./MyComponents/Authentication/Verify-email";
import Thank_you from "./MyComponents/Authentication/Thank-you";
import Signup_invite from "./MyComponents/Authentication/Signup-invite";
import Invite_accept_reject from "./MyComponents/Authentication/Invite-accept-reject";

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
import Admin_Media from "./MyComponents/Admin/Admin-Media";
import Admin_Media_datatable from "./MyComponents/Admin/Admin-Tableview";
import Admin_collectionData from "./MyComponents/Admin/Amin-Collectiondata";
import TableViewAdmin_collectionData from "./MyComponents/Admin/Admin-Collectiondata-table.js";
import Admin_Movemedia from "./MyComponents/Admin/Admin-movefolderdam";
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
import DAMLayout from "./containers/Layout/DAMLayout";

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
import Media from "./MyComponents/Frontend/Media";
import Media_datatable from "./MyComponents/Frontend/Media-datatable";
import PopupMedia from "./MyComponents/Frontend/media-popup";
import JobPublicview from "./MyComponents/Frontend/Job_public_view";
import Movemedia from "./MyComponents/Frontend/MovefolderDam.js";
import Allcollection from "./MyComponents/Frontend/Collectiondata.js";
import TableViewAllcollection from "./MyComponents/Frontend/Media-tableview-collectiondata.js";

// Email Template
import EmailTemplates from "./containers/EmailTemplates";

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
import Member_Media from "./MyComponents/Member/Member-Media";
import Member_MovefolderDam from "./MyComponents/Member/Member-MovefolderDam";
import Member_media_dataTable from "./MyComponents/Member/Member-media-dataTable";
import Member_All_Collection from "./MyComponents/Member/Member-All-Collection";
import TableViewMember_All_Collection from "./MyComponents/Member/Member-Tableview-Collectiondata";
// import Member_Company_list from "./MyComponents/Member/Member-Company-list";
// import AdminMember_Company_add from "./MyComponents/Member/AdminMember-Company-add";
import Member_Admin_Company_Add_Edit from "./MyComponents/Member/Member-Admin-Company-Add-Edit";
import Member_Company_Datalist from "./MyComponents/Member/Member-Company-Datalist";
import Company_projects_tags from "./MyComponents/Common/Company-projects-tags";

// invite
import Main_Invite from "./MyComponents/Common/Main-Invite";

// import Community_settings from "./MyComponents/Common/Community-settings";
// import Audiences from "./MyComponents/Common/Audiences";
import Programs from "./MyComponents/Common/Programs";
import Creative_code from "./MyComponents/Common/Creative-code";
import Copy_code from "./MyComponents/Common/Copy-code";
// import IntakeForms from "./MyComponents/Common/IntakeForms";
// // import AddIntakeForms from "./MyComponents/Agency/Intake-Forms/AddIntakeForms";
// import ShareFormWrapper from "./MyComponents/Agency/Intake-Forms/ShareFormWrapper";
// import IntakeFormResponseList from "./MyComponents/Agency/Intake-Forms/IntakeFormResponseList";
// import DynamicForm from "./MyComponents/Agency/Intake-Forms/DynamicForm";

const App = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [headerCompany, setHeaderCompany] = useState(null);

  // debugger;

  useEffect(() => {
    console.log({ headerCompany }, 'headerCompany');
  }, [headerCompany])

  return (
    <Routes>
      <Route
        exact
        path="/guest-job/:jobId"
        element={
          // <PublicRoute>
          <JobPublicview />
          // </PublicRoute>
        }
      ></Route>
      <Route
        exact
        path="/guest-job/:jobId/:linkCopy"
        element={
          // <PublicRoute>
          <JobPublicview />
          // </PublicRoute>
        }
      ></Route>
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
        path="/verify-email/:token/:uid"
        element={
          <PublicRoute>
            <VerifyEmail />
          </PublicRoute>
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
        path="/invite-accept/:decodeId/:accept_invite_encode/:exclusive_decode"
        element={
          <PublicRoute>
            <Invite_accept_reject />
          </PublicRoute>
        }
      ></Route>
      <Route
        path="/invite-reject/:decodeId/:accept_invite_encode/:exclusive_decode"
        element={
          <PublicRoute>
            <Invite_accept_reject />
          </PublicRoute>
        }
      ></Route>
      <Route
        exact
        path="/signup-invite/:inviteId/:exclusive/:encodedEmail"
        element={
          <PublicRoute>
            <Signup_invite />
          </PublicRoute>
        }
      ></Route>
      <Route
        exact
        path="/thank-you/:successPage"
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
        exact
        path="/reset-password/:ResetpasswordId/:userId/"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      ></Route>

      {/* DAM Layout Routes */}
      <Route
        element={
          <DAMLayout isToggle={isToggle} setIsToggle={setIsToggle} />
        }
      >
        <Route
          exact
          path="/Media"
          element={
            <ProtectedRoute>
              <Media />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/admin-media"
          element={
            <AdminRoute>
              <Admin_Media />
            </AdminRoute>
          }
        ></Route>
        <Route
          exact
          path="/admin-media/:parentid"
          element={
            <ProtectedRoute>
              <Admin_Media />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/admin-media-datatable"
          element={
            <ProtectedRoute>
              <Admin_Media_datatable />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/admin-media-collectionData"
          element={
            <ProtectedRoute>
              <Admin_collectionData />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/adminmedia-tableview/collectionData"
          element={
            <ProtectedRoute>
              <TableViewAdmin_collectionData />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/member-media/:parentid/tablecollection"
          element={
            <ProtectedRoute>
              <TableViewMember_All_Collection />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/member-media/:parentid/collection"
          element={
            <ProtectedRoute>
              <Member_All_Collection />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/admin-media/copy"
          element={
            <ProtectedRoute>
              <Admin_Movemedia />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/admin-media/:parentid/copy"
          element={
            <ProtectedRoute>
              <Admin_Movemedia />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/admin-media/:parentid/collection"
          element={
            <ProtectedRoute>
              <Admin_collectionData />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/admin-media/:parentid/table-view-collection"
          element={
            <ProtectedRoute>
              <TableViewAdmin_collectionData />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/admin-media-datatable/:parentid"
          element={
            <ProtectedRoute>
              <Admin_Media_datatable />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/Media/:parentid"
          element={
            <ProtectedRoute>
              <Media />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/Media-table"
          element={
            <ProtectedRoute>
              <Media_datatable />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/Media-table/:parentid"
          element={
            <ProtectedRoute>
              <Media_datatable />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/Media/copy"
          element={
            <ProtectedRoute>
              <Movemedia />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/Media/:parentid/copy"
          element={
            <ProtectedRoute>
              <Movemedia />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/Media/collection"
          element={
            <ProtectedRoute>
              <Allcollection />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/Media-tableview/collection"
          element={
            <ProtectedRoute>
              <TableViewAllcollection />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/Media-tableview/:parentid/collection"
          element={
            <ProtectedRoute>
              <TableViewAllcollection />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/member-media/collection"
          element={
            <ProtectedRoute>
              <Member_All_Collection />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/member-media/tablecollection"
          element={
            <ProtectedRoute>
              <TableViewMember_All_Collection />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/Media/:parentid/collection"
          element={
            <ProtectedRoute>
              <Allcollection />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/member-media-table"
          element={
            <ProtectedRoute>
              <Member_media_dataTable />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/Media-table/:parentid"
          element={
            <ProtectedRoute>
              <Media_datatable />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/member-media-table/:parentid"
          element={
            <ProtectedRoute>
              <Member_media_dataTable />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/member-media/:parentid"
          element={
            <ProtectedRoute>
              <Member_Media />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/member-media"
          element={
            <ProtectedRoute>
              <Member_Media />
            </ProtectedRoute>
          }
        ></Route>
      </Route>

      {/* APP Layout Routes */}
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
          path="/home"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
      </Route>

      {/* Error Route */}
      <Route
        // exact
        path="*"
        element={<Error />}
      ></Route>
    </Routes>
  );
}

export default App;