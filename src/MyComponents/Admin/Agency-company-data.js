import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { MDBDataTable } from "mdbreact";
import { listAllCompanies } from "../../redux/actions/Agency-data-actions";

function Agency_company_data() {
  //  company ***************
  const { agencyid } = useParams();
  const dispatch = useDispatch();

  const [usersForRender, setUsersForRender] = useState([]);

  const { companyuser, loading: loadingCompany } = useSelector(
    (state) => state.allcompanyReducer
  );
  useEffect(() => {
    dispatch(listAllCompanies(agencyid));
  }, []);
  useEffect(() => {
    let userData = [];
    if (companyuser) {
      companyuser?.map((item, index) => {
        item.name2 = item.name;
        item.is_active = (
          <div style={{ display: "flex" }}>
            {item.is_active ? (
              <div className="active_status">
                <i className="fa fa-check" aria-hidden="true"></i>{" "}
              </div>
            ) : (
              <div className="inactive_status">
                <i className="fa fa-times" aria-hidden="true"></i>
              </div>
            )}
          </div>
        );
        userData.push(item);
      });

      setUsersForRender(userData);
    }
  }, [companyuser, dispatch]);

  const data = {
    columns: [
      {
        label: "Title",
        field: "name2",
        sort: "asc",
        width: 500,
      },

      {
        label: "Status",
        field: "is_active",
        sort: "asc",
        width: 500,
      },
      // {
      //   label: "Action",
      //   field: "action",
      //   sort: "asc",
      //   width: 100,
      // },
    ],
    rows: usersForRender,
  };

  //  company ***************
  return (
    <>
      <div className="feedbackAboutAreaMainD">
        <MDBDataTable
          style={{}}
          responsive
          striped
          bordered
          small
          data={data}
        />
      </div>
    </>
  );
}

export default Agency_company_data;
