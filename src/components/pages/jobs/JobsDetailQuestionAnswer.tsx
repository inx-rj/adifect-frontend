import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import moment from "moment";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/store";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import {
  DELETE_JOB_ANSWER,
  DELETE_JOB_QUESTION,
  GET_JOBS_ANSWER_DATA,
  GET_JOBS_QUESTION_LIST,
  LIST_ALL_ANSWERS_POST,
  LIST_ALL_SEARCH,
  POST_NEW_QUESTION,
} from "redux/actions/jobs/jobsQuestionAnswer.actions";
import {
  DELETE_JOBS_ANSWER_DETAILS,
  DELETE_JOBS_QUE_DETAILS,
  GET_JOBS_QUE_DETAILS,
  GET_QUE_N_ANS_SEARCH,
} from "redux/reducers/jobs/jobsQuestionAnswer.slice";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import { Images } from "helper/images";
import { ROLES } from "helper/config";
import { API_URL } from "helper/env";
import {
  BlockOutlined,
  Close,
  DeleteOutline,
  MessageOutlined,
  MoreHorizSharp,
  PersonOutlined,
} from "@mui/icons-material";

interface JobDetailsQueAnsPropType {
  agencyID?: string | number;
  job_applied_id?: string | number;
}
const JobsDetailQuestionAnswer = (props: JobDetailsQueAnsPropType) => {
  const { agencyID, job_applied_id } = props;
  const { jobId } = useParams();
  const [demo, setDemo] = useState("0");
  const [reply, setreply] = useState("");
  const [search, setsearch] = useState("");
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [hide, sethide] = useState("");
  const [hidesearch, sethidesearch] = useState(true);
  const [oldestfirst, setoldestfirst] = useState(false);
  const [hidebox, sethidebox] = useState(false);
  const [hideicon, sethideicon] = useState(false);
  const [orderby, setorderby] = useState("newest");
  // const [  QuestionSearchData   , setQuestionSearchData] = useState();

  /********** Question **********/
  const [newQuestion, setNewQuestion] = useState<any>();
  const [errors1, setErrors] = useState({
    newQuestion: null,
  });

  const userData = useAppSelector(GET_USER_PROFILE_DATA);

  const QuestionData = useAppSelector(GET_JOBS_QUE_DETAILS);

  //   const { AnswerData } = useSelector((state) => state.AnswerReducer);

  const QuestionSearchData = useAppSelector(GET_QUE_N_ANS_SEARCH);

  const handleClickfiles = async (event) => {
    // console.log(orderby);
    setoldestfirst((current) => !current);
    if (oldestfirst === true) {
      setorderby("newest");
    } else if (oldestfirst === false) {
      setorderby("oldest");
    }
    if (userData?.data?.role === ROLES.ADMIN) {
      dispatch(
        LIST_ALL_SEARCH(
          { order_by: orderby, status: demo, job_id: jobId },
          `${API_URL.JOBS.ADMIN_QUESTION_FILTER}`
        )
      );
    } else {
      dispatch(
        LIST_ALL_SEARCH(
          { order_by: orderby, status: demo, job_id: jobId },
          `${API_URL.JOBS.QUESTION_FILTER}`
        )
      );
    }
    sethidesearch(false);
  };

  const handleClickicon = (id) => {
    // console.log(id);
    sethidebox(id);
  };

  const deletehidebox = (id) => {
    sethidebox(false);
  };

  const deletehideicon = (id) => {
    sethideicon(false);
  };

  const handleClickanswer = (id) => {
    sethideicon(id);
  };

  setTimeout(function () {
    setIsLoading(false);
  }, 1500);

  const success = useAppSelector(DELETE_JOBS_QUE_DETAILS);
  const answer = useAppSelector(DELETE_JOBS_ANSWER_DETAILS);

  const goback = async (job_owner, id, job_applied, user, sender) => {
    sethide(id);
    if (reply) {
      if (userData?.data?.role === ROLES.MEMBER) {
        dispatch(
          LIST_ALL_ANSWERS_POST({
            answer: reply,
            user: userData?.data?.role === ROLES.ADMIN ? agencyID : user,
            job_applied,
            job_owner,
            sender,
            question: id,
            type: "question",
          })
        );
      } else {
        dispatch(
          LIST_ALL_ANSWERS_POST({
            answer: reply,
            agency: userData?.data?.role === ROLES.ADMIN ? agencyID : user,
            job_applied,
            job_owner,
            sender,
            question: id,
            type: "answer",
          })
        );
      }

      dispatch(GET_JOBS_ANSWER_DATA());
      dispatch(GET_JOBS_QUESTION_LIST(jobId));
      sethide("");
      setreply("");
    }
  };
  const cancelReply = async (id) => {
    sethide("");
    setreply("");
  };

  const handlesearch = async (e) => {
    if (e.target.value) {
      if (userData?.data?.role === ROLES.ADMIN) {
        dispatch(
          LIST_ALL_SEARCH(
            { question: e.target.value, job_id: jobId },
            `${API_URL.JOBS.ADMIN_QUESTION_FILTER}`
          )
        );
      } else {
        dispatch(
          LIST_ALL_SEARCH(
            { question: e.target.value, job_id: jobId },
            `${API_URL.JOBS.QUESTION_FILTER}`
          )
        );
      }
      // dispatch(LIST_ALL_SEARCH({ question: e.target.value, job_id: jobId }));
      sethidesearch(false);
    } else {
      sethidesearch(true);
      dispatch(GET_JOBS_QUESTION_LIST(jobId));
    }
  };

  useEffect(() => {
    dispatch(GET_JOBS_QUESTION_LIST(jobId));
  }, [success, answer]);

  useEffect(() => {
    dispatch(GET_JOBS_ANSWER_DATA());
  }, [answer, success]);

  const deleteHandler = (id) => {
    swal({
      title: "Warning",
      text: "Are you sure you want to delete this question?",
      className: "errorAlert",
      icon: Images.ErrorLogo,
      buttons: {
        Cancel: true,
        OK: true,
      },
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete !== "Cancel") {
        dispatch(DELETE_JOB_QUESTION(id));
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
          className: "successAlert",
          icon: Images.Logo,
          buttons: {
            OK: false,
          },
          timer: 1500,
        });
        setIsLoading(true);
      }
    });
  };

  const deleteanswerHandler = (id) => {
    swal({
      title: "Warning",
      text: "Are you sure you want to delete this answer?",
      className: "errorAlert",
      icon: Images.ErrorLogo,
      buttons: {
        Cancel: true,
        OK: true,
      },
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete !== "Cancel") {
        dispatch(DELETE_JOB_ANSWER(id));
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
          className: "successAlert",
          icon: Images.ErrorLogo,
          buttons: {
            OK: false,
          },
          timer: 1500,
        });
        setIsLoading(true);
      }
    });
  };

  const handleChangeDemo = async (event) => {
    setDemo(event.target.value);
    if (userData?.data?.role === ROLES.ADMIN) {
      dispatch(
        LIST_ALL_SEARCH(
          {
            order_by: orderby,
            status: event.target.value,
            job_id: jobId,
          },
          `${API_URL.JOBS.ADMIN_QUESTION_FILTER}`
        )
      );
    } else {
      dispatch(
        LIST_ALL_SEARCH(
          {
            order_by: orderby,
            status: event.target.value,
            job_id: jobId,
          },
          `${API_URL.JOBS.QUESTION_FILTER}`
        )
      );
    }

    sethidesearch(false);
  };

  const validateSubmit = (e) => {
    e.preventDefault();

    const tempErrors: any = {
      newQuestion: !newQuestion && "Please enter your question.",
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    newQuestionSubmit(e);
  };

  const newQuestionSubmit = (e) => {
    e.preventDefault();

    if (newQuestion) {
      dispatch(
        POST_NEW_QUESTION({
          job_applied: props.job_applied_id,
          question: newQuestion,
          user: userData.data.id,
        })
      );
      dispatch(GET_JOBS_QUESTION_LIST(jobId));
      setNewQuestion("");
    } else {
      swal({
        title: "Error",
        text: "Please enter your question",
        className: "errorAlert",
        icon: Images.ErrorLogo,
        buttons: {
          OK: false,
        },
        timer: 5000,
      });
    }
  };
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="marketingAgencyFilesMain  py-5">
            <div className="activityDropdownButton flex gap-4">
              <div className="activityDivIcon">
                <input
                  onChange={handlesearch}
                  className="input-style bg-[#fff] rounded-lg h-[46px] w-[350px]"
                  type="text"
                  placeholder="Search Activity"
                />
              </div>

              <div className="activitySelectNew max-w-[200px] w-full ml-[110px] bg-[#fff] border-[#afb4b7] rounded-lg">
                <Select
                  className={
                    demo === "0"
                      ? "selectinputcolor w-full"
                      : "menuiteminputcolor w-full"
                  }
                  value={demo}
                  onChange={handleChangeDemo}
                  displayEmpty
                >
                  <MenuItem value={0}>All</MenuItem>
                  <MenuItem value={1}>Answered</MenuItem>
                  <MenuItem value={2}>UnAnswered</MenuItem>
                </Select>
              </div>
              <div className="oldestActivityDiv flex w-full items-center">
                {oldestfirst && (
                  <>
                    {" "}
                    <button
                      className="flex gap-2 cursor-pointer px-5 py-3 text-[#71757b]  font-semibold text-base rounded border-2 border-[#71757b] border-solid"
                      onClick={handleClickfiles}
                    >
                      <img
                        className="activityArrowIcon"
                        src={Images.ActivityArrow}
                      />{" "}
                      Oldest first
                    </button>{" "}
                  </>
                )}
                {!oldestfirst && (
                  <>
                    {" "}
                    <button
                      className="flex gap-2 cursor-pointer px-5 py-3 text-[#71757b]  font-semibold text-base rounded border-2 border-[#71757b] border-solid"
                      onClick={handleClickfiles}
                    >
                      <img
                        className="activityArrowIcon"
                        src={Images.ActivityArrow}
                      />{" "}
                      Newest first
                    </button>{" "}
                  </>
                )}
              </div>
            </div>

            {hidesearch && (
              <>
                {" "}
                {QuestionData?.data?.map((item, index) => (
                  <div className="QuesboxFirst my-5 p-5 border border-[#c6cacc] rounded">
                    <div className="QuesboxFirstContent ">
                      <div className="InlinewillisNameDate_head flex justify-between">
                        <div className="InlinewillisNameDate">
                          <div className="flex gap-3">
                            <div>
                              <img
                                className="willisLogo h-[50px] w-[50px] rounded-full"
                                src={
                                  item.profile_pic
                                    ? item.profile_pic
                                    : Images.ProfileBG
                                }
                                alt=""
                              />
                            </div>
                            <div className="tonnyWillisName text-[#2472fc] text-lg font-medium">
                              <div> {item.username}</div>
                              <div>
                                <label className="Tonny_Agen_Date text-[#a0a0a0] text-base font-medium flex items-center">
                                  {" "}
                                  <span className="dateaq">
                                    {moment(item?.created).format(
                                      "MMMM Do YYYY"
                                    )}
                                  </span>
                                  {moment(item?.created).format("h:mm:ss a")}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="threeDotLogo">
                          <div className="invitecloseA">
                            <MoreHorizSharp
                              onClick={() => handleClickicon(item.id)}
                            />
                          </div>

                          {hidebox && hidebox == item?.id && (
                            <>
                              {" "}
                              <div className="VisitProfileQ">
                                <Close
                                  onClick={() => deletehidebox(item.id)}
                                ></Close>
                                <div>
                                  <Link
                                    className="QProfilemenudiv"
                                    to="/profile"
                                  >
                                    <span>
                                      <PersonOutlined></PersonOutlined>
                                    </span>
                                    Visit Profile
                                  </Link>
                                </div>
                                {userData?.data?.role !== ROLES.CREATOR && (
                                  <>
                                    <div>
                                      <button className="QProfilemenudiv">
                                        <span>
                                          <MessageOutlined></MessageOutlined>
                                        </span>
                                        Message
                                      </button>
                                    </div>
                                    <div>
                                      <button className="QProfilemenudiv">
                                        <span>
                                          <BlockOutlined></BlockOutlined>
                                        </span>
                                        Block
                                      </button>
                                    </div>
                                  </>
                                )}
                                {item?.answer_question?.length < 1 &&
                                  userData?.data?.id === item?.user && (
                                    <div>
                                      <button
                                        type="button"
                                        className="QProfilemenudiv"
                                        onClick={() => deleteHandler(item.id)}
                                      >
                                        <span>
                                          <DeleteOutline />
                                        </span>
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                {/* <div>
                                  <button
                                    className="QProfilemenudiv"
                                    type="button"
                                    onClick={() => deleteHandler(item.id)}
                                  >
                                    <span>
                                      <img
                                        className="QProfilemenu"
                                        src="/img/Deleteimg.png"
                                      />
                                    </span>
                                    Delete
                                  </button>
                                </div> */}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      {item.id && (
                        <>
                          {" "}
                          <h3 className="firstBoxHeadQues text-lg font-semibold my-6 break-all text-[#000] ">
                            {/* {JSON.stringify(AnswerData)} */}
                            {item?.question}
                          </h3>{" "}
                        </>
                      )}
                      {/* {JSON.stringify(item?.answer_question)} */}
                      <div className="">
                        {item?.answer_question?.map((value, index) => (
                          <div className="grid gap-2 pl-5">
                            <>
                              {value?.question === item?.id && (
                                <div className="my-2 p-5 border rounded">
                                  <div className="flex justify-between">
                                    <div className="quesAnsdivMainInline ">
                                      <div
                                        className="willisNameImg willisNameImgQA flex gap-3"
                                        id={`quesId-${item.id}`}
                                      >
                                        <img
                                          className="willisLogo h-[50px] w-[50px] rounded-full"
                                          src={
                                            value.user_profile_pic
                                              ? value.user_profile_pic
                                              : Images.ProfileBG
                                          }
                                          alt=""
                                        />
                                        <div className="tonnyWillisName text-[#2472fc] text-lg font-medium">
                                          <div> {value?.username}</div>
                                          <div>
                                            <label className="Tonny_Agen_Date text-[#a0a0a0] text-base font-medium flex items-center">
                                              {" "}
                                              <span className="dateaq">
                                                {moment(value?.created).format(
                                                  "MMMM Do YYYY"
                                                )}
                                              </span>
                                              {moment(value?.created).format(
                                                "h:mm:ss a"
                                              )}
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      {/* <label className="Tonny_Agen_Date">
                                        {" "}
                                        <span className="dateaq">
                                          {" "}
                                          {moment(value?.created).format(
                                            "MMMM Do YYYY"
                                          )}
                                        </span>
                                        {moment(value?.created).format(
                                          "h:mm:ss a"
                                        )}
                                      </label> */}
                                    </div>

                                    <div className="threeDotLogoQA">
                                      <MoreHorizSharp
                                        onClick={() =>
                                          handleClickanswer(value.id)
                                        }
                                      />
                                      {/* <img
                                        src="/img/imgvisit.png"
                                        onClick={() =>
                                          handleClickanswer(value.id)
                                        }
                                      /> */}
                                      {hideicon && hideicon == value.id && (
                                        <>
                                          {" "}
                                          <div className="VisitProfileQ">
                                            <div className="visitimgclose">
                                              <Close
                                                onClick={() =>
                                                  deletehideicon(item.id)
                                                }
                                              ></Close>
                                              {/* <img
                                                className="QProfilemenu"
                                                src="/img/Deleteimg.png"
                                                onClick={() =>
                                                  deletehideicon(item.id)
                                                }
                                              /> */}
                                            </div>
                                            <div className="closevisitP">
                                              <div>
                                                <Link
                                                  className="QProfilemenudiv"
                                                  to="/profile"
                                                >
                                                  <span>
                                                    <PersonOutlined></PersonOutlined>
                                                  </span>
                                                  Visit Profile
                                                </Link>
                                              </div>
                                              {userData?.data?.role !==
                                                ROLES.CREATOR && (
                                                <>
                                                  <div>
                                                    <button className="QProfilemenudiv">
                                                      <span>
                                                        {" "}
                                                        <MessageOutlined></MessageOutlined>
                                                      </span>
                                                      Message
                                                    </button>
                                                  </div>
                                                  <div>
                                                    <button className="QProfilemenudiv">
                                                      <span>
                                                        {" "}
                                                        <BlockOutlined></BlockOutlined>
                                                      </span>
                                                      Block
                                                    </button>
                                                  </div>
                                                </>
                                              )}
                                              {userData?.data?.role ===
                                              ROLES.CREATOR
                                                ? value.id ===
                                                    userData?.data?.id && (
                                                    <div>
                                                      <button
                                                        type="button"
                                                        className="QProfilemenudiv"
                                                        onClick={() =>
                                                          deleteanswerHandler(
                                                            value.id
                                                          )
                                                        }
                                                      >
                                                        <span>
                                                          <DeleteOutline
                                                          // onClick={() =>
                                                          //   deleteanswerHandler(
                                                          //     value.id
                                                          //   )
                                                          // }
                                                          ></DeleteOutline>
                                                          {/* <img
                                                    className="QProfilemenu"
                                                    src="/img/Deleteimg.png"
                                                  /> */}
                                                        </span>
                                                        Delete
                                                      </button>
                                                    </div>
                                                  )
                                                : value.agency && (
                                                    <div>
                                                      <button
                                                        type="button"
                                                        className="QProfilemenudiv"
                                                        onClick={() =>
                                                          deleteanswerHandler(
                                                            value.id
                                                          )
                                                        }
                                                      >
                                                        <span>
                                                          <DeleteOutline
                                                          // onClick={() =>
                                                          //   deleteanswerHandler(
                                                          //     value.id
                                                          //   )
                                                          // }
                                                          ></DeleteOutline>
                                                          {/* <img
                                                        className="QProfilemenu"
                                                        src="/img/Deleteimg.png"
                                                      /> */}
                                                        </span>
                                                        Delete
                                                      </button>
                                                    </div>
                                                  )}
                                            </div>
                                          </div>{" "}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  <p className="pl-16">{value?.answer} </p>
                                </div>
                              )}
                            </>{" "}
                          </div>
                        ))}
                      </div>
                      <div>
                        {hide && hide == item?.id && (
                          <div className="jobdetailanspage my-5">
                            <textarea
                              className="replytextarea input-style h-[200px]  max-w-[600px] w-full p-2"
                              onChange={(e) => setreply(e.target.value)}
                            />
                            <p className="limitans">
                              <span
                                className="flex justify-end  max-w-[600px] w-full "
                                style={{
                                  color: reply?.length === 4000 && "#D14F4F",
                                }}
                              >
                                {reply?.length ?? 0}
                                /4000
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="firstBoxreplybutton flex gap-2">
                        <button
                          type="button"
                          className="Boxreplybutton btn btn-outline mt-5"
                          onClick={() =>
                            goback(
                              item.job_owner,
                              item.id,
                              item.job_applied,
                              userData?.data?.id,
                              item.sender
                            )
                          }
                        >
                          Reply
                        </button>
                        {hide && hide == item?.id && (
                          <>
                            <button
                              type="button"
                              className="Boxreplybutton cancel-QA-btn btn btn-outline mt-5"
                              onClick={() => cancelReply(item.id)}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {!hidesearch && (
              <>
                {" "}
                {QuestionSearchData?.data?.map((item, index) => (
                  <div className="QuesboxFirst my-5 border rounded">
                    <div className="QuesboxFirstContent p-5">
                      <div className="InlinewillisNameDate_head flex justify-between">
                        <div className="InlinewillisNameDate">
                          <div className="flex gap-3">
                            <div className="willisNameImg willisNameImgq flex gap-2">
                              <img
                                className="willisLogo h-[50px] w-[50px] rounded-full"
                                src={
                                  item.profile_pic
                                    ? item.profile_pic
                                    : Images.ProfileBG
                                }
                                alt=""
                              />
                              <div className="tonnyWillisName text-[#2472fc] text-lg font-medium">
                                <div> {item.username}</div>
                                <div>
                                  <label className="Tonny_Agen_Date text-[#a0a0a0] text-base font-medium flex items-center">
                                    {" "}
                                    <span className="dateaq">
                                      {moment(item?.created).format(
                                        "MMMM Do YYYY"
                                      )}
                                    </span>
                                    {moment(item?.created).format("h:mm:ss a")}
                                  </label>
                                </div>
                              </div>
                            </div>
                            {/* <label className="Tonny_Agen_Date">
                              {" "}
                              <span className="dateaq">
                                {moment(item?.created).format("MMMM Do YYYY")}
                              </span>
                              {moment(item?.created).format("h:mm:ss a")}
                            </label> */}
                          </div>
                        </div>

                        <div className="threeDotLogo">
                          <div className="invitecloseA">
                            <MoreHorizSharp
                              onClick={() => handleClickicon(item.id)}
                            />
                            {/* <img
                              src="/img/imgvisit.png"
                              onClick={() => handleClickicon(item.id)}
                            /> */}
                          </div>

                          {hidebox && hidebox == item?.id && (
                            <>
                              {" "}
                              <div className="VisitProfileQ">
                                <Close
                                  onClick={() => deletehidebox(item.id)}
                                ></Close>
                                {/* <img
                                  className="QProfilemenu"
                                  src="/img/Deleteimg.png"
                                  onClick={() => deletehidebox(item.id)}
                                /> */}
                                <div>
                                  <Link
                                    className="QProfilemenudiv"
                                    to="/profile"
                                  >
                                    <span>
                                      <PersonOutlined></PersonOutlined>
                                    </span>
                                    Visit Profile
                                  </Link>
                                </div>
                                <div>
                                  <button className="QProfilemenudiv">
                                    <span>
                                      <MessageOutlined></MessageOutlined>
                                    </span>
                                    Message
                                  </button>
                                </div>
                                <div>
                                  <button className="QProfilemenudiv">
                                    <span>
                                      <BlockOutlined></BlockOutlined>
                                    </span>
                                    Block
                                  </button>
                                </div>
                                {/* <div>
                                  <button
                                    className="QProfilemenudiv"
                                    type="button"
                                    onClick={() => deleteHandler(item.id)}
                                  >
                                    <span>
                                      <img
                                        className="QProfilemenu"
                                        src="/img/Deleteimg.png"
                                      />
                                    </span>
                                    Delete
                                  </button>
                                </div> */}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      {item.id && (
                        <>
                          {" "}
                          <h3 className="firstBoxHeadQues text-lg font-semibold my-6 break-all text-[#000]">
                            {/* {JSON.stringify(AnswerData)} */}
                            {item?.question}
                          </h3>{" "}
                        </>
                      )}
                      {/* {JSON.stringify(item?.answer_question)} */}
                      <>
                        {item?.answer_question?.map((value, index) => (
                          <div className="grid gap-2 pl-5">
                            <div className="firstBoxHeadQuesans border rounded p-5 my-2">
                              {value?.question === item?.id && (
                                <>
                                  <div className="flex justify-between">
                                    <div
                                      className="willisNameImg willisNameImgQA flex gap-4"
                                      id={`quesId-${item.id}`}
                                    >
                                      <img
                                        className="willisLogo h-[50px] w-[50px] rounded-full"
                                        src={
                                          value.user_profile_pic
                                            ? value.user_profile_pic
                                            : Images.ProfileBG
                                        }
                                        alt=""
                                      />
                                      <div className="tonnyWillisName text-[#2472fc] text-lg font-medium">
                                        <div> {value?.username}</div>
                                        <div>
                                          <label className="Tonny_Agen_Date text-[#a0a0a0] text-base font-medium flex items-center">
                                            {" "}
                                            <span className="dateaq">
                                              {moment(value?.created).format(
                                                "MMMM Do YYYY"
                                              )}
                                            </span>
                                            {moment(value?.created).format(
                                              "h:mm:ss a"
                                            )}
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    {/* <label className="Tonny_Agen_Date">
                                      {" "}
                                      <span className="dateaq">
                                        {" "}
                                        {moment(value?.created).format(
                                          "MMMM Do YYYY"
                                        )}
                                      </span>
                                      {moment(value?.created).format(
                                        "h:mm:ss a"
                                      )}
                                    </label> */}

                                    <div className="threeDotLogo">
                                      <MoreHorizSharp
                                        onClick={() =>
                                          handleClickanswer(value.id)
                                        }
                                      />
                                      {/* <img
                                        src="/img/imgvisit.png"
                                        onClick={() =>
                                          handleClickanswer(value.id)
                                        }
                                      /> */}
                                      {hideicon && hideicon == value.id && (
                                        <>
                                          {" "}
                                          <div className="VisitProfileQ">
                                            <Close
                                              onClick={() =>
                                                deletehideicon(item.id)
                                              }
                                            ></Close>
                                            {/* <img
                                              className="QProfilemenu"
                                              src="/img/Deleteimg.png"
                                              onClick={() =>
                                                deletehideicon(item.id)
                                              }
                                            /> */}
                                            <div>
                                              <Link
                                                className="QProfilemenudiv"
                                                to="/profile"
                                              >
                                                <span>
                                                  <PersonOutlined></PersonOutlined>
                                                </span>
                                                Visit Profile
                                              </Link>
                                            </div>
                                            <div>
                                              <button className="QProfilemenudiv">
                                                <span>
                                                  {" "}
                                                  <MessageOutlined></MessageOutlined>
                                                </span>
                                                Message
                                              </button>
                                            </div>
                                            <div>
                                              <button className="QProfilemenudiv">
                                                <span>
                                                  {" "}
                                                  <BlockOutlined></BlockOutlined>
                                                </span>
                                                Block
                                              </button>
                                            </div>
                                            {value.agency && (
                                              <div>
                                                <button className="QProfilemenudiv">
                                                  <span>
                                                    <DeleteOutline
                                                      onClick={() =>
                                                        deleteanswerHandler(
                                                          value.id
                                                        )
                                                      }
                                                    ></DeleteOutline>
                                                    {/* <img
                                                      className="QProfilemenu"
                                                      src="/img/Deleteimg.png"
                                                      onClick={() =>
                                                        deleteanswerHandler(
                                                          value.id
                                                        )
                                                      }
                                                    /> */}
                                                  </span>
                                                  Delete
                                                </button>
                                              </div>
                                            )}
                                          </div>{" "}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  <p className="pl-16">{value?.answer} </p>
                                </>
                              )}
                            </div>{" "}
                          </div>
                        ))}
                      </>
                      <div>
                        {hide && hide == item?.id && (
                          <div className="jobdetailanspage my-5">
                            <textarea
                              className="replytextarea input-style h-[200px]  max-w-[600px] w-full p-2"
                              onChange={(e) => setreply(e.target.value)}
                            />
                            <p className="limitans">
                              <span
                                className="flex justify-end  max-w-[600px] w-full "
                                style={{
                                  color: reply?.length === 4000 && "#D14F4F",
                                }}
                              >
                                {reply?.length ?? 0}
                                /4000
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="firstBoxreplybutton flex gap-2">
                        <button
                          type="button"
                          className="Boxreplybutton btn btn-outline mt-5"
                          onClick={() =>
                            goback(
                              item.job_owner,
                              item.id,
                              item.job_applied,
                              userData?.data.id,
                              item.sender
                            )
                          }
                        >
                          Reply
                        </button>
                        {hide && hide == item?.id && (
                          <>
                            <button
                              type="button"
                              className="Boxreplybutton cancel-QA-btn btn btn-outline mt-5"
                              onClick={() => cancelReply(item.id)}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {userData?.data?.role === ROLES.MEMBER ||
              (userData?.data?.role === ROLES.CREATOR && (
                <>
                  <div
                    className={
                      errors1.newQuestion
                        ? "askQuestionArea error"
                        : "askQuestionArea  "
                    }
                  >
                    <h3 className="text-[000] font-semibold">
                      Have a question?
                    </h3>
                    <p>Questions and answers will be public.</p>
                    <input
                      className="input-style"
                      type="text"
                      disabled={job_applied_id === "False"}
                      placeholder="Ask your question"
                      maxLength={400}
                      value={newQuestion}
                      onChange={(e) => {
                        setNewQuestion(e.target.value);
                        setErrors({ ...errors1, newQuestion: null });
                      }}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          validateSubmit(event);
                        }
                      }}
                    />
                    <span
                      className="limitWordsQuesNewLast flex justify-end"
                      style={{
                        color: newQuestion?.length === 400 && "#D14F4F",
                      }}
                    >
                      {newQuestion?.length ?? 0}/400
                    </span>
                    <div
                      className={
                        errors1.newQuestion
                          ? "question-button-section error"
                          : "question-button-section  "
                      }
                    >
                      {errors1.newQuestion && (
                        <span
                          className="CoverCreator3 flex justify-end"
                          style={{
                            color: "#D14F4F",
                            opacity: errors1.newQuestion ? 1 : 0,
                          }}
                        >
                          {errors1.newQuestion ?? "valid"}
                        </span>
                      )}
                      <button
                        disabled={job_applied_id === "False"}
                        className="saveTaskJobAddEditbtn btn btn-primary"
                        type="button"
                        onClick={validateSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </>
              ))}

            {/* <div className="askQuestionArea">
              <h3>Have a question?</h3>
              <p>Questions and answers will be public.</p>
              <input
                className="AskQuesInputQues"
                type="text"
                placeholder="Ask your question"
              />
              <span className="limitWordsQuesNewLast">0/400</span>
            </div> */}
          </div>
        </>
      )}
    </>
  );
};

export default JobsDetailQuestionAnswer;
