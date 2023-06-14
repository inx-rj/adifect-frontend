import { Link, useParams } from "react-router-dom";
import { VisibilityOutlined } from "@mui/icons-material";
import Custom_MUI_Table from "../Company-projects/Custom-MUI-Table";
import { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import AddIntakeForms from "./AddIntakeForms";
import api from "../../../utils/api";
import { BACKEND_API_URL } from "../../../environment";
import { useEffect } from "react";
import LoadingSpinner from "../../../containers/LoadingSpinner";
import GenericForm from "./GenericForm";
import { validations } from "../../../utils";

const IntakeFormResponseList = () => {
  const { formID, versionNum } = useParams();
  const [activeTab, setActiveTab] = useState("forms");
  const [intakeFormLoader, setIntakeFormLoader] = useState(true);
  const [paginationData, setPaginationData] = useState({
    page: 1,
    rowsPerPage: 10,
  }); // pagination params state

  const [formResponse, setFormResponse] = useState();
  const [formField, setFormField] = useState();

  useEffect(() => {
    if (activeTab === "responses") {
      api
        .get(
          `${BACKEND_API_URL}intake-forms/responses/${formID}/${versionNum}/`
        )
        .then((res) => {
          console.log("Form Response", res?.data?.data);

          setFormResponse(res?.data?.data?.results || res?.data?.data);
          setIntakeFormLoader(false);
        })
        .catch((err) => {
          // console.log(err, "Channel Error");
        });
    } else {
      api
        .get(`${BACKEND_API_URL}intake-forms/fields/${formID}/${versionNum}/`)
        .then((res) => {
          console.log("Form Field", res?.data?.data);
          setFormField(res?.data?.data);
          setIntakeFormLoader(false);
        })
        .catch((err) => {
          // console.log(err, "Channel Error");
        });
    }
  }, [formID, activeTab]);

  // Table Row-Columns data
  const intakeFormTableColumn = [
    {
      id: 1,
      label: (
        <label className="flex items-center">
          User Name
          <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
        </label>
      ),
      field: "submitted_by_user",
      sort: "asc",
      width: 300,
    },
    {
      id: 2,
      label: (
        <label className="flex items-center">
          Submission Date
          <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
        </label>
      ),
      field: "created",
      sort: "asc",
      width: 200,
    },
    {
      id: 3,
      label: (
        <label className="flex items-center">
          Submission Time
          <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
        </label>
      ),
      field: "created",
      sort: "asc",
      width: 100,
    },
    {
      id: 4,
      label: "Action",
      field: "action",
      sort: "asc",
      width: 100,
    },
  ];
  const tabelRowColData = {
    columns: intakeFormTableColumn,
    rows:
      formResponse?.length > 0
        ? formResponse?.map((item, index) => {
            return {
              submitted_by_user: (
                <Link to={`/intake_forms/userResponse/${item?.id}/`}>
                  {item?.submitted_by_user ?? ""}
                </Link>
              ),
              submissiondate: validations.formateISODateToLocaleString(
                item?.created ?? ""
              ),
              submissiontime: validations.formateISODateToLocaleString(
                item?.created ?? ""
              ),

              action: (
                <Link to={`/intake_forms/userResponse/${item?.id}/`}>
                  <VisibilityOutlined />
                </Link>
              ),
            };
          })
        : [],
  };

  //   Handle Events
  const triggerTabChange = (event, newValue) => {
    console.log("newValue", newValue);
    setActiveTab(newValue);
  };

  return (
    <div className="page-container p-[20px]">
      <h4 className="page-title text-[26px] capitalize">
        {/* {formName?.replace(/-/g, " ") ?? ""} */}
      </h4>
      <div className="page-card new-card p-0">
        <Tabs
          value={activeTab}
          onChange={triggerTabChange}
          className="mb-[20px]"
        >
          <Tab label="Forms" value="forms" />
          <Tab label="Responses" value="responses" />
        </Tabs>
        <div className="min-h-[500px]">
          {activeTab === "forms" && (
            <div className="px-[20px] pb-[20px] min-h-[450px]">
              {intakeFormLoader && <LoadingSpinner />}
              {/* <AddIntakeForms /> */}
              <div className="max-w-[530px] wi-full">
                <GenericForm genericForm={formField} previewMode />
              </div>
            </div>
          )}
          {activeTab === "responses" && (
            <Custom_MUI_Table
              loader={intakeFormLoader}
              data={tabelRowColData}
              allData={formResponse || []}
              paginationData={paginationData}
              setPaginationData={setPaginationData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default IntakeFormResponseList;
