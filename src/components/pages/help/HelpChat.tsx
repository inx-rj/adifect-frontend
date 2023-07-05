import moment from "moment";
import { API_URL } from "helper/env";
import { ROLES } from "helper/config";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/store";
import {
  ADD_CHAT_IN_HELP,
  GET_HELP_DETAILS,
} from "redux/actions/help/help.action";
import { CHAT_RESPONSE, PARTICULAR_HELP } from "redux/reducers/help/help.slice";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { helpFormData, errorType } from "helper/types/help/helpTypes";

const Help_Common_Chat = () => {
  const { helpChatId } = useParams();
  const dispatch = useAppDispatch();
  const [filesDrop, setFilesDrop] = useState([]);
  const [errors, setErrors] = useState<helpFormData>({
    description: null,
  });
  const [helpForm, setHelpForm] = useState<errorType>({
    description: "",
  });
  const helpData = useAppSelector(PARTICULAR_HELP);
  const userData = useAppSelector(GET_USER_PROFILE_DATA);
  const chatReponse = useAppSelector(CHAT_RESPONSE);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors({ ...errors, [name]: "" });
    setHelpForm({ ...helpForm, [name]: value });
  };

  useSingleEffect(() => {
    dispatch(
      GET_HELP_DETAILS(
        helpChatId,
        userData?.data?.role === ROLES.ADMIN
          ? API_URL.HELP.ADMIN_HELP_LIST
          : API_URL.HELP.HELP_LIST
      )
    );
  });
  useUpdateEffect(() => {
    dispatch(
      GET_HELP_DETAILS(
        helpChatId,
        userData?.data?.role === ROLES.ADMIN
          ? API_URL.HELP.ADMIN_HELP_LIST
          : API_URL.HELP.HELP_LIST
      )
    );
  }, [chatReponse.update]);

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

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    minSize: 0,
    maxSize: 5242880,
    onDrop,
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }, i) => (
    <li className="mapDataDiv" key={i}>
      <ul className="mapDataDiv2">
        {errors.map((e) => (
          <li className="mapDataDiv3" key={e.code}>
            {e.message}
          </li>
        ))}
      </ul>
    </li>
  ));
  const removeFile = (file) => () => {
    const newFiles = [...filesDrop];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFilesDrop(newFiles);
  };

  const thumbs = filesDrop.map((file: File, index: number) => (
    <div className="hdefjkw" key={index}>
      <div>
        <img
          className="attachAssertspopImage attachdiv"
          src="/img/assertgallery.png"
          alt=""
        />
        {file?.["title"]}
        <button onClick={removeFile(file)} className="remove_button_delet">
          {" "}
          <img
            className="attachAssertspopDeleteI1"
            src="/img/deleterc.png"
            alt=""
          />
        </button>
      </div>
    </div>
  ));

  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      description: !helpForm.description && "This field is required",
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler();
  };
  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("help", helpChatId);
    formData.append("sender", userData?.data?.id.toString());
    formData.append("chat", helpForm.description);
    if (userData?.data?.role === ROLES.ADMIN) {
      formData.append("receiver", helpData?.data?.user.toString());
      formData.append("is_admin", `true`);
    }
    for (const key of Object.keys(filesDrop)) {
      formData.append("chat_new_attachments", filesDrop[key]);
    }
    dispatch(
      ADD_CHAT_IN_HELP(
        formData,
        userData?.data?.role === ROLES.ADMIN
          ? API_URL.HELP.ADMIN_CHAT_HELP
          : API_URL.HELP.AGENCY_CHAT_HELP
      )
    );
    setErrors({ description: null });
    setFilesDrop([]);
  };

  return (
    <>
      {helpData.loading ? (
        <LoadingSpinner />
      ) : (
        <div className="page-container">
          <div className="flex-between mb-5">
            <div className="CategorylistName">
              <h4 className="font-bold text-xl">Adifect Help Page</h4>
            </div>
            <div className=" w-[160px]">
              <Link
                to="/help/"
                className="border border-theme rounded-md py-3 text-theme  flex content-center justify-center"
              >
                Back
              </Link>
            </div>
          </div>
          <div className="bg-white p-10 rounded-sm ">
            <div className="ContentDivTop Categorypage">
              <div className="usermessageDivSendermessage ">
                <div className="imageNameDivUserReceiver flex justify-start items-center ">
                  {helpData?.data?.user_image ? (
                    <img
                      className="imageclassdivReciverImage h-[40px] w-[40px] rounded-full"
                      src={helpData?.data?.user_image}
                      alt=""
                    />
                  ) : (
                    <img
                      className="heplIconsUserMessageHelp"
                      src="/img/avataruser.png"
                      alt=""
                    />
                  )}
                  <h3 className="senderNaemAdminHelp text-xl font-bold my-1 mx-3 ">
                    {helpData?.data?.user_name}
                  </h3>
                  <label className="Mess_Agen_Date text-[#a0a0a0] text-xs font-medium inline-block ml-0 mt-[13px] mb-0heplAdminTimeData">
                    {moment(helpData?.data?.created).format("MMMM D, h:mm A")}
                  </label>
                </div>
                <div className="messagedivshwotheMessageSenderinDiv">
                  <div className="underMessagedivshwotheMessageReceiverinDiv min-h-[43px] ml-[18px] mt-1 mb-[3px] border-l-2 border-l-[#00000063] border-solid; ">
                    <div className="mx-10">
                      <h4 className="messageSendermessage rounded  bg-[#2472fc0f]  text-black inline-block text-base font-normal break-all mb-0 px-2.5 py-[7px]  ">
                        {helpData?.data?.message}
                      </h4>
                    </div>
                    <div className="mx-10 flex flex-wrap justify-start items-center">
                      {helpData?.data?.help_attachments?.length > 0 &&
                        helpData?.data?.help_attachments?.map((item) => (
                          <div className="agencytopimgdiv">
                            <div className="rachelBannerLinkLogoactivity bg-none cursor-pointer m-0 p-[3px] rounded-[30px] agencycolorsec ">
                              <div className="rachelBannerLinkLogoD_F flex items-center ">
                                <span className="firstBannerLink h-[130px] overflow-hidden w-[130px] inline-block text-inherit mx-[13px] my-0 agencyacivityimg">
                                  <a
                                    href={item?.help_new_attachments}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="no-underline"
                                  >
                                    <img
                                      className="activityagencyimage h-full object-cover w-full px-0 py-2"
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
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              {helpData?.data?.helpChat_user?.map((item, index) => (
                <>
                  <div className="userMessageDivReceverMessage">
                    <div className="imageNameDivUserReceiver flex justify-start items-center ">
                      {item?.sender_user_image ? (
                        <img
                          className="imageclassdivReciverImage  h-[40px] w-[40px] rounded-full"
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
                      <h3 className="senderNaemAdminHelp text-xl font-bold my-1 mx-3 ">
                        {item?.sender_name}
                      </h3>
                      <label className="Mess_Agen_Date text-[#a0a0a0] text-xs font-medium inline-block ml-0 mt-[13px] mb-0heplAdminTimeData">
                        {moment(item?.created).format("MMMM D, h:mm A")}
                      </label>
                    </div>
                    <div className="messagedivshwotheMessageSenderinDiv">
                      <div className="underMessagedivshwotheMessageReceiverinDiv min-h-[43px] ml-[18px] mt-1 mb-[3px] border-l-2 border-l-[#00000063] border-solid;">
                        <div className="mx-10">
                          <h4 className="messageSendermessage rounded  bg-[#2472fc0f]  text-black inline-block text-base font-normal break-all mb-0 px-2.5 py-[7px]  ">
                            {item?.chat}
                          </h4>
                        </div>
                        <div className="mx-10 flex flex-wrap justify-start items-start">
                          {item?.chat_attachments_user?.length > 0 &&
                            item?.chat_attachments_user?.map((item) => (
                              <div className="agencytopimgdiv">
                                <div className="rachelBannerLinkLogoactivity bg-none cursor-pointer m-0 p-[3px] rounded-[30px] agencycolorsec">
                                  <div className="rachelBannerLinkLogoD_F flex items-center ">
                                    <span className="firstBannerLink h-[130px] overflow-hidden w-[130px] inline-block text-inherit mx-[13px] my-0 agencyacivityimg">
                                      <a
                                        href={item?.chat_new_attachments}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="no-underline"
                                      >
                                        <img
                                          className="activityagencyimage h-full object-cover w-full px-0 py-2"
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
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
              <div className="ContentDivTop Categorypage my-12">
                <div className="addpage Industrypage">
                  <form
                    onSubmit={validateSubmit}
                    id="websiteUserRegisterForm"
                    className="grid lg:grid-cols-2 grid-cols-1"
                  >
                    <div className="input-fields-wrapper col-start-1 col-end-2">
                      <label>Message</label>
                      <textarea
                        className={"input-style h-[200px] bg-slate-100"}
                        name="description"
                        id="description"
                        placeholder=""
                        maxLength={2000}
                        value={helpForm.description}
                        onChange={handleChange}
                      />
                      <p className="deslimtsec_4 text-sm	 font-normal text-black text-right mt-[-5px] mx-[3px] m-0">
                        <span
                          style={{
                            color:
                              helpForm.description?.length === 2000 &&
                              "#D14F4F",
                          }}
                        >
                          {helpForm.description?.length ?? 0}
                          /2000
                        </span>
                      </p>
                      <span className="err-tag">
                        {errors.description ?? ""}
                      </span>
                    </div>
                    <div className="col-start-1 col-end-2 flex justify-between items-center flex-wrap">
                      <div className="helppage ">
                        <div
                          className="helpbtnattact addhelpbtn"
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          <p className="w-40 h-[45px] flex items-center text-white justify-center cursor-pointer rounded-lg; bg-theme rounded-lg">
                            Attach file
                          </p>
                        </div>
                        <aside> {thumbs}</aside>
                        {fileRejectionItems.length > 0 && (
                          <ul className="errorData">{fileRejectionItems}</ul>
                        )}
                      </div>

                      <div className="">
                        <input
                          className="w-40 h-[45px] flex items-center text-white justify-center cursor-pointer rounded-lg bg-theme "
                          type="submit"
                          value="Submit"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Help_Common_Chat;
