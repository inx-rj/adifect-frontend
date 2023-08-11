import React, { useCallback, useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  HelpCommonPostAction,
  GetDetailsHelpCommonAction,
  HelpMessageSendAction,
  AgencyHelpMessageSendAction,
  AgencyHelpMessageReceiveAction,
} from "../../redux/actions/Help-common-action";
import { useDropzone } from "react-dropzone";
import swal from "sweetalert";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import moment from "moment";

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
  // display: "flex",
  // flexDirection: "row",
  // flexWrap: "wrap",
  // marginTop: 16,
  margin: "20px 0",
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

const Help_view_message = () => {
  // const [subject, setSubject] = useState("");
  const [rerender, setRerender] = useState(false);
  const [filesDrop, setFilesDrop] = useState([]);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({
    // subject: null,
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
    agencyMessagePost,
    error: erroragencyMessagePost,
    success: successagencyMessagePost,
  } = useSelector((state) => state.AgencyHelpMessageSendReducer);

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
      ...baseStyle,
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

  // useEffect(() => {
  //   if (successhelpPost && rerender) {
  //     swal({
  //       title: "Successfully Complete",
  //       text: "Form Submitted Successfully",
  //       className: "successAlert-login",
  //       icon: "/img/logonew.svg",
  //       buttons: false,
  //       timer: 3000,
  //     });
  //     setRerender(false);
  //     navigate("/help");
  //     setSubject("");
  //     setDescription("");
  //     setErrors({ description: null });
  //     setFilesDrop([]);
  //   }
  //   if (errorhelpPost && rerender) {
  //     swal({
  //       title: "",
  //       text: errorhelpPost,
  //       className: "errorAlert-login",
  //       icon: "/img/logonew-red.svg",
  //       buttons: false,
  //       timer: 3000,
  //     });
  //     setRerender(false);
  //   }
  // }, [dispatch, successhelpPost, errorhelpPost]);

  useEffect(() => {
    dispatch(GetDetailsHelpCommonAction(helpId));
  }, [successagencyMessagePost]);

  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
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
    formData.append("help", helpId);
    formData.append("sender", userData?.user?.user_id);
    formData.append("chat", description);
    if (filesDrop && filesDrop.length > 0) {
      for (const key of Object.keys(filesDrop)) {
        formData.append("chat_new_attachments", filesDrop[key]);
      }
    }
    dispatch(AgencyHelpMessageSendAction(formData));
    setRerender(true);
    setDescription("");
    setErrors({ description: null });
    setFilesDrop([]);
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
          <div className="Topallpage AllPageHight helppage">
            <div className="ContentDivTop Categorypage">
              <div className="usermessageDivSendermessage">
                <div className="imageNameDivUserReceiver">
                  {GetDetailsHelpCommon?.user_image ? (
                    <img
                      className="imageclassdivReciverImage"
                      src={GetDetailsHelpCommon?.user_image}
                      alt=""
                    />
                  ) : (
                    <img
                      className="heplIconsUserMessageHelp"
                      src="/img/avataruser.png"
                      alt=""
                    />
                  )}
                  <h3 className="senderNaemAdminHelp">
                    {GetDetailsHelpCommon?.user_name}
                  </h3>
                  <label className="Mess_Agen_Date heplAdminTimeData">
                    {moment(GetDetailsHelpCommon?.created).format(
                      "MMMM D, h:mm A"
                    )}
                  </label>
                </div>
                <div className="messagedivshwotheMessageSenderinDiv">
                  <div className="underMessagedivshwotheMessageReceiverinDiv">
                    <div className="messageSendermessageDivDiv">
                      <h4 className="messageSendermessage">
                        {GetDetailsHelpCommon?.message}
                      </h4>
                    </div>
                    {GetDetailsHelpCommon?.help_attachments?.length > 0 &&
                      GetDetailsHelpCommon?.help_attachments?.map((item) => (
                        <div className="agencytopimgdiv">
                          <div className="rachelBannerLinkLogoactivity agencycolorsec">
                            <div className="rachelBannerLinkLogoD_F">
                              <span className="firstBannerLink agencyacivityimg">
                                <a
                                  href={item?.help_new_attachments}
                                  target="_blank"
                                >
                                  <img
                                    className="activityagencyimage"
                                    src={item.help_new_attachments}
                                    alt=""
                                  />
                                </a>
                              </span>
                            </div>
                            <p style={{ fontSize: "10px" }}>
                              {" "}
                              {item?.image_name?.length > 15
                                ? `${item?.image_name?.substring(0, 15)}...`
                                : item?.image_name}{" "}
                            </p>
                          </div>
                        </div>
                        // <div className="rachelBannerLinkLogo">
                        //   <div className="rachelBannerLinkLogoD_F">
                        //     <img src="/img/assertgallery.png" alt="" />
                        //     <span className="firstBannerLink">
                        //       <a
                        //         href={item?.chat_attachment}
                        //         target="_blank"
                        //       >
                        //         {item?.image_name?.length > 35
                        //           ? `${item?.image_name?.substring(
                        //               0,
                        //               35
                        //             )}...`
                        //           : item?.image_name}{" "}
                        //       </a>
                        //     </span>
                        //   </div>
                        // </div>
                      ))}
                  </div>
                </div>
                {/* <h4 className="messageSendermessage">
                  {GetDetailsHelpCommon?.message}
                </h4> */}
              </div>
              {GetDetailsHelpCommon?.helpChat_user?.map((item, index) => (
                <>
                  {item?.is_admin ? (
                    <>
                      <div className="userMessageDivReceverMessage">
                        <div className="imageNameDivUserReceiver">
                          {item?.sender_user_image ? (
                            <img
                              className="imageclassdivReciverImage"
                              src={item?.sender_user_image}
                              alt=""
                            />
                          ) : (
                            <img
                              className="heplIconsUserMessageHelp"
                              src="/img/avataruser.png"
                              alt=""
                            />
                          )}
                          <h3 className="senderNaemAdminHelp">
                            {item?.sender_name}
                          </h3>
                          <label className="Mess_Agen_Date heplAdminTimeData">
                            {moment(item?.created).format("MMMM D, h:mm A")}
                          </label>
                        </div>
                        <div className="messagedivshwotheMessageSenderinDiv">
                          <div className="underMessagedivshwotheMessageReceiverinDiv">
                            <div className="messageSendermessageDivDiv">
                              <h4 className="messageSendermessage">
                                {item?.chat}
                              </h4>
                            </div>
                            {item?.chat_attachments_user?.length > 0 &&
                              item?.chat_attachments_user?.map((item) => (
                                <div className="agencytopimgdiv">
                                  <div className="rachelBannerLinkLogoactivity agencycolorsec">
                                    <div className="rachelBannerLinkLogoD_F">
                                      <span className="firstBannerLink agencyacivityimg">
                                        <a
                                          href={item?.chat_new_attachments}
                                          target="_blank"
                                        >
                                          <img
                                            className="activityagencyimage"
                                            src={item.chat_new_attachments}
                                            alt=""
                                          />
                                        </a>
                                      </span>
                                    </div>
                                    <p style={{ fontSize: "10px" }}>
                                      {" "}
                                      {item?.image_name?.length > 15
                                        ? `${item?.image_name?.substring(
                                            0,
                                            15
                                          )}...`
                                        : item?.image_name}{" "}
                                    </p>
                                  </div>
                                </div>
                                // <div className="rachelBannerLinkLogo">
                                //   <div className="rachelBannerLinkLogoD_F">
                                //     <img src="/img/assertgallery.png" alt="" />
                                //     <span className="firstBannerLink">
                                //       <a
                                //         href={item?.chat_attachment}
                                //         target="_blank"
                                //       >
                                //         {item?.image_name?.length > 35
                                //           ? `${item?.image_name?.substring(
                                //               0,
                                //               35
                                //             )}...`
                                //           : item?.image_name}{" "}
                                //       </a>
                                //     </span>
                                //   </div>
                                // </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="userMessageDivReceverMessage">
                        <div className="imageNameDivUserReceiver">
                          {item?.sender_user_image ? (
                            <img
                              className="imageclassdivReciverImage"
                              src={item?.sender_user_image}
                              alt=""
                            />
                          ) : (
                            <img
                              className="heplIconsUserMessageHelp"
                              src="/img/avataruser.png"
                              alt=""
                            />
                          )}
                          <h3 className="senderNaemAdminHelp">
                            {item?.sender_name}
                          </h3>
                          <label className="Mess_Agen_Date heplAdminTimeData">
                            {moment(item?.created).format("MMMM D, h:mm A")}
                          </label>
                        </div>
                        <div className="messagedivshwotheMessageSenderinDiv">
                          <div className="underMessagedivshwotheMessageReceiverinDiv">
                            <div className="messageSendermessageDivDiv">
                              <h4 className="messageSendermessage">
                                {item?.chat}
                              </h4>
                            </div>
                            {item?.chat_attachments_user?.length > 0 &&
                              item?.chat_attachments_user?.map((item) => (
                                <div className="agencytopimgdiv">
                                  <div className="rachelBannerLinkLogoactivity agencycolorsec">
                                    <div className="rachelBannerLinkLogoD_F">
                                      <span className="firstBannerLink agencyacivityimg">
                                        <a
                                          href={item?.chat_new_attachments}
                                          target="_blank"
                                        >
                                          <img
                                            className="activityagencyimage"
                                            src={item.chat_new_attachments}
                                            alt=""
                                          />
                                        </a>
                                      </span>
                                    </div>
                                    <p style={{ fontSize: "10px" }}>
                                      {" "}
                                      {item?.image_name?.length > 15
                                        ? `${item?.image_name?.substring(
                                            0,
                                            15
                                          )}...`
                                        : item?.image_name}{" "}
                                    </p>
                                  </div>
                                </div>
                                // <div className="rachelBannerLinkLogo">
                                //   <div className="rachelBannerLinkLogoD_F">
                                //     <img src="/img/assertgallery.png" alt="" />
                                //     <span className="firstBannerLink">
                                //       <a
                                //         href={item?.chat_attachment}
                                //         target="_blank"
                                //       >
                                //         {item?.image_name?.length > 35
                                //           ? `${item?.image_name?.substring(
                                //               0,
                                //               35
                                //             )}...`
                                //           : item?.image_name}{" "}
                                //       </a>
                                //     </span>
                                //   </div>
                                // </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ))}
              <div className="addpage Industrypage">
                <form onSubmit={validateSubmit} id="websiteUserRegisterForm">
                  <div className="messagetextaremaindiv">
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
                  </div>
                  <div className="showthedatamapAttachfiles">
                    {" "}
                    <aside style={thumbsContainer}>{thumbs}</aside>
                    {fileRejectionItems.length > 0 && (
                      <>
                        <ul className="errorData">{fileRejectionItems}</ul>
                      </>
                    )}
                  </div>
                  <div className="helppagebtn1">
                    <div className="helppage">
                      <div
                        className="helpbtnattact"
                        {...getRootProps({ style })}
                      >
                        <input {...getInputProps()} />
                        <p>Attach file</p>
                      </div>
                    </div>
                    {/* ------------------------------------------------------------------------------------------ */}
                    <div className="buttonNotShwoInCenter">
                      <input
                        className="btn-primary border-radius w-335 h-47 registerWebsiteUserBtn "
                        type="submit"
                        value="Submit"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Help_view_message;
