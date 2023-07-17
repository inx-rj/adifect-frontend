import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

import LoadingSpinner from "../../containers/LoadingSpinner";

import { getJobDetails } from "../../redux/actions/job-actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getActivityFilesList } from "../../redux/actions/file-actions";
import { postActivityChat } from "../../redux/actions/activity-actions";
import { POST_ACTIVITY_CHAT_RESET } from "../../constants/activity-constants";
import Editor from "../../Editor/Editor";

const thumb = {
  borderRadius: 2,
  marginBottom: 8,
  marginRight: 8,
  fontSize: "13px",
};

const thumbInner = {
  // display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const thumbsContainer = {
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

export default function Agency_job_detail_files() {
  const dispatch = useDispatch();
  const { jobId } = useParams();

  const {
    success: job_detail_success,
    jobDetails,
    loading: loadingJobDetails,
  } = useSelector((state) => state.jobDetailsReducer);

  const { ActivityFilesList, loading: loadingActivityFilesList } = useSelector(
    (state) => state.getActivityFilesListReducer
  );

  const { success: successPost, loading: postActivityLoading } = useSelector(
    (state) => state.postActivityReducer
  );

  const { userData } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch({ type: POST_ACTIVITY_CHAT_RESET });
    dispatch(getActivityFilesList(jobId));
    // TODO: Pass success here and reset
    // return () => {};
  }, [successPost]);

  const [jobDocuments, setJobDocuments] = useState([]);
  const [jobDocumentsThumbs, setJobDocumentsThumbs] = useState([]);
  const [jobSampleDocuments, setJobSampleDocuments] = useState([]);
  const [jobSampleDocumentsThumbs, setJobSampleDocumentsThumbs] = useState([]);
  const [jobDocumentsIsVideo, setJobDocumentsIsVideo] = useState([]);
  const [textEditor, SetTextEditor] = useState(``);
  const [commentCacheStore, setCommentCacheStore] = useState([]);
  const [jobDocumentsIsVideoThumbs, setJobDocumentsIsVideothumbs] = useState(
    []
  );
  const [jobSampleDocumentsIsVideo, setJobSampleDocumentsIsVideo] = useState(
    []
  );
  const [jobSampleDocumentsIsVideothumbs, setJobSampleDocumentsIsVideothumbs] =
    useState([]);

  const [attachfiles, setAttachfiles] = useState([]);

  const [errors, setErrors] = useState({ attachfiles: null });

  useEffect(() => {
    setAttachfiles([]);
  }, [successPost]);

  useEffect(() => {
    dispatch(getJobDetails(jobId));
  }, [job_detail_success]);

  useEffect(() => {
    if (job_detail_success) {
      let arrJobDocuments = [];
      let arrJobDocumentsThumbs = [];
      let arrJobDocumentsIs_video = [];
      let arrJobDocumentsIs_videothumb = [];
      let arrJobSampleDocuments = [];
      let arrJobSampleDocumentsThumbs = [];
      let arrJobSampleDocumentsIs_Video = [];
      let arrJobSampleDocumentsIs_Videothumb = [];
      if (jobDetails.images.length > 0) {
        for (let i = 0; i < jobDetails.images.length; i++) {
          if (jobDetails.images[i].is_video == false) {
            arrJobDocuments.push(jobDetails.images[i].job_images);
            arrJobDocumentsThumbs.push(
              jobDetails.images[i].job_images_thumbnail
            );
            arrJobSampleDocuments.push(jobDetails.images[i].work_sample_images);
            arrJobSampleDocumentsThumbs.push(
              jobDetails.images[i].work_sample_thumbnail
            );
            setJobDocuments(arrJobDocuments.filter((x) => x !== null));
            setJobDocumentsThumbs(
              arrJobDocumentsThumbs.filter((x) => x !== null)
            );
            setJobSampleDocuments(
              arrJobSampleDocuments.filter((x) => x !== null)
            );
            setJobSampleDocumentsThumbs(
              arrJobSampleDocumentsThumbs.filter((x) => x !== null)
            );
          } else {
            arrJobDocumentsIs_video.push(jobDetails.images[i].job_images);
            arrJobDocumentsIs_videothumb.push(
              jobDetails.images[i].job_images_thumbnail
            );
            arrJobSampleDocumentsIs_Video.push(
              jobDetails.images[i].work_sample_images
            );
            arrJobSampleDocumentsIs_Videothumb.push(
              jobDetails.images[i].work_sample_thumbnail
            );
            setJobDocumentsIsVideo(
              arrJobDocumentsIs_video.filter((x) => x !== null)
            );
            setJobDocumentsIsVideothumbs(
              arrJobDocumentsIs_videothumb.filter((x) => x !== null)
            );
            setJobSampleDocumentsIsVideo(
              arrJobSampleDocumentsIs_Video.filter((x) => x !== null)
            );
            setJobSampleDocumentsIsVideothumbs(
              arrJobSampleDocumentsIs_Videothumb.filter((x) => x !== null)
            );
          }
        }
      }

      // setJobDocuments(jobDetails.images);
    }
  }, [job_detail_success]);

  const handlePostChat = (e) => {
    e.preventDefault();

    const tempErrors = {
      attachfiles: attachfiles.length == 0 && "Please attach a file",
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }

    const formData = new FormData();

    formData.append("job", jobId);
    formData.append("activity_status", 1);
    formData.append("activity_job_chat[0]sender", userData?.user?.user_id);

    // if (chatbox) {
    //   formData.append("activity_job_chat[0]messages", chatbox);
    // }

    if (attachfiles && attachfiles.length > 0) {
      for (const key of Object.keys(attachfiles)) {
        formData.append("chat_attachments", attachfiles[key]);
      }
    }

    // setIsLoading(true);
    dispatch(postActivityChat(formData));
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setAttachfiles([
        ...attachfiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            title: file.name,
          })
        ),
      ]);
      setErrors({ ...errors, attachfiles: null });
    },
    [attachfiles]
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
      "image/png": [],
      "image/svg+xml": [],
      "image/gif": [],
      "video/mp4": [],
      "audio/mpeg": [],
      "video/quicktime": [],
    },
    onDrop,
  });

  const removeFile = (file) => () => {
    const newFiles = [...attachfiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setAttachfiles(newFiles);
  };

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

  const videoStyle = {
    display: "block",
    width: "100%",
    Position: "relative",
  };
  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const thumbs = attachfiles.map((file) => (
    <div style={thumb} key={file.id}>
      <div style={thumbInner}>
        <img className="attachAssertspopImage" src="/img/assertgallery.png" />
        {file.title}
        <button onClick={removeFile(file)} className="remove_button_delet">
          {" "}
          <img className="attachAssertspopDeleteI1" src="/img/deleterc.png" />
        </button>
      </div>
    </div>
  ));

  const onchangeHandler = (_editorState, editor) => {
    _editorState.read(() => {
      const editorState = editor.getEditorState();
      const jsonString = JSON.stringify(editorState);
      SetTextEditor(jsonString);
    });
  };
  console.log("Editor", textEditor, commentCacheStore);
  return (
    <>
      {loadingActivityFilesList || loadingJobDetails || postActivityLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="Marketingcamaign">
            <h4 className="ProvidedTitle">Job Attachments</h4>
            <Editor
              initialValue={textEditor}
              onChange={onchangeHandler}
              commentCacheStore={commentCacheStore}
              setCommentCacheStore={setCommentCacheStore}
            />
            <div className="mediaimgfile1 media_file_contnet mediaimgfile1NoMargin">
              {ActivityFilesList?.final_approved_data?.length > 0 && (
                <>
                  <div className="job_media_list_section">
                    <h5 className="headingJobDetailsFiles">
                      Final Approved Assets
                    </h5>
                    {ActivityFilesList?.final_approved_data?.map(
                      (item, index) => (
                        <div className="agencyjobimgupload" key={index}>
                          <a
                            index_item={index}
                            target="_blank"
                            href={`${item?.work_attachments}`}
                          >
                            <li className="agencyjobimguploaddiv" key={index}>
                              <img
                                className=""
                                src={item?.work_attachments}
                                alt=""
                              />
                            </li>
                          </a>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              {ActivityFilesList?.approved_job_work_attachments?.length < 0 && (
                <>
                  <div className="job_media_list_section">
                    <h5 className="headingJobDetailsFiles">
                      Accepted Files and Assets
                    </h5>
                    {ActivityFilesList?.approved_job_work_attachments?.map(
                      (item, index) => (
                        <div className="agencyjobimgupload" key={index}>
                          <a
                            index_item={index}
                            target="_blank"
                            href={`${item?.chat_attachment}`}
                          >
                            <li className="agencyjobimguploaddiv" key={index}>
                              <img
                                className=""
                                src={item?.chat_attachment}
                                alt=""
                              />
                            </li>
                          </a>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              {ActivityFilesList?.rejected_job_work_attachments?.length > 0 && (
                <>
                  <div className="job_media_list_section">
                    <h5 className="headingJobDetailsFiles">
                      Rejected Files and Assets
                    </h5>
                    {ActivityFilesList?.rejected_job_work_attachments?.map(
                      (item, index) => (
                        <div className="agencyjobimgupload" key={index}>
                          <a
                            index_item={index}
                            target="_blank"
                            href={`${item?.work_attachment}`}
                          >
                            <li className="agencyjobimguploaddiv" key={index}>
                              <img
                                className=""
                                src={item?.work_attachment}
                                alt=""
                              />
                            </li>
                          </a>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              {ActivityFilesList?.job_applied_attachments?.length > 0 && (
                <>
                  <div className="job_media_list_section">
                    <h5 className="headingJobDetailsFiles">
                      Job Applied Files and Assets
                    </h5>
                    {ActivityFilesList?.job_applied_attachments?.map(
                      (item, index) => (
                        <div className="agencyjobimgupload" key={index}>
                          <a
                            index_item={index}
                            target="_blank"
                            href={`${item?.job_applied_attachments}`}
                          >
                            <li className="agencyjobimguploaddiv" key={index}>
                              <img
                                className=""
                                src={item?.job_applied_attachments}
                                alt=""
                              />
                            </li>
                          </a>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              {(jobDocuments?.length > 0 ||
                jobDocumentsIsVideo?.length > 0) && (
                <>
                  <div className="job_media_list_section">
                    <h5 className="headingJobDetailsFiles">Files and Assets</h5>
                    {jobDocuments?.map((item, index) => (
                      <div className="agencyjobimgupload" key={index}>
                        <a index_item={index} target="_blank" href={`${item}`}>
                          <li className="agencyjobimguploaddiv" key={index}>
                            <img
                              className=""
                              src={`${jobDocumentsThumbs[index]}`}
                              alt=""
                            />
                          </li>
                        </a>
                      </div>
                    ))}
                    {jobDocumentsIsVideo?.map((item, index) => (
                      <div className="agencyjobimgupload" key={index}>
                        <a index_item={index} target="_blank" href={`${item}`}>
                          <li className="agencyjobimguploaddiv" key={index}>
                            <video
                              className="videoIsvideoShow addvideoShowSeconddiv12"
                              controls
                            >
                              <source
                                src={`${jobDocumentsIsVideoThumbs[index]}`}
                                type="video/mp4"
                              />
                            </video>
                          </li>
                        </a>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {(jobSampleDocuments?.length > 0 ||
                jobSampleDocumentsIsVideo?.length > 0) && (
                <>
                  <div className="job_media_list_section">
                    <h5 className="headingJobDetailsFiles">Sample Files</h5>
                    {jobSampleDocuments?.map((item, index) => (
                      <div className="agencyjobimgupload" key={index}>
                        <a index_item={index} target="_blank" href={`${item}`}>
                          <li className="agencyjobimguploaddiv" key={index}>
                            <img
                              className=""
                              src={`${jobSampleDocumentsThumbs[index]}`}
                              alt=""
                            />
                          </li>
                        </a>
                      </div>
                    ))}
                    {jobSampleDocumentsIsVideo?.map((item, index) => (
                      <div className="agencyjobimgupload" key={index}>
                        <a index_item={index} target="_blank" href={`${item}`}>
                          <li className="agencyjobimguploaddiv" key={index}>
                            <video
                              className="videoIsvideoShow addvideoShowSeconddiv12"
                              controls
                            >
                              <source
                                src={`${jobSampleDocumentsIsVideothumbs[index]}`}
                              />
                            </video>
                          </li>
                        </a>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {ActivityFilesList?.job_activity_attachments?.length > 0 && (
                <>
                  <div className="job_media_list_section">
                    <h5 className="headingJobDetailsFiles">
                      Job Activity Files and Assets
                    </h5>
                    {ActivityFilesList?.job_activity_attachments?.map(
                      (item, index) =>
                        item?.video == "False" ? (
                          <div className="agencyjobimgupload" key={index}>
                            <a
                              index_item={index}
                              target="_blank"
                              href={`${item?.chat_attachment}`}
                            >
                              <li className="agencyjobimguploaddiv" key={index}>
                                <img
                                  className=""
                                  src={item?.chat_attachment}
                                  alt=""
                                />
                              </li>
                            </a>
                          </div>
                        ) : (
                          <div className="agencyjobimgupload" key={index}>
                            <a
                              index_item={index}
                              target="_blank"
                              href={`${item?.chat_attachment}`}
                            >
                              <li className="agencyjobimguploaddiv" key={index}>
                                <video
                                  className="videoIsvideoShow addvideoShowSeconddiv123"
                                  controls
                                >
                                  <source
                                    src={item?.chat_attachment}
                                    type="video/mp4"
                                  />
                                </video>
                              </li>
                            </a>
                          </div>
                        )
                    )}
                  </div>
                </>
              )}

              {jobDocuments?.length < 1 &&
                jobSampleDocuments?.length < 1 &&
                ActivityFilesList?.length < 1 && (
                  <div className="mediaimgfile1 no_media_found mediaimgfile1NoMargin">
                    No attached media found
                  </div>
                )}
            </div>

            <div className="attachAssertspopDivfirst">
              <aside style={thumbsContainer}>{thumbs}</aside>
              {fileRejectionItems?.length > 0 && (
                <>
                  <ul className="errorData_drop_zone">{fileRejectionItems}</ul>
                </>
              )}
            </div>

            <div className="sendButtontextArea">
              {/* <div className="attachAssertspopDivfirst">
                <aside style={thumbsContainer}>{thumbs}</aside>
                {fileRejectionItems?.length > 0 && (
                  <>
                    <ul className="errorData_drop_zone">
                      {fileRejectionItems}
                    </ul>
                  </>
                )}
              </div> */}
              {/* <div className="textareacommentsjobDetails">
               <textarea
                  value={chatbox}
                  onChange={(e) => {
                    setChatbox(e.target.value);
                    setErrors({ ...errors, attachfiles: null });
                  }}
                  id="storynew"
                  name="story"
                  rows="5"
                  cols="33"
                  maxLength={4000}
                ></textarea>
                <span
                  style={{ color: chatbox?.length >= 4000 && "#D14F4F" }}
                  className="limitWordsNew"
                >
                  {chatbox?.length}/4000
                </span>
              </div> */}

              <div className="textareacommentsjobDetails">
                Do you want to attach a file? (The file will be displayed on
                Activity feed)
              </div>

              <div className="drop_maindiv">
                <span {...getRootProps()}>
                  <input {...getInputProps()} />

                  <button className="AttachButtonLimitFinal">
                    Attach File
                  </button>
                </span>
                <button
                  style={{ marginTop: "5px" }}
                  className="sendButtonLimitFinal mx-2"
                  onClick={(e) => handlePostChat(e)}
                >
                  Send
                </button>
              </div>
            </div>
            <span
              style={{
                color: "#D14F4F",
                opacity: errors.attachfiles ? 1 : 0,
              }}
            >
              {errors.attachfiles ?? "valid"}
            </span>
          </div>
        </>
      )}
    </>
  );
}
