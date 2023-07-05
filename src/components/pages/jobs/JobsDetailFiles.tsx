import { CollectionsOutlined, Delete } from '@mui/icons-material';
import Editor from 'Editor/Editor';
import LoadingSpinner from 'components/common/loadingSpinner/Loader';
import { ROLES } from 'helper/config';
import { API_URL } from 'helper/env';
import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { useParams } from 'react-router-dom';
import { GET_DETAIL_JOB_DATA } from 'redux/actions/jobs/jobs.actions';
import { POST_ACTIVITY_CHAT } from 'redux/actions/jobs/jobsActivity.actions';
import { GET_JOBS_FILES_DETAIL_DATA } from 'redux/actions/jobs/jobsFiles.action';
import { GET_USER_PROFILE_DATA } from 'redux/reducers/auth/auth.slice';
import { MEMBER_ADMIN_COMPANY_DATA } from 'redux/reducers/companyTab/companyTab.slice';
import { IS_HEADER_COMPANY } from 'redux/reducers/config/app/app.slice';
import { GET_POST_ACTIVITY_CHAT_DATA } from 'redux/reducers/jobs/jobsActivity.slice';
import { GET_JOBS_FILES_DETAILS } from 'redux/reducers/jobs/jobsFiles.slice';
import { JOBS_SUCCESS_MESSAGE } from 'redux/reducers/jobs/jobsList.slice';
import { GET_JOBS_DETAILS } from 'redux/reducers/jobs/jobsList.slice';
import { useAppDispatch, useAppSelector } from 'redux/store';

const thumb = {
  borderRadius: 2,
  marginBottom: 8,
  marginRight: 8,
  fontSize: '13px'
};

const thumbInner = {
  // display: "flex",
  minWidth: 0,
  overflow: 'hidden'
};

