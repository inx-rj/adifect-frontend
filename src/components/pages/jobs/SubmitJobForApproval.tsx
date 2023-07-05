import {
  Close,
  CollectionsOutlined,
  Delete,
  DeleteOutline,
} from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import Title from "components/common/pageTitle/Title";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useUpdateEffect } from "react-haiku";
import { CREATOR_ACTIVITY_JOB_SUBMIT_ACTION } from "redux/actions/jobs/jobsActivity.actions";
import { APPROVAL_REJECTED_STATUS_LIST_DATA } from "redux/reducers/jobs/ApprovalRejectedStatus.slice";
import { COMPLETED_TASK_LIST_DATA } from "redux/reducers/jobs/completedTask.slice";
import { CREATOR_JOB_APPLIED_DATA } from "redux/reducers/jobs/jobsApplied.slice";
import { GET_JOBS_DETAILS } from "redux/reducers/jobs/jobsList.slice";
import { GET_JOBS_SUBMIT_STATUS_DETAILS } from "redux/reducers/jobs/jobsSubmitStatus.slice";
import { useAppDispatch, useAppSelector } from "redux/store";

const SubmitJobForApproval = (props) => {
  const dispatch = useAppDispatch();

  //creator Available Jobs
  const jobDetails = useAppSelector(GET_JOBS_DETAILS);
  const completedTaskList = useAppSelector(COMPLETED_TASK_LIST_DATA);
  const isApprovalRejectedData = useAppSelector(
    APPROVAL_REJECTED_STATUS_LIST_DATA
  );
  const jobSubmitStatus = useAppSelector(GET_JOBS_SUBMIT_STATUS_DETAILS);
  const creatorAppliedId = useAppSelector(CREATOR_JOB_APPLIED_DATA);

  const [itemData, setItemData] = useState([]);
  const [formUrls, setFormUrls] = useState<any>([]);
  const [selectData, setSelectData] = useState(null);
  const [jobTextData, setJobTextData] = useState("");
  const [filesDrop, setFilesDrop] = useState([]);
  //   const [appliedId, setAppliedId] = useState();
  const [renderPage, setRenderPage] = useState(false);

  const [errors, setErrors] = useState<any>({
    chatboxOrFile: null,
    description: null,
    jobTextData: null,
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFilesDrop([
        ...filesDrop,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            title: file.name,
          })
        ),
      ]);
      // setErrors({ ...errors, chatboxOrFile: null });
    },
    [filesDrop]
  );

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    minSize: 0,
    maxSize: 5242880,
    onDrop,
  });

  const removeFile = (file) => () => {
    const newFiles = [...filesDrop];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFilesDrop(newFiles);
  };

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    // <li className="mapDataDiv" key={file.path}>
    <li className="mapDataDiv">
      <ul className="mapDataDiv2">
        {errors.map((e) => (
          <li className="mapDataDiv3" key={e.code}>
            {e.message}
          </li>
        ))}
      </ul>
    </li>
  ));

  const thumbs = filesDrop.map((file) => (
    <div
      className="mb-2 rounded-sm mr-2 text-sm max-w-[400px] w-full"
      key={file.id}
    >
      <div className="min-w-0 overflow-hidden flex justify-between">
        <div className="flex gap-2">
          <CollectionsOutlined />
          {file.title}
        </div>
        <button onClick={removeFile(file)} className="remove_button_delet">
          {" "}
          <DeleteOutline />
        </button>
      </div>
    </div>
  ));

  const removeFormFieldsUrls = (i) => {
    let newFormValues = [...formUrls];
    newFormValues.splice(i, 1);
    setFormUrls(newFormValues);
  };

  const jobSumbmitData = () => {
    console.log("isApprovalRejectedData", isApprovalRejectedData);
    const isPrevtask = isApprovalRejectedData?.data?.data?.find(
      (item) => item.task_details.id === selectData
    );

    const formData = new FormData();
    if (formUrls) {
      setFormUrls(formUrls.filter((item) => item));
      formData.append("submit_job_url", formUrls);
    }
    if (filesDrop) {
      for (const key of Object.keys(filesDrop)) {
        formData.append("work_attachments", filesDrop[key]);
        formData.append("work_activity_attachments", filesDrop[key]);
      }
    }
    formData.append("job_applied", props.appliedId);
    formData.append("message", jobTextData);
    if (selectData) {
      formData.append("task", selectData);
    }
    formData.append("status", "0");

    if (
      isApprovalRejectedData?.data &&
      isApprovalRejectedData?.data?.length > 0 &&
      isPrevtask
    ) {
      formData.append("put", JSON.stringify(true));
      formData.append("putId", isApprovalRejectedData?.data[0].id);
    }

    dispatch(CREATOR_ACTIVITY_JOB_SUBMIT_ACTION(formData));
    setRenderPage(true);
    props.handleCloseSubmit();
    setJobTextData("");
    setFilesDrop([]);
    setFormUrls([]);
    setSelectData(null);
    // handleEmptyChat();
  };

  const handleJobSumbitData = (e) => {
    e.preventDefault();
    let isValidUrl: any = "";
    let newFormValues = formUrls;
    setFormUrls(newFormValues);
    if (formUrls) {
      if (formUrls != "") {
        isValidUrl =
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
      }
    }
    const tempErrors: any = {
      jobTextData: jobTextData.length < 1 && "Please enter this field",
      // filesDrop: filesDrop.length < 1 && "Please enter this field",
      selectData:
        itemData?.length > 0 && !selectData && "Please enter this field",
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    jobSumbmitData();
  };

  //   useEffect(() => {
  //     if (creatorAppliedId?.data) {
  //       setAppliedId(creatorAppliedId?.data?.id);
  //     }
  //   }, [creatorAppliedId?.success]);

  useUpdateEffect(() => {
    if (
      completedTaskList?.data?.length > 0 &&
      jobDetails?.details?.jobtasks_job?.length > 0
    ) {
      const compData = completedTaskList?.data?.slice()?.sort();
      const jobData = jobDetails?.details?.jobtasks_job?.slice()?.sort();

      const results = jobData.filter(
        (item1) => !compData.some((item2) => item1.id === item2.task)
      );

      setItemData(results);
    }
    if (
      jobDetails?.details?.jobtasks_job?.length > 0 &&
      completedTaskList?.data?.length < 1
    ) {
      setItemData(jobDetails?.details?.jobtasks_job);
    }
  }, [
    completedTaskList.success,
    // job_detail_success,
    jobSubmitStatus?.success,
  ]);
  return (
    <>
      <Dialog
        className="profileImgDialogagency"
        open={props.submitjobopen}
        onClose={props.handleCloseSubmit}
      >
        <DialogTitle className="profileImgHeadingAnew">
          <div className="Ajobshare flex justify-between">
            <Title title="Submit Job for Approval" />

            <span className="cursor-pointer" onClick={props.handleCloseSubmit}>
              <Close />
            </span>
          </div>
        </DialogTitle>
        <div className="dialogcontent_and_actions_new">
          <DialogContent className="ChangeEmailAContent">
            <div className="updateEmailBelowPop">
              <p>
                Once submitted, this job will move to the next stage of the
                approval workflow. Approvers will be able to approve your
                submission, or reject it and request modifications.
              </p>
            </div>

            {itemData?.length > 0 && (
              <div className="methodagencyProfilejob">
                <div
                  className={
                    errors.selectData
                      ? "askYourQuestionInput error"
                      : "askYourQuestionInput  "
                  }
                >
                  <p>Task</p>
                  <Select
                    className={
                      selectData === null
                        ? "job-submit-task selectinputcolor"
                        : "job-submit-task menuiteminputcolor"
                    }
                    // MenuProps={menuProps}
                    value={selectData}
                    onChange={(e) => {
                      setSelectData(e.target.value);
                      setErrors({ ...errors, selectData: null });
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={null}>Select Task</MenuItem>
                    {itemData?.map((item) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.title}
                      </MenuItem>
                    ))}
                  </Select>
                  <span
                    style={{
                      color: "#D14F4F",
                      opacity: errors.selectData ? 1 : 0,
                    }}
                  >
                    {errors.selectData ?? "valid"}
                  </span>
                </div>
              </div>
            )}

            <div className="NewMailNameAndInput mt-4 ">
              <div
                className={
                  errors.jobTextData
                    ? "askYourQuestionInput error"
                    : "askYourQuestionInput  "
                }
              >
                <textarea
                  className="NameorEmailNewPop_textData input-style h-full custom-scrollbar p-4"
                  // type="text"
                  placeholder="Enter text here"
                  value={jobTextData}
                  maxLength={4000}
                  onChange={(e) => {
                    setJobTextData(e.target.value);
                    setErrors({ ...errors, jobTextData: null });
                  }}
                  rows={5}
                  cols={33}
                  required
                ></textarea>
                <span
                  style={{
                    color: jobTextData.length >= 4000 && "#D14F4F",
                  }}
                  className="limitWordsNew flex justify-end"
                >
                  {jobTextData.length}/4000
                </span>
                <span
                  className="CoverCreator34 flex justify-end text-sm"
                  style={{
                    color: "#D14F4F",
                    opacity: errors.jobTextData ? 1 : 0,
                  }}
                >
                  {errors.jobTextData ?? "valid"}
                </span>
              </div>
            </div>
            <div className="attachAssertspopDiv">
              <h3 className="attachAssertsHeading text-base font-semibold text-[#000]">
                Attached Assets
              </h3>
              <div className="attachAssertspopDivfirst">
                <aside className="flex flex-row flex-wrap mt-4">{thumbs}</aside>
                {fileRejectionItems?.length > 0 && (
                  <>
                    <ul className="errorData_drop_zone">
                      {fileRejectionItems}
                    </ul>
                  </>
                )}
                <div className="drop_maindiv" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <button className="submitJobButtonOne1 btn btn-outline">
                    Attach file
                  </button>
                </div>
                {formUrls?.map((element, index) => (
                  <div className="form-inline" key={index}>
                    {element && (
                      <div className="assertDustbinLink1">
                        <img className="linkicon" src="/img/asserLink.png" />
                        <a className="adifecttesturl">{element}</a>
                        <img
                          className="assertbinLogo2"
                          src="/img/assertbin.png"
                          onClick={() => removeFormFieldsUrls(index)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <div className="cancelButtonnewWithSave flex gap-2">
              <button
                className="canceButtonnewPop btn btn-outline"
                onClick={props.handleCloseSubmit}
              >
                Cancel
              </button>
              <button
                className="shareNewPopPublic btn btn-primary"
                onClick={handleJobSumbitData}
              >
                Submit
              </button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default SubmitJobForApproval;
