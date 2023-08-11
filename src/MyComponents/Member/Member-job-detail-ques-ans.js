import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Question_DETAILS_RESET } from "../../constants/Question-constant";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import {
  listAllQuestion,
  listAllSearch,
  deletequestion,
  postNewQuestion,
} from "../../redux/actions/Question-action";
import {
  listAllAnswer,
  deleteAnswer,
  listAllAnswersPost,
} from "../../redux/actions/Answer-action";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { useParams } from "react-router-dom";

const Member_job_detail_ques_ans = (props) => {
  const { jobId } = useParams();
  const [demo, setDemo] = useState("0");
  const [reply, setreply] = useState();
  const [search, setsearch] = useState("");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [hide, sethide] = useState("");
  const [hidesearch, sethidesearch] = useState(true);
  const [oldestfirst, setoldestfirst] = useState(false);
  const [hidebox, sethidebox] = useState(false);
  const [hideicon, sethideicon] = useState(false);
  const [orderby, setorderby] = useState("newest");

  // const [  QuestionSearchData   , setQuestionSearchData] = useState();

  const { userData } = useSelector((state) => state.authReducer);

  const { QuestionData, loading: stagesLoading } = useSelector(
    (state) => state.QuestionReducer
  );

  const { AnswerData } = useSelector((state) => state.AnswerReducer);

  const { QuestionSearchData } = useSelector(
    (state) => state.SearchQuestionReducer
  );

  const handleClickfiles = async (event) => {
    // console.log(orderby);
    setoldestfirst((current) => !current);
    if (oldestfirst === true) {
      setorderby("newest");
    } else if (oldestfirst === false) {
      setorderby("oldest");
    }
    await dispatch(
      listAllSearch({ order_by: orderby, status: demo, job_id: jobId })
    );
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

  const { loading } = useSelector((state) => state.loaderReducer);
  const { success } = useSelector((state) => state.QuestionDeleteReducer);
  const { success: successAnswerDelete } = useSelector(
    (state) => state.AnswerDeleteReducer
  );

  const goback = async (job_owner, id, job_applied, user, sender) => {
    sethide(id);
    if (reply) {
      await dispatch(
        listAllAnswersPost({
          answer: reply,
          user: user,
          job_applied,
          job_owner,
          sender,
          question: id,
          type: "question",
        })
      );
      dispatch(listAllAnswer());
      dispatch(listAllQuestion(jobId));
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
      await dispatch(
        listAllSearch({ question: e.target.value, job_id: jobId })
      );
      sethidesearch(false);
    } else {
      sethidesearch(true);
      dispatch(listAllQuestion(jobId));
    }
  };

  useEffect(() => {
    dispatch(listAllQuestion(jobId));
  }, [success, successAnswerDelete]);

  useEffect(() => {
    dispatch(listAllAnswer());
  }, [successAnswerDelete]);

  const deleteHandler = (id) => {
    swal({
      title: "Warning",
      text: "Are you sure you want to delete this question?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletequestion(id));
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
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
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteAnswer(id));
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });
        setIsLoading(true);
      }
    });
  };

  const handleChangeDemo = async (event) => {
    setDemo(event.target.value);
    await dispatch(
      listAllSearch({
        order_by: orderby,
        status: event.target.value,
        job_id: jobId,
      })
    );
    sethidesearch(false);
  };

  /********** Question **********/
  const [newQuestion, setNewQuestion] = useState();
  const [errors1, setErrors] = useState({
    newQuestion: null,
  });

  const validateSubmit = (e) => {
    e.preventDefault();

    const tempErrors = {
      newQuestion: !newQuestion && "Please enter your question.",
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      console.log(
        "..values",
        Object.values(tempErrors).filter((value) => value)
      );
      return;
    }
    newQuestionSubmit(e);
  };
  const newQuestionSubmit = (e) => {
    e.preventDefault();

    if (newQuestion) {
      dispatch(
        postNewQuestion({
          job_applied: props.job_applied_id,
          question: newQuestion,
          user: userData.user.user_id,
        })
      );
      dispatch(listAllQuestion(jobId));
      setNewQuestion("");
    } else {
      swal({
        title: "Error",
        text: "Please enter your question",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 5000,
      });
    }
  };

  const { add_success, error_question } = useSelector(
    (state) => state.PostQuestionReducer
  );

  useEffect(() => {
    if (add_success) {
      swal({
        title: "Successfully Complete",
        text: "Question have been successfully added!",
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 5000,
      });
    }
    if (error_question) {
      swal({
        title: "Error",
        text: "Please try again.",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 5000,
      });
    }
    dispatch(listAllQuestion(jobId));
  }, [add_success]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="marketingAgencyFilesMain">
            <div className="activityDropdownButton">
              <div className="activityDivIcon">
                <input
                  onChange={handlesearch}
                  className="newSearchActInput"
                  type="text"
                  placeholder="Search Activity"
                />
                <img className="newSearchLogo" src="/img/newSearchIcon.png" />
              </div>

              <div className="activitySelectNew">
                <Select
                  className={
                    demo === "" ? "selectinputcolor" : "menuiteminputcolor"
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
              <div className="oldestActivityDiv">
                {oldestfirst && (
                  <>
                    {" "}
                    <img
                      className="activityArrowIcon"
                      src="/img/activityarrow.png"
                    />{" "}
                    <button
                      className="oldestQuesBtn"
                      onClick={handleClickfiles}
                    >
                      Oldest first
                    </button>{" "}
                  </>
                )}
                {!oldestfirst && (
                  <>
                    {" "}
                    <img
                      className="activityArrowIcon"
                      src="/img/activityarrow.png"
                    />{" "}
                    <button
                      className="oldestQuesBtn"
                      onClick={handleClickfiles}
                    >
                      Newest first
                    </button>{" "}
                  </>
                )}
              </div>
            </div>

            {hidesearch && (
              <>
                {" "}
                {QuestionData?.map((item, index) => (
                  <div className="QuesboxFirst">
                    <div className="QuesboxFirstContent">
                      <div className="InlinewillisNameDate_head">
                        <div className="InlinewillisNameDate">
                          <div className="willisNameDate">
                            <div className="willisNameImg willisNameImgq">
                              <img
                                className="willisLogo"
                                src={
                                  item.profile_pic
                                    ? item.profile_pic
                                    : "/img/avataruser.png"
                                }
                                alt=""
                              />
                              <span className="tonnyWillisName">
                                {item.username}
                              </span>
                            </div>
                            <label className="Tonny_Agen_Date">
                              {" "}
                              <span className="dateaq">
                                {moment(item?.created).format("MMMM Do YYYY")}
                              </span>
                              {moment(item?.created).format("h:mm:ss a")}
                            </label>
                          </div>
                        </div>

                        {/* {JSON.stringify(item?.answer_question)} */}
                        <div className="threeDotLogo">
                          <div className="invitecloseA">
                            <img
                              src="/img/imgvisit.png"
                              onClick={() => handleClickicon(item.id)}
                            />
                          </div>

                          {hidebox && hidebox == item?.id && (
                            <>
                              {" "}
                              <div className="VisitProfileQ">
                                <img
                                  className="QProfilemenu"
                                  src="/img/Deleteimg.png"
                                  onClick={() => deletehidebox(item.id)}
                                />
                                <li>
                                  <Link
                                    className="QProfilemenudiv"
                                    to="/profile"
                                  >
                                    <span>
                                      <img
                                        className="QProfilemenu"
                                        src="/img/QProfile.png"
                                      />
                                    </span>
                                    Visit Profile
                                  </Link>
                                </li>
                                {item?.answer_question?.length < 1 && (
                                  <li>
                                    <button
                                      type="button"
                                      className="QProfilemenudiv"
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
                                  </li>
                                )}
                              </div>
                            </>
                          )}
                        </div>

                        {item.id && (
                          <>
                            {" "}
                            <h3 className="firstBoxHeadQues ">
                              {/* {JSON.stringify(AnswerData)} */}
                              {item?.question}
                            </h3>{" "}
                          </>
                        )}
                      </div>
                      {/* {JSON.stringify(item?.answer_question)} */}
                      <div className="InlinewillisNameDate_Q_A aaaaa">
                        {item?.answer_question?.map((value, index) => (
                          <>
                            <div className="firstBoxHeadQuesans ">
                              <div className="quesAnsdivMainInline">
                                <div className="quesAnsdiv">
                                  <div
                                    className="willisNameImg willisNameImgQA"
                                    id={`quesId-${item.id}`}
                                  >
                                    <img
                                      className="willisLogo"
                                      src={
                                        value.user_profile_pic
                                          ? value.user_profile_pic
                                          : "/img/avataruser.png"
                                      }
                                      alt=""
                                    />
                                    <span className="tonnyWillisName">
                                      {value.username}
                                    </span>
                                  </div>
                                  <label className="Tonny_Agen_Date">
                                    {" "}
                                    <span className="dateaq">
                                      {" "}
                                      {moment(value?.created).format(
                                        "MMMM Do YYYY"
                                      )}
                                    </span>
                                    {moment(value?.created).format("h:mm:ss a")}
                                  </label>
                                </div>
                              </div>

                              <div className="threeDotLogoQA">
                                <img
                                  src="/img/imgvisit.png"
                                  onClick={() => handleClickanswer(value.id)}
                                />
                                {hideicon && hideicon == value.id && (
                                  <>
                                    {" "}
                                    <div className="VisitProfileQ">
                                      <div className="visitimgclose">
                                        <img
                                          className="QProfilemenu"
                                          src="/img/Deleteimg.png"
                                          onClick={() =>
                                            deletehideicon(item.id)
                                          }
                                        />
                                      </div>
                                      <div className="closevisitP">
                                        <li>
                                          <Link
                                            className="QProfilemenudiv"
                                            to="/profile"
                                          >
                                            <span>
                                              <img
                                                className="QProfilemenu"
                                                src="/img/QProfile.png"
                                              />
                                            </span>
                                            Visit Profile
                                          </Link>
                                        </li>
                                        {!value.agency && (
                                          <li>
                                            <button
                                              className="QProfilemenudiv"
                                              type="button"
                                              onClick={() =>
                                                deleteanswerHandler(value.id)
                                              }
                                            >
                                              <span>
                                                <img
                                                  className="QProfilemenu"
                                                  src="/img/Deleteimg.png"
                                                />
                                              </span>
                                              Delete
                                            </button>
                                          </li>
                                        )}
                                      </div>
                                    </div>{" "}
                                  </>
                                )}
                              </div>
                              <p>{value?.answer} </p>
                            </div>{" "}
                          </>
                        ))}
                      </div>
                      <div className="jobdetailanspage">
                        {hide && hide == item?.id && (
                          <>
                            <textarea
                              className="replytextarea"
                              onChange={(e) => setreply(e.target.value)}
                              maxLength={4000}
                            />
                            <p className="limitans">
                              <span
                                style={{
                                  color: reply?.length === 4000 && "#D14F4F",
                                }}
                              >
                                {reply?.length ?? 0}
                                /4000
                              </span>
                            </p>
                          </>
                        )}
                      </div>
                      <div className="firstBoxreplybutton">
                        <button
                          type="button"
                          className="Boxreplybutton"
                          onClick={() =>
                            goback(
                              item.job_owner,
                              item.id,
                              item.job_applied,
                              userData.user.user_id,
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
                              className="Boxreplybutton cancel-QA-btn"
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
                {QuestionSearchData?.map((item, index) => (
                  <div className="QuesboxFirst">
                    <div className="QuesboxFirstContent">
                      <div className="InlinewillisNameDate_head">
                        <div className="InlinewillisNameDate">
                          <div className="willisNameDate">
                            <div className="willisNameImg willisNameImgq">
                              <img
                                className="willisLogo"
                                src={
                                  item.profile_pic
                                    ? item.profile_pic
                                    : "/img/avataruser.png"
                                }
                                alt=""
                              />
                              <span className="tonnyWillisName">
                                {item.username}
                              </span>
                            </div>
                            <label className="Tonny_Agen_Date">
                              {" "}
                              <span className="dateaq">
                                {moment(item?.created).format("MMMM Do YYYY")}
                              </span>
                              {moment(item?.created).format("h:mm:ss a")}
                            </label>
                          </div>
                        </div>

                        {/* {JSON.stringify(item?.answer_question)} */}
                        <div className="threeDotLogo">
                          <div className="invitecloseA">
                            <img
                              src="/img/imgvisit.png"
                              onClick={() => handleClickicon(item.id)}
                            />
                          </div>

                          {hidebox && hidebox == item?.id && (
                            <>
                              {" "}
                              <div className="VisitProfileQ">
                                <img
                                  className="QProfilemenu"
                                  src="/img/Deleteimg.png"
                                  onClick={() => deletehidebox(item.id)}
                                />
                                <li>
                                  <Link
                                    className="QProfilemenudiv"
                                    to="/profile"
                                  >
                                    <span>
                                      <img
                                        className="QProfilemenu"
                                        src="/img/QProfile.png"
                                      />
                                    </span>
                                    Visit Profile
                                  </Link>
                                </li>
                                {item?.answer_question?.length < 1 && (
                                  <li>
                                    <button
                                      type="button"
                                      className="QProfilemenudiv"
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
                                  </li>
                                )}
                              </div>
                            </>
                          )}
                        </div>

                        {item.id && (
                          <>
                            {" "}
                            <h3 className="firstBoxHeadQues ">
                              {/* {JSON.stringify(AnswerData)} */}
                              {item?.question}
                            </h3>{" "}
                          </>
                        )}
                      </div>

                      <div className="InlinewillisNameDate_Q_A aaaaa">
                        {item?.answer_question?.map((value, index) => (
                          <>
                            <div className="firstBoxHeadQuesans ">
                              <div className="quesAnsdivMainInline">
                                <div className="quesAnsdiv">
                                  <div
                                    className="willisNameImg willisNameImgQA"
                                    id={`quesId-${item.id}`}
                                  >
                                    <img
                                      className="willisLogo"
                                      src={
                                        value.user_profile_pic
                                          ? value.user_profile_pic
                                          : "/img/avataruser.png"
                                      }
                                      alt=""
                                    />
                                    <span className="tonnyWillisName">
                                      {value.username}
                                    </span>
                                  </div>
                                  <label className="Tonny_Agen_Date">
                                    {" "}
                                    <span className="dateaq">
                                      {" "}
                                      {moment(value?.created).format(
                                        "MMMM Do YYYY"
                                      )}
                                    </span>
                                    {moment(value?.created).format("h:mm:ss a")}
                                  </label>
                                </div>
                              </div>

                              <div className="threeDotLogoQA">
                                <img
                                  src="/img/imgvisit.png"
                                  onClick={() => handleClickanswer(value.id)}
                                />
                                {hideicon && hideicon == value.id && (
                                  <>
                                    {" "}
                                    <div className="VisitProfileQ">
                                      <div className="visitimgclose">
                                        <img
                                          className="QProfilemenu"
                                          src="/img/Deleteimg.png"
                                          onClick={() =>
                                            deletehideicon(item.id)
                                          }
                                        />
                                      </div>
                                      <div className="closevisitP">
                                        <li>
                                          <Link
                                            className="QProfilemenudiv"
                                            to="/profile"
                                          >
                                            <span>
                                              <img
                                                className="QProfilemenu"
                                                src="/img/QProfile.png"
                                              />
                                            </span>
                                            Visit Profile
                                          </Link>
                                        </li>
                                        {!value.agency && (
                                          <li>
                                            <button
                                              className="QProfilemenudiv"
                                              type="button"
                                              onClick={() =>
                                                deleteanswerHandler(value.id)
                                              }
                                            >
                                              <span>
                                                <img
                                                  className="QProfilemenu"
                                                  src="/img/Deleteimg.png"
                                                />
                                              </span>
                                              Delete
                                            </button>
                                          </li>
                                        )}
                                      </div>
                                    </div>{" "}
                                  </>
                                )}
                              </div>
                              <p>{value?.answer} </p>
                            </div>{" "}
                          </>
                        ))}
                      </div>
                      <div className="jobdetailanspage">
                        {hide && hide == item?.id && (
                          <>
                            <textarea
                              className="replytextarea"
                              onChange={(e) => setreply(e.target.value)}
                              maxLength={4000}
                            />
                            <p className="limitans">
                              <span
                                style={{
                                  color: reply?.length === 4000 && "#D14F4F",
                                }}
                              >
                                {reply?.length ?? 0}
                                /4000
                              </span>
                            </p>
                          </>
                        )}
                      </div>
                      <div className="firstBoxreplybutton">
                        <button
                          type="button"
                          className="Boxreplybutton"
                          onClick={() =>
                            goback(
                              item.job_owner,
                              item.id,
                              item.job_applied,
                              userData.user.user_id,
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
                              className="Boxreplybutton cancel-QA-btn"
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

            <div
              className={
                errors1.newQuestion
                  ? "askQuestionArea error"
                  : "askQuestionArea  "
              }
            >
              <h3>Have a question?</h3>
              <p>Questions and answers will be public.</p>
              <input
                className="AskQuesInputQues"
                type="text"
                disabled={props.job_applied_id == "False"}
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
                className="limitWordsQuesNewLast"
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
                    className="CoverCreator3"
                    style={{
                      color: "#D14F4F",
                      opacity: errors1.newQuestion ? 1 : 0,
                    }}
                  >
                    {errors1.newQuestion ?? "valid"}
                  </span>
                )}
                <button
                  disabled={props.job_applied_id == "False"}
                  className="saveTaskJobAddEditbtn"
                  type="button"
                  onClick={validateSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Member_job_detail_ques_ans;