const thumbsContainer = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const JobsDetailFiles = () => {
  const dispatch = useAppDispatch();
  const { jobId } = useParams();

  const job_detail_success = useAppSelector(JOBS_SUCCESS_MESSAGE);
  const jobDetails = useAppSelector(GET_JOBS_DETAILS);

  const ActivityFilesList = useAppSelector(GET_JOBS_FILES_DETAILS);

  const postActivity = useAppSelector(GET_POST_ACTIVITY_CHAT_DATA);
  const userData = useAppSelector(GET_USER_PROFILE_DATA);
  const headerCompany = useAppSelector(IS_HEADER_COMPANY);
  const inVitedUserCompanyList = useAppSelector(MEMBER_ADMIN_COMPANY_DATA);

  useEffect(() => {
    // dispatch({ type: POST_ACTIVITY_CHAT_RESET });
    dispatch(
      GET_JOBS_FILES_DETAIL_DATA(
        userData?.data?.role === ROLES.ADMIN
          ? `${API_URL.JOBS.ADMIN_JOBS_ATTACHMENTS}`
          : userData?.data?.role === ROLES.CREATOR
          ? `${API_URL.JOBS.CREATOR_JOBS_FILES_ATTACHMENTS}`
          : userData?.data?.role === ROLES.MEMBER
          ? `${API_URL.JOBS.MEMBER_JOB_ATTACHMENTS}`
          : `${API_URL.JOBS.JOBS_FILES}`,
        jobId,
        headerCompany
      )
    );
    // TODO: Pass success here and reset
    // return () => {};
  }, [postActivity?.success, inVitedUserCompanyList]);

  const [jobDocuments, setJobDocuments] = useState([]);
  const [jobDocumentsThumbs, setJobDocumentsThumbs] = useState([]);
  const [jobSampleDocuments, setJobSampleDocuments] = useState([]);
  const [jobSampleDocumentsThumbs, setJobSampleDocumentsThumbs] = useState([]);
  const [jobDocumentsIsVideo, setJobDocumentsIsVideo] = useState([]);
  const [jobDocumentsIsVideoThumbs, setJobDocumentsIsVideothumbs] = useState([]);
  const [jobSampleDocumentsIsVideo, setJobSampleDocumentsIsVideo] = useState([]);
  const [jobSampleDocumentsIsVideothumbs, setJobSampleDocumentsIsVideothumbs] = useState([]);

  const [attachfiles, setAttachfiles] = useState([]);

  const [errors, setErrors] = useState({ attachfiles: null });

  useEffect(() => {
    setAttachfiles([]);
  }, [postActivity?.success]);

  useEffect(() => {
    dispatch(GET_DETAIL_JOB_DATA(jobId));
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
      if (jobDetails?.details?.images.length > 0) {
        for (let i = 0; i < jobDetails?.details?.images.length; i++) {
          if (jobDetails?.details?.images[i].is_video == false) {
            arrJobDocuments.push(jobDetails?.details?.images[i].job_images);
            arrJobDocumentsThumbs.push(jobDetails?.details?.images[i].job_images_thumbnail);
            arrJobSampleDocuments.push(jobDetails?.details?.images[i].work_sample_images);
            arrJobSampleDocumentsThumbs.push(jobDetails?.details?.images[i].work_sample_thumbnail);
            setJobDocuments(arrJobDocuments.filter(x => x !== null));
            setJobDocumentsThumbs(arrJobDocumentsThumbs.filter(x => x !== null));
            setJobSampleDocuments(arrJobSampleDocuments.filter(x => x !== null));
            setJobSampleDocumentsThumbs(arrJobSampleDocumentsThumbs.filter(x => x !== null));
          } else {
            arrJobDocumentsIs_video.push(jobDetails?.details?.images[i].job_images);
            arrJobDocumentsIs_videothumb.push(jobDetails?.details?.images[i].job_images_thumbnail);
            arrJobSampleDocumentsIs_Video.push(jobDetails?.details?.images[i].work_sample_images);
            arrJobSampleDocumentsIs_Videothumb.push(jobDetails?.details?.images[i].work_sample_thumbnail);
            setJobDocumentsIsVideo(arrJobDocumentsIs_video.filter(x => x !== null));
            setJobDocumentsIsVideothumbs(arrJobDocumentsIs_videothumb.filter(x => x !== null));
            setJobSampleDocumentsIsVideo(arrJobSampleDocumentsIs_Video.filter(x => x !== null));
            setJobSampleDocumentsIsVideothumbs(arrJobSampleDocumentsIs_Videothumb.filter(x => x !== null));
          }
        }
      }

      // setJobDocuments(jobDetails?.details?.images);
    }
  }, [job_detail_success]);

  const handlePostChat = e => {
    e.preventDefault();

    const tempErrors = {
      attachfiles: attachfiles.length == 0 && 'Please attach a file'
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter(value => value).length) {
      // console.log(
      //   "..values",
      //   Object.values(tempErrors).filter((value) => value)
      // );
      return;
    }

    const formData = new FormData();

    formData.append('job', jobId);
    formData.append('activity_status', '1');
    formData.append('activity_job_chat[0]sender', JSON.stringify(userData?.data?.id));

    // if (chatbox) {
    //   formData.append("activity_job_chat[0]messages", chatbox);
    // }

    if (attachfiles && attachfiles.length > 0) {
      for (const key of Object.keys(attachfiles)) {
        formData.append('chat_attachments', attachfiles[key]);
      }
    }

    // setIsLoading(true);
    dispatch(POST_ACTIVITY_CHAT(formData));
  };

  const onDrop = useCallback(
    acceptedFiles => {
      setAttachfiles([
        ...attachfiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            title: file.name
          })
        )
      ]);
      setErrors({ ...errors, attachfiles: null });
    },
    [attachfiles]
  );

  const { getRootProps, getInputProps, acceptedFiles, fileRejections, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        'image/jpeg': [],
        'image/png': [],
        'image/svg+xml': [],
        'image/gif': [],
        'video/mp4': [],
        'audio/mpeg': [],
        'video/quicktime': []
      },
      onDrop
    });

  const removeFile = file => () => {
    const newFiles = [...attachfiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setAttachfiles(newFiles);
  };

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    // <div className="mapDataDiv" key={file.path}>
    <div className="mapDataDiv">
      <ul className="mapDataDiv2">
        {errors.map(e => (
          <div className="mapDataDiv3" key={e.code}>
            {e.message}
          </div>
        ))}
      </ul>
    </div>
  ));

  const videoStyle = {
    display: 'block',
    width: '100%',
    Position: 'relative'
  };
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

  const thumbs = attachfiles.map(file => (
    <div style={thumb} key={file.id}>
      <div style={thumbInner} className='flex'>
        <div className="flex gap-2">
          <CollectionsOutlined />
          {file.title}
        </div>
        <button onClick={removeFile(file)} className="remove_button_delet">
          {' '}
          <Delete />
        </button>
      </div>
    </div>
  ));
  const [textEditor, SetTextEditor] = useState(``);
  const [commentCacheStore, setCommentCacheStore] = useState([]);

  // Text editor
  const onchangeHandler = (_editorState, editor) => {
    _editorState.read(() => {
      const editorState = editor.getEditorState();
      const jsonString = JSON.stringify(editorState);
      SetTextEditor(jsonString);
    });
  };
  console.log('Editor', textEditor, commentCacheStore);
  return (
    <>
      {ActivityFilesList?.loading || jobDetails?.loading || postActivity?.loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="Marketingcamaign">
            <h4 className="ProvidedTitle text-lg text-[#000] font-bold  py-5">Job Attachments</h4>
            <Editor
              initialValue={textEditor}
              onChange={onchangeHandler}
              commentCacheStore={commentCacheStore}
              setCommentCacheStore={setCommentCacheStore}
            />
            <div className="mediaimgfile1 media_file_contnet mediaimgfile1NoMargin px-5">
              {ActivityFilesList?.data?.final_approved_data?.length > 0 && (
                <>
                  <div className="job_media_list_section my-2">
                    <h5 className="headingJobDetailsFiles">Final Approved Assets</h5>
                    <div className="flex gap-2">
                      {ActivityFilesList?.data?.final_approved_data?.map((item, index) => (
                        <div className="agencyjobimgupload" key={index}>
                          {' '}
                          <a
                            tabIndex={index}
                            // index_item={index}
                            target="_blank"
                            href={`${item?.work_attachments}`}
                          >
                            <div className="agencyjobimguploaddiv p-2 h-full mr-1 overflow-hidden w-full" key={index}>
                              <img
                                className="rounded-3xl object-cover object-center h-[120px]"
                                src={item?.work_attachments}
                                alt=""
                              />
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {ActivityFilesList?.data?.approved_job_work_attachments?.length < 0 && (
                <>
                  <div className="job_media_list_section my-2">
                    <h5 className="headingJobDetailsFiles">Accepted Files and Assets</h5>
                    <div className="flex gap-2">
                      {ActivityFilesList?.data?.approved_job_work_attachments?.map((item, index) => (
                        <div className="agencyjobimgupload" key={index}>
                          <a
                            tabIndex={index}
                            // index_item={index}
                            target="_blank"
                            href={`${item?.chat_attachment}`}
                          >
                            <div className="agencyjobimguploaddiv p-2 h-full mr-1 overflow-hidden w-full" key={index}>
                              <img
                                className="rounded-3xl object-cover object-center h-[120px]"
                                src={item?.chat_attachment}
                                alt=""
                              />
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {ActivityFilesList?.data?.rejected_job_work_attachments?.length > 0 && (
                <>
                  <div className="job_media_list_section my-2">
                    <h5 className="headingJobDetailsFiles text-base text-[#000] font-bold my-2">
                      Rejected Files and Assets
                    </h5>
                    <div className="flex gap-2">
                      {ActivityFilesList?.data?.rejected_job_work_attachments?.map((item, index) => (
                        <div className="agencyjobimgupload" key={index}>
                          <a
                            // index_item={index}
                            tabIndex={index}
                            target="_blank"
                            href={`${item?.work_attachment}`}
                          >
                            <div className="agencyjobimguploaddiv p-2 h-full mr-1 overflow-hidden w-full" key={index}>
                              <img
                                className="rounded-3xl object-cover object-center h-[120px]"
                                src={item?.work_attachment}
                                alt=""
                              />
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {ActivityFilesList?.data?.job_applied_attachments?.length > 0 && (
                <>
                  <div className="job_media_list_section my-2">
                    <h5 className="headingJobDetailsFiles text-base text-[#000] font-bold my-2">
                      Job Applied Files and Assets
                    </h5>
                    <div className="flex gap-2">
                      {ActivityFilesList?.data?.job_applied_attachments?.map((item, index) => (
                        <div className="agencyjobimgupload" key={index}>
                          <a
                            // index_item={index}
                            tabIndex={index}
                            target="_blank"
                            href={`${item?.job_applied_attachments}`}
                          >
                            <div className="agencyjobimguploaddiv p-2 h-full mr-1 overflow-hidden w-full" key={index}>
                              <img
                                className="rounded-3xl object-cover object-center  h-[120px]"
                                src={item?.job_applied_attachments}
                                alt=""
                              />
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {(jobDocuments?.length > 0 || jobDocumentsIsVideo?.length > 0) && (
                <>
                  <div className="job_media_list_section my-2">
                    <h5 className="headingJobDetailsFiles">Files and Assets</h5>
                    <div className="flex gap-2">
                      {jobDocuments?.map((item, index) => (
                        <div className="agencyjobimgupload" key={index}>
                          <a
                            tabIndex={index}
                            // index_item={index}
                            target="_blank"
                            href={`${item}`}
                          >
                            <div className="agencyjobimguploaddiv p-2 h-full mr-1 overflow-hidden w-full" key={index}>
                              <img
                                className="rounded-3xl object-cover object-center h-[120px]"
                                src={`${jobDocumentsThumbs[index]}`}
                                alt=""
                              />
                            </div>
                          </a>
                        </div>
                      ))}
                      {jobDocumentsIsVideo?.map((item, index) => (
                        <div className="agencyjobimgupload" key={index}>
                          <a
                            tabIndex={index}
                            //   index_item={index}
                            target="_blank"
                            href={`${item}`}
                          >
                            <div className="agencyjobimguploaddiv" key={index}>
                              <video className="videoIsvideoShow addvideoShowSeconddiv12" controls>
                                <source src={`${jobDocumentsIsVideoThumbs[index]}`} type="video/mp4" />
                              </video>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {(jobSampleDocuments?.length > 0 || jobSampleDocumentsIsVideo?.length > 0) && (
                <>
                  <div className="job_media_list_section my-2">
                    <h5 className="headingJobDetailsFiles">Sample Files</h5>
                    <div className="flex gap-2">
                      {jobSampleDocuments?.map((item, index) => (
                        <div className="agencyjobimgupload" key={index}>
                          <a
                            tabIndex={index}
                            //  index_item={index}
                            target="_blank"
                            href={`${item}`}
                          >
                            <div className="agencyjobimguploaddiv p-2 h-full mr-1 overflow-hidden w-full" key={index}>
                              <img
                                className="rounded-3xl object-cover object-center h-[120px]"
                                src={`${jobSampleDocumentsThumbs[index]}`}
                                alt=""
                              />
                            </div>
                          </a>
                        </div>
                      ))}
                      {jobSampleDocumentsIsVideo?.map((item, index) => (
                        <div className="agencyjobimgupload" key={index}>
                          <a
                            tabIndex={index}
                            // index_item={index}
                            target="_blank"
                            href={`${item}`}
                          >
                            <div className="agencyjobimguploaddiv" key={index}>
                              <video className="videoIsvideoShow addvideoShowSeconddiv12" controls>
                                <source src={`${jobSampleDocumentsIsVideothumbs[index]}`} />
                              </video>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {ActivityFilesList?.data?.job_activity_attachments?.length > 0 && (
                <>
                  <div className="job_media_list_section my-2">
                    <h5 className="headingJobDetailsFiles text-base text-[#000] font-bold my-2">
                      Job Activity Files and Assets
                    </h5>
                    <div className="flex gap-2">
                      {ActivityFilesList?.data?.job_activity_attachments?.map((item, index) =>
                        item?.video == 'False' ? (
                          <div className="agencyjobimgupload" key={index}>
                            <a
                              tabIndex={index}
                              //   index_item={index}
                              target="_blank"
                              href={`${item?.chat_attachment}`}
                            >
                              <div className="agencyjobimguploaddiv p-2 h-full mr-1 overflow-hidden w-full" key={index}>
                                <img
                                  className="rounded-3xl object-cover object-center h-[120px]"
                                  src={item?.chat_attachment}
                                  alt=""
                                />
                              </div>
                            </a>
                          </div>
                        ) : (
                          <div className="agencyjobimgupload" key={index}>
                            <a
                              tabIndex={index}
                              //   index_item={index}
                              target="_blank"
                              href={`${item?.chat_attachment}`}
                            >
                              <div className="agencyjobimguploaddiv" key={index}>
                                <video className="videoIsvideoShow addvideoShowSeconddiv123" controls>
                                  <source src={item?.chat_attachment} type="video/mp4" />
                                </video>
                              </div>
                            </a>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}

              {jobDocuments?.length < 1 && jobSampleDocuments?.length < 1 && ActivityFilesList?.data?.length < 1 && (
                <div className="mediaimgfile1 no_media_found mediaimgfile1NoMargin">No attached media found</div>
              )}
            </div>

            <div className="attachAssertspopDivfirst">
              <aside className="flex-row flex-wrap mt-4">{thumbs}</aside>
              {fileRejectionItems?.length > 0 && (
                <>
                  <ul className="errorData_drop_zone">{fileRejectionItems}</ul>
                </>
              )}
            </div>

            {userData?.data?.role !== ROLES.CREATOR && userData?.data?.role !== ROLES.MEMBER && (
              <>
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

                  <div className="textareacommentsjobDetails text-base w-[690px] tracking-normal">
                    Do you want to attach a file? (The file will be displayed on Activity feed)
                  </div>

                  <div className="drop_maindiv flex gap-2 my-2">
                    <span {...getRootProps()}>
                      <input {...getInputProps()} />

                      <button className="AttachButtonLimitFinal btn btn-outline">Attach File</button>
                    </span>
                    <button className="sendButtonLimitFinal btn btn-primary" onClick={e => handlePostChat(e)}>
                      Send
                    </button>
                  </div>
                </div>
                <span
                  style={{
                    color: '#D14F4F',
                    opacity: errors.attachfiles ? 1 : 0
                  }}
                >
                  {errors.attachfiles ?? 'valid'}
                </span>
              </>
            )}
          </div>
          {userData?.data?.role === ROLES.MEMBER && jobDocuments?.length < 1 && jobSampleDocuments?.length < 1 && (
            <div className="mediaimgfile1 no_media_found">No attached media found</div>
          )}
        </>
      )}
    </>
  );
};

export default JobsDetailFiles;
