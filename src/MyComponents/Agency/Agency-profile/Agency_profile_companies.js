import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCompany,
  listAllCompanies,
} from "../../../redux/actions/Workflow-company-action";
import { Link } from "react-router-dom";

const Agency_profile_companies = () => {
  const dispatch = useDispatch();

  const { companyData, loading: stagesLoading } = useSelector(
    (state) => state.agencyCompanyReducer
  );

  useEffect(() => {
    dispatch(listAllCompanies());
  }, []);

  return (
    <>
      <div className="agnecyProfileComapniesAllContent">
        <div className="agnecyProfileComapniesHead">
          <h3>Companies</h3>
          <p>These are all the companies you’re a member of.</p>
        </div>
        <div className="companyRoleProfileHead">
          <div className="comapnyheadingOfprofile">
            <h3>Company</h3>
          </div>
          <div className="RoleheadingOfprofile">
            <h3>Role</h3>
          </div>
        </div>

        {companyData?.map((item) => {
          return (
            <>
              <div className="adifectAdminViewmain">
                <div className="adifectAdminfirst">
                  <h3>{item?.name}</h3>
                </div>
                <div className="adifectAdminSecond">
                  <p>Admin</p>
                </div>
                <div className="buttonDivProfileLine">
                  <Link to={`/companydata/${item.id}`}>
                    <button className="buttonDivProfileLineBtn"> View</button>
                  </Link>
                </div>
              </div>
            </>
          );
        })}

        {/* <div className="adifectAdminViewmain">
          <div className="adifectAdminfirst">
            <h3>Company name 2</h3>
          </div>
          <div className="adifectAdminSecond">
            <p>Admin</p>
          </div>
          <div className="buttonDivProfileLine">
            <button className="buttonDivProfileLineBtn">View</button>
          </div>
        </div>

        <div className="adifectAdminViewmain">
          <div className="adifectAdminfirst">
            <h3>Company name 3</h3>
          </div>
          <div className="adifectAdminSecond">
            <p>Admin</p>
          </div>
          <div className="buttonDivProfileLine">
            <button className="buttonDivProfileLineBtn">View</button>
          </div>
        </div>

        <div className="adifectAdminViewmain">
          <div className="adifectAdminfirst">
            <h3>Company name 4</h3>
          </div>
          <div className="adifectAdminSecond">
            <p>Marketer</p>
          </div>
          <div className="buttonDivProfileLine">
            <button className="buttonDivProfileLineBtn">View</button>
          </div>
        </div>

        <div className="adifectAdminViewmain">
          <div className="adifectAdminfirst">
            <h3>Company name 3</h3>
          </div>
          <div className="adifectAdminSecond">
            <p>Marketer</p>
          </div>
          <div className="buttonDivProfileLine">
            <button className="buttonDivProfileLineBtn">View</button>
          </div>
        </div>

        <div className="adifectAdminViewmain">
          <div className="adifectAdminfirst">
            <h3>Company name 6</h3>
          </div>
          <div className="adifectAdminSecond">
            <p>marketer</p>
          </div>
          <div className="buttonDivProfileLine">
            <button className="buttonDivProfileLineBtn">View</button>
          </div>
        </div>

        <div className="adifectAdminViewmain">
          <div className="adifectAdminfirst">
            <h3>Company name 7</h3>
          </div>
          <div className="adifectAdminSecond">
            <p>Approver</p>
          </div>
          <div className="buttonDivProfileLine">
            <button className="buttonDivProfileLineBtn">View</button>
          </div>
        </div> */}

        <div className="createCompanyButtonProfileDiv">
          <Link to={`/agency/company/add`}>
            <button className="createCompanyButtonProfile">
              <img src="/img/plusIconconnect.png" alt="" />
              Create Company
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Agency_profile_companies;
