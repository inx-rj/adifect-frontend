import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Editor from "Editor/Editor";
import Title from "components/common/pageTitle/Title";
import { Images } from "helper/images";
import React, { useRef, useState } from "react";
import { MEMBER_VIEW_APPROVAL_ACTION } from "redux/actions/jobs/jobsActivity.actions";
import { GET_JOBS_WORK_APPROVAL_DETAILS } from "redux/reducers/jobs/workApproval.slice";
import { useAppDispatch, useAppSelector } from "redux/store";
import swal from "sweetalert";
import { Swiper, SwiperSlide } from "swiper/react";

const ViewApproval = (props) => {
  const refMapData = useRef(null);
  const dispatch = useAppDispatch();
  const workApproval = useAppSelector(GET_JOBS_WORK_APPROVAL_DETAILS);

  const [dataText, setDataText] = useState("");
  const [commentCacheStore, setCommentCacheStore] = useState([]);

  // useEffect(() => {
  //   console.log("111111111111111", workApproval?.data);

  //   refMapData.current = workApproval?.data;
  // }, [workApproval?.data]);

  const onchangeHandler = (_editorState, editor) => {
    _editorState.read(() => {
      const editorState = editor.getEditorState();
      const jsonString = JSON.stringify(editorState);
      setDataText(jsonString);
    });
  };

  const handleApprovalData = (approvalId) => {
    const filterData = workApproval?.data?.filter(
      (item) => item.id === approvalId
    );
    refMapData.current = filterData;
  };

  const handleEditMemeber = (id) => {
    dispatch(MEMBER_VIEW_APPROVAL_ACTION(id, { status: 1, message: dataText }));
    setDataText("");
    props.handleCloseSubmit();
    props.handleCloseMultipleSubmit();
    props.handleCloseMultipleSubmit1();
    swal({
      title: "Successfully Complete",
      text: "Job successfully approved!",
      className: "successAlert",
      icon: Images.Logo,
      buttons: {
        OK: false,
      },
      timer: 3000,
    });
  };

  const handleRejectMemeber = (id) => {
    dispatch(MEMBER_VIEW_APPROVAL_ACTION(id, { status: 2, message: dataText }));
    setDataText("");
    props.setSubmitjobopen(false);
    swal({
      title: "Successfully Complete",
      text: "Job requested for approval!",
      className: "successAlert",
      icon: Images.Logo,
      buttons: {
        OK: false,
      },
      timer: 3000,
    });
  };
  const handleApproveMemeber = (id) => {
    dispatch(MEMBER_VIEW_APPROVAL_ACTION(id, { status: 1, message: dataText }));
    setDataText("");
    props.setSubmitjobopen(false);
    swal({
      title: "Successfully Complete",
      text: "Job successfully approved!",
      className: "successAlert",
      icon: Images.Logo,
      buttons: {
        OK: false,
      },
      timer: 3000,
    });
  };
  return (
    <div>
      {/* -----------------------------Single approval------------------------------ */}
      <Dialog
        className="profileImgDialogagencyApprovel"
        open={props.submitjobopen}
        onClose={props.handleCloseSubmit}
      >
        <>
          <>sdd</>
          {workApproval?.data?.map((imagess, index) => (
            <>
              <DialogTitle className="profileImgHeadingAnew">
                <div className="Ajobshare">
                  <h2>View Job Approval - {props?.jobName}</h2>

                  <span
                    className="closebuttonsec"
                    onClick={props.handleCloseSubmit}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </DialogTitle>

              <DialogContent className="crouselImageContent bg-[#fff]">
                {imagess?.job_work?.job_submit_Work?.length > 0 && (
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={3}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                  >
                    <SwiperSlide>
                      <img
                        className="CarouselImagesSlideShow"
                        src={
                          imagess?.job_work?.job_submit_Work[0]
                            ?.work_attachments
                        }
                        alt="First slide"
                      />
                      <div className="bannerandApprovelTasksD">
                        <span className="BannerAd16_span">
                          {
                            imagess?.job_work?.job_submit_Work[0]
                              ?.work_attachments_name
                          }
                        </span>

                        {/* <p className="approvelForTask">
                              This approval is for task:
                              <span className="DimensionsSpan">
                                {" "}
                                16:9 Dimensions
                              </span>
                            </p> */}
                      </div>
                    </SwiperSlide>
                  </Swiper>
                )}
                {Object.keys(imagess?.job_work?.task_details)?.length > 0 ? (
                  <>
                    <p
                      style={{ marginLeft: "25px" }}
                      className="approvelForTask"
                    >
                      User:
                      <span className="DimensionsSpan">
                        {" "}
                        {imagess?.job_work?.user_details?.user_name}
                        {/* 16:9 Dimensions */}
                      </span>
                    </p>
                    <p
                      style={{ marginLeft: "25px" }}
                      className="approvelForTask"
                    >
                      This approval is for task:
                      <span className="DimensionsSpan">
                        {" "}
                        {imagess?.job_work?.task_details?.title}
                        {/* 16:9 Dimensions */}
                      </span>
                    </p>
                  </>
                ) : (
                  <p style={{ marginLeft: "25px" }} className="approvelForTask">
                    This approval is for task:
                    <span className="DimensionsSpan">
                      {" "}
                      Entire Job
                      {/* 16:9 Dimensions */}
                    </span>
                  </p>
                )}
                <div className="sendButtontextArea">
                  <div className="textareacommentsSlider">
                    <textarea
                      id="storynewSlider input-style"
                      name="story"
                      maxLength={4000}
                      value={dataText}
                      onChange={(e) => setDataText(e.target.value)}
                      rows={5}
                      cols={33}
                    ></textarea>
                    <span
                      style={{
                        color: dataText?.length === 4000 && "#D14F4F",
                      }}
                      className="limitWordsNew"
                    >
                      {dataText?.length}/4000
                    </span>
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <div className="sharebuttonjobcontent">
                  <div className="cancelButtonnewWithSave">
                    <button
                      className="canceButtonnewPop"
                      onClick={() => handleRejectMemeber(imagess.id)}
                      disabled={dataText.length === 0}
                    >
                      Request Edit
                    </button>
                    <button
                      className="shareNewPopPublic"
                      onClick={() => handleApproveMemeber(imagess.id)}
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </DialogActions>
            </>
          ))}
        </>
      </Dialog>
      {/* -----------------------------Single approval------------------------------ */}
      {/* -----------------------------Multiple approvals------------------------------ */}
      <Dialog
        className="multipleDialogActivityApproval"
        open={props.submitjobMultipleopen1}
        onClose={props.handleCloseMultipleSubmit1}
      >
        <DialogTitle>
          <div className="divMultipleDialogApproval flex justify-between">
            <Title title="Select an approval" />

            <span
              className="spanMultipleDialogApproval cursor-pointer"
              onClick={props.handleCloseMultipleSubmit1}
            >
              {/* <i className="fa-solid fa-xmark"></i> */}
              <Close />
            </span>
          </div>
        </DialogTitle>

        <DialogContent>
          {workApproval?.data?.map((imagess, index) => (
            <>
              <ListItem className="cursor-pointer">
                <ListItemAvatar>
                  {imagess?.job_work?.user_details?.user_pic ? (
                    <img
                      style={{ width: "50px" }}
                      src={imagess?.job_work?.user_details?.user_pic}
                    />
                  ) : (
                    <img
                      style={{ width: "50px" }}
                      src={Images.UserAvatar}
                      alt=""
                    />
                  )}
                </ListItemAvatar>
                <ListItemText
                  onClick={() => {
                    props.handleCloseMultipleSubmit1();
                    props.handleOpenMultipleSubmit();
                    handleApprovalData(imagess.id);
                  }}
                >
                  {imagess?.job_work?.user_details?.user_name}{" "}
                  {imagess?.job_work?.task_details?.title
                    ? `('${imagess?.job_work?.task_details?.title}' task)`
                    : `(Entire Job)`}
                  <div>
                    <span className="bg-blue-400/50 rounded-full p-1">
                      Stage - {imagess?.workflow_stage}{" "}
                    </span>
                  </div>
                </ListItemText>
              </ListItem>
            </>
          ))}
        </DialogContent>
      </Dialog>
      <Dialog
        className="profileImgDialogagencyApprovel custom-scrollbar"
        open={props.submitjobMultipleopen}
        onClose={props.handleCloseMultipleSubmit}
      >
        {refMapData.current?.map((imagess, index) => (
          <>
            <DialogTitle className="profileImgHeadingAnew">
              <div className="Ajobshare flex justify-between">
                <Title title={`View Job Approval - ${props?.jobName}`} />

                <span
                  className="closebuttonsec cursor-pointer"
                  onClick={props.handleCloseMultipleSubmit}
                >
                  <Close />
                </span>
              </div>
            </DialogTitle>

            <DialogContent className="crouselImageContent">
              {imagess?.job_work?.job_submit_Work?.length > 0 && (
                <Swiper>
                  <SwiperSlide>
                    <img
                      className="CarouselImagesSlideShow"
                      src={
                        imagess?.job_work?.job_submit_Work[0]?.work_attachments
                      }
                      alt="First slide"
                    />
                    <div className="bannerandApprovelTasksD">
                      <span className="BannerAd16_span">
                        {
                          imagess?.job_work?.job_submit_Work[0]
                            ?.work_attachments_name
                        }
                      </span>
                    </div>
                  </SwiperSlide>
                </Swiper>
              )}
              {Object.keys(imagess?.job_work?.task_details)?.length > 0 ? (
                <>
                  <p className="approvelForTask text-[#474e55] text-sm font-normal">
                    User:
                    <span className="DimensionsSpan font-semibold">
                      {" "}
                      {imagess?.job_work?.user_details?.user_name}
                      {/* 16:9 Dimensions */}
                    </span>
                  </p>
                  <p className="approvelForTask text-[#474e55] text-sm font-normal">
                    This approval is for task:
                    <span className="DimensionsSpan font-semibold">
                      {" "}
                      {imagess?.job_work?.task_details?.title}
                      {/* 16:9 Dimensions */}
                    </span>
                  </p>
                </>
              ) : (
                <p style={{ marginLeft: "25px" }} className="approvelForTask">
                  This approval is for task:
                  <span className="DimensionsSpan">
                    {" "}
                    Entire Job
                    {/* 16:9 Dimensions */}
                  </span>
                </p>
              )}

              <div className="sendButtontextArea min-h-[135px]">
                <div className="textareacommentsSlider">
                  <Editor
                    initialValue={dataText}
                    onChange={onchangeHandler}
                    commentCacheStore={commentCacheStore}
                    setCommentCacheStore={setCommentCacheStore}
                  />
                  <span
                    style={{
                      color: dataText?.length === 4000 && "#D14F4F",
                    }}
                    className="limitWordsNew"
                  >
                    {dataText?.length}/160
                  </span>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <div className="sharebuttonjobcontent">
                <div className="cancelButtonnewWithSave flex gap-2">
                  <button
                    className="canceButtonnewPop btn btn-outline"
                    onClick={() => handleEditMemeber(imagess.id)}
                    // disabled={dataText.length === 0}
                  >
                    Edit
                  </button>
                  <button
                    className="canceButtonnewPop btn btn-outline"
                    onClick={() => handleRejectMemeber(imagess.id)}
                    disabled={dataText.length === 0}
                  >
                    Request Edit
                  </button>
                  <button
                    className="shareNewPopPublic btn btn-primary"
                    onClick={() => handleApproveMemeber(imagess.id)}
                  >
                    Approve
                  </button>
                </div>
              </div>
            </DialogActions>
          </>
        ))}
      </Dialog>
      {/* -----------------------------Multiple approvals------------------------------ */}
    </div>
  );
};

export default ViewApproval;
