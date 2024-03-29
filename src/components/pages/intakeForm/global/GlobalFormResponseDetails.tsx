import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { env } from "helper/env";
import axiosPrivate from "api/axios";
import CreateTask from "../tasks/Create/CreateTask";
import { initialGenericFormFields } from "../../../../helper/constants/intakeForm/IntakeFormConstant";
import GenericForm from "./GlobalForm";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import { useSingleEffect } from "react-haiku";
import { LabelValueOptionType } from "helper/types/common/commonType";

const GlobalFormResponseDetails = () => {
  const { formName } = useParams();
  const [genericForm, setGenericForm] = useState(initialGenericFormFields);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<LabelValueOptionType>({ label: "", value: "" });

  //create Task Details
  const [taskDetails, setTaskDetails] = useState<any>({
    name: "",
    description: "",
    assign_to: "",
  });
  const navigate = useNavigate();
  // Get data from server
  const fetchResponseData = async () => {
    setLoading(true);
    await axiosPrivate
      .get(`${env.API_URL}intake-forms/submit/${formName}/`)
      .then((res) => {
        setResponse(res?.data?.data);
        setGenericForm(res?.data?.data?.submission_data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetch data when component mounts
  useSingleEffect(() => {
    fetchResponseData().then((r) => r);
  });

  useEffect(() => {
    if (selectedOption) {
      setTaskDetails({ ...taskDetails, assign_to: selectedOption.value });
    }
  }, [selectedOption]);

  if (loading) {
    return <LoadingSpinner />;
  }

  //handleTask Details input
  const handleInputChange = (e) => {
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
  };

  const handleAssignToChange = (event: React.SyntheticEvent, value: LabelValueOptionType | LabelValueOptionType[]) => {
    event.preventDefault();

    console.log("Value", value)
    setSelectedOption({label: value?.["label"], value: value?.["value"]})
  }

  const handleAddTask = () => {
    const finalData = {
      ...taskDetails,
      assign_to: [selectedOption.value],
      form_submission: formName,
    };

    axiosPrivate
      .post(`intake-forms/form-task/`, finalData)
      .then((res) =>
        swal({
          title: "",
          text: res.data.message,
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: { visible: false },
          timer: 2000,
        }).then(() => {
          setAddTaskModal(false);
        })
      )
      .catch((err) => {
        swal({
          title: "",
          text: err.message,
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: { visible: false },
          timer: 4000,
        }).then(() => {
          setAddTaskModal(false);
        });
      })
      .finally(() => {
        setTaskDetails({ name: "", description: "", assign_to: "" });
        setSelectedOption({label: "", value: ""});
      });
  };

  // Render component
  return (
    <>
      <div className="p-[20px]">
        <div className="p-[20px] page-card new-card min-h-[calc(100vh-85px)]">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="mb-0">{response?.form} Form Details</h3>
              <span className="text-xs">
                {response?.submitter_name && (
                  <span>
                    Submitted by: <b>{response?.submitter_name}</b> on{" "}
                  </span>
                )}
                {moment(response?.created).format("DD-MMM-YYYY, hh:mm A")}
              </span>
            </div>
            <div className="flex gap-2">
              {/* {response?.max_version ? ( */}
              <Button
                variant="contained"
                onClick={() => setAddTaskModal(true)}
                className="flex items-center gap-2"
                size="large"
              >
                <AddIcon fontSize="small" />
                <span> Create Task</span>
              </Button>
              {/* ) : null} */}
              <Button
                variant="outlined"
                onClick={() => navigate(-1)}
                size="large"
              >
                Go Back
              </Button>
            </div>
          </div>
          <div className="pt-3">

          <GenericForm
            genericForm={genericForm}
            setGenericForm={setGenericForm}
            previewMode
            />
            </div>
        </div>
      </div>
      <Dialog
        open={addTaskModal}
        className="w-full"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle className="pb-3 border-b !px-10">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">
              <span>Create Task - {response?.form}</span>
            </div>
            <div onClick={() => setAddTaskModal(false)}>
              <CloseIcon />
            </div>
          </div>
        </DialogTitle>
        <DialogContent className="!py-6 !px-10">
          <CreateTask
            taskDetails={taskDetails}
            handleInputChange={handleInputChange}
            selectedOption={selectedOption}
            setSelectedOption={handleAssignToChange}
          />
        </DialogContent>
        <DialogActions className="mb-3">
          <div className="flex justify-center items-center gap-2 pb-2 w-full">
            <Button
              variant="contained"
              size="large"
              onClick={() => handleAddTask()}
              disabled={
                !taskDetails.name ||
                !taskDetails.description ||
                !taskDetails.assign_to
              }
            >
              Create Task
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => setAddTaskModal(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default GlobalFormResponseDetails;
