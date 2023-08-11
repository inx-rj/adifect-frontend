import React, { useCallback, useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  HelpCommonPostAction,
  GetDetailsHelpCommonAction,
} from "../../redux/actions/Help-common-action";
import { useDropzone } from "react-dropzone";
import swal from "sweetalert";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";

const baseStyle = {
  // flex: 1,
  // display: "flex",
  // flexDirection: "column",
  // alignItems: "center",
  // padding: "20px",
  // borderWidth: 2,
  // borderRadius: 2,
  // borderColor: "#eeeeee",
  // borderStyle: "dashed",
  // backgroundColor: "#fafafa",
  // color: "#bdbdbd",
  // outline: "none",
  // transition: "border .24s ease-in-out",
};

const disabelbaseStyle = {
  pointerEvents: "none",
  opacity: 0.4,
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  // display: "inline-flex",
  // borderRadius: 2,
  // border: "1px solid #eaeaea",
  // marginBottom: 8,
  // marginRight: 8,
  // width: 100,
  // height: 100,
  // padding: 4,
  // boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const Help_Common = () => {
  const [subject, setSubject] = useState("");
  const [rerender, setRerender] = useState(false);
  const [filesDrop, setFilesDrop] = useState([]);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({
    subject: null,
    description: null,
  });
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { helpId } = useParams();

  const { userData } = useSelector((state) => state.authReducer);

  const {
    helpPost,
    error: errorhelpPost,
    success: successhelpPost,
    loading: loadinghelpPost,
  } = useSelector((state) => state.HelpCommonPostReducer);

  const {
    GetDetailsHelpCommon,
    success: GetDetailsHelpCommonSuccess,
    error: GetDetailsHelpCommonError,
  } = useSelector((state) => state.GetDetailsHelpCommonReducer);


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

  const acceptedFileItems = acceptedFiles.map((file) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li className="mapDataDiv" key={file.path}>
      <ul className="mapDataDiv2">
        {errors.map((e) => (
          <li className="mapDataDiv3" key={e.code}>
            {e.message}
          </li>
        ))}
      </ul>
    </li>
  ));

  const style = useMemo(
    () => ({
      ...(helpId ? disabelbaseStyle : baseStyle),
      ...(isFocused ? focusedStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const removeFile = (file) => () => {
    const newFiles = [...filesDrop];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFilesDrop(newFiles);
  };

  // const thumbs = filesDrop.map((file) => (
  //   <div style={thumb} key={file.name}>
  //     <div style={thumbInner}>
  //       {file.title}
  //       {file.title.substr(file.title.lastIndexOf(".") + 1)}
  //       <button onClick={removeFile(file)}>X</button>
  //     </div>
  //   </div>
  // ));

  const thumbs = filesDrop.map((file) => (
    <div className="hdefjkw" style={thumb} key={file.id}>
      <div style={thumbInner}>
        <img
          className="attachAssertspopImage attachdiv"
          src="/img/assertgallery.png"
        />
        {file.title}
        <button onClick={removeFile(file)} className="remove_button_delet">
          {" "}
          <img className="attachAssertspopDeleteI1" src="/img/deleterc.png" />
        </button>
      </div>
    </div>
  ));
  //--------------------------------------------------------------------------------

  useEffect(() => {
    if (helpId) {
      dispatch(GetDetailsHelpCommonAction(helpId));
    }
  }, []);

  useEffect(() => {
    if (GetDetailsHelpCommon && helpId) {
      setSubject(GetDetailsHelpCommon?.subject);
      setDescription(GetDetailsHelpCommon?.message);
    }
  }, [GetDetailsHelpCommonSuccess]);

  useEffect(() => {
    if (successhelpPost && rerender) {
      swal({
        title: "Successfully Complete",
        text: "Form Submitted Successfully",
        className: "successAlert-login",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 3000,
      });
      setRerender(false);
      navigate("/help");
      setSubject("");
      setDescription("");
      setErrors({ description: null });
      setFilesDrop([]);
    }
    if (errorhelpPost && rerender) {
      swal({
        title: "",
        text: errorhelpPost,
        className: "errorAlert-login",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 3000,
      });
      setRerender(false);
    }
  }, [dispatch, successhelpPost, errorhelpPost]);

  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      subject: !subject && "This field is required",
      description: !description && "This field is required",
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      // console.log(
      //   "..values",
      //   Object.values(tempErrors).filter((value) => value)
      // );
      return;
    }
    submitHandler();
  };
  const submitHandler = () => {
    const formData = new FormData();
    formData.append("user", userData?.user?.user_id);
    formData.append("subject", subject);
    formData.append("message", description);
    if (filesDrop && filesDrop.length > 0) {
      for (const key of Object.keys(filesDrop)) {
        formData.append("help_new_attachments", filesDrop[key]);
      }
    }
    dispatch(HelpCommonPostAction(formData));
    setRerender(true);
    setErrors({ description: null });
  };
  return (
    <>
      {loadinghelpPost ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="Category_p">
            <div className="CategorylistName">
              <h1>Adifect Help Page</h1>
            </div>
            <div className="savebtnnew Categorybtn Workflowbtn1 helpAdmin">
                <Link
                  className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                  to={`/help`}
                >
                  Back
                </Link>
              </div>
          </div>
          <div className="Topallpage AllPageHight">
            <div className="ContentDivTop Categorypage">
              <div className="addpage Industrypage">
                <form onSubmit={validateSubmit} id="websiteUserRegisterForm">
                  <div
                    className={
                      errors.subject
                        ? "InCntnr error sameDesign"
                        : "InCntnr sameDesign"
                    }
                  >
                    <h5 className="form-label mt-2" for="Username">
                      Subject:
                    </h5>
                    <input
                      disabled={helpId}
                      autocomplete="off"
                      className="input-box validateInput w-100 h-47 border-radius border-1 pl-2"
                      type="text"
                      value={subject}
                      onChange={(e) => {
                        setErrors({ ...errors, subject: null });
                        setSubject(e.target.value);
                      }}
                      name="f_Username"
                      id="Username"
                    />

                    <span
                      style={{
                        color: "#D14F4F",
                        opacity: errors.subject ? 1 : 0,
                      }}
                    >
                      {errors.subject ?? "valid"}
                    </span>
                  </div>

                  <div
                    className={
                      errors.description
                        ? "text-content addjobtopdiv  error Describe_4"
                        : "text-content addjobtopdiv  Describe_4"
                    }
                  >
                    <h5 className="form-label mt-2" for="Username">
                      Message:
                    </h5>
                    <textarea
                      disabled={helpId}
                      className="w-551 border-1 border-radius helptextarea Textbox-textarea bkC2"
                      placeholder=""
                      maxLength={2000}
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        setErrors({ ...errors, description: null });
                      }}
                    />
                    <p className="deslimtsec_4">
                      <span
                        style={{
                          color: description?.length === 2000 && "#D14F4F",
                        }}
                      >
                        {description?.length ?? 0}
                        /2000
                      </span>
                    </p>

                    <span
                      className="Ag_E"
                      style={{
                        color: "#D14F4F",
                        opacity: errors.description ? 1 : 0,
                      }}
                    >
                      {errors.description ?? "valid"}
                    </span>
                  </div>
                  {!helpId && (
                    <>
                      <div className="helppage">
                        <div className="helpbtnattact addhelpbtn" {...getRootProps({ style })}>
                          <input {...getInputProps()} />
                          <p>Attach file</p>
                        </div>
                        <aside style={thumbsContainer}>{thumbs}</aside>
                        {fileRejectionItems.length > 0 && (
                          <>
                            <ul className="errorData">{fileRejectionItems}</ul>
                          </>
                        )}
                      </div>
                    </>
                  )}
                  <div className="attachmentsdivForMoreImages">
                    {helpId &&
                      GetDetailsHelpCommon?.help_attachments?.map((item) => (
                        <div className="attachmentsDivforImages" key={item?.id}>
                          <ul>
                            <li>
                              {" "}
                              <img
                                className="attachAssertspopImage attachdiv"
                                src="/img/assertgallery.png"
                              />
                              <a
                                href={item.help_new_attachments}
                                target="_blank"
                              >
                                {item.image_name}
                              </a>
                            </li>
                          </ul>
                        </div>
                      ))}
                  </div>

                  {/* ------------------------------------------------------------------------------------------ */}
                  {!helpId && (
                    <div className="buttonNotShwoInCenter">
                      <input
                        className="btn-primary border-radius w-335 h-47 registerWebsiteUserBtn mt-4"
                        type="submit"
                        value="Submit"
                      />
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Help_Common;
