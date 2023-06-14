import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";

import { getJobDetails } from "../../redux/actions/job-actions";
import { useDispatch, useSelector } from "react-redux";
import { getCreatorActivityFilesList } from "../../redux/actions/file-actions";
import { JOB_DETAILS_RESET } from "../../constants/job-constants";


export default function Creator_job_detail_files() {
  const { jobId } = useParams();
  const dispatch = useDispatch();

  const {
    success: job_detail_success,
    jobDetails,
    loading: loadingJobDetails,
  } = useSelector((state) => state.jobDetailsReducer);

  const { CreatorFilesList, loading: loadingActivityFilesList } = useSelector(
    (state) => state.getCreatorActivityFilesListReducer
  );

  const [jobDocuments, setJobDocuments] = useState([]);
  const [jobDocumentsThumbs, setJobDocumentsThumbs] = useState([]);
  const [jobSampleDocuments, setJobSampleDocuments] = useState([]);
  const [jobSampleDocumentsThumbs, setJobSampleDocumentsThumbs] = useState([]);
  const [jobDocumentsIsVideo, setJobDocumentsIsVideo] = useState([]);
  const [jobDocumentsIsVideoThumbs, setJobDocumentsIsVideothumbs] = useState(
    []
  );
  const [jobSampleDocumentsIsVideo, setJobSampleDocumentsIsVideo] = useState(
    []
  );
  const [jobSampleDocumentsIsVideothumbs, setJobSampleDocumentsIsVideothumbs] =
    useState([]);

  useEffect(() => {
    dispatch(getCreatorActivityFilesList(jobId));
  }, []);

  useEffect(() => {
    if (jobId) {
      dispatch({ type: JOB_DETAILS_RESET });
      dispatch(getJobDetails(jobId));
      // console.table(jobDetails?.images);
    }
  }, []);

  useEffect(() => {
    if (jobId) {
      setJobDocuments([]);
      setJobDocumentsThumbs([]);
      setJobSampleDocuments([]);
      setJobSampleDocumentsThumbs([]);
      setJobDocumentsIsVideo([]);
      setJobDocumentsIsVideothumbs([]);
      setJobSampleDocumentsIsVideo([]);
      setJobSampleDocumentsIsVideothumbs([]);
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
  }
  }, [job_detail_success]);

  return (
    <>
      {loadingActivityFilesList || loadingJobDetails ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="Marketingcamaign">
            {CreatorFilesList?.final_approved_data?.length > 0 && (
              <h4 className="ProvidedTitle">Media</h4>
            )}
            <div className="mediaimgfile1 media_file_contnet mediaimgfile1NoMargin">
              <div className="job_media_list_section">
                {CreatorFilesList?.final_approved_data?.length > 0 && (
                  <h5 className="headingJobDetailsFiles">
                    Final Approved Assets
                  </h5>
                )}
                {CreatorFilesList?.final_approved_data?.map((item, index) => (
                  <div className="agencyjobimgupload" key={index}>
                    <a
                      index_item={index}
                      target="_blank"
                      href={`${item?.work_attachments}`}
                    >
                      <li className="agencyjobimguploaddiv" key={index}>
                        <img className="" src={item?.work_attachments} alt="" />
                      </li>
                    </a>
                  </div>
                ))}
              </div>

              <div className="job_media_list_section">
                {CreatorFilesList?.approved_job_work_attachments?.length >
                  0 && (
                  <h5 className="headingJobDetailsFiles">
                    Accepted Files and Assets
                  </h5>
                )}
                {CreatorFilesList?.approved_job_work_attachments?.map(
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
              <div className="job_media_list_section">
                {CreatorFilesList?.rejected_job_work_attachments?.length >
                  0 && (
                  <h5 className="headingJobDetailsFiles">
                    Rejected Files and Assets
                  </h5>
                )}
                {CreatorFilesList?.rejected_job_work_attachments?.map(
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

              <div className="job_media_list_section">
                {CreatorFilesList?.job_applied_attachments?.length > 0 && (
                  <h5 className="headingJobDetailsFiles">
                    Job Applied Files and Assets
                  </h5>
                )}
                {CreatorFilesList?.job_applied_attachments?.map(
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

              <div className="job_media_list_section">
                {CreatorFilesList?.job_activity_attachments?.length > 0 && (
                  <h5 className="headingJobDetailsFiles">
                    Job Activity Files and Assets
                  </h5>
                )}
                {CreatorFilesList?.job_activity_attachments?.map(
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

              {jobDocuments?.length < 1 &&
                jobSampleDocuments?.length < 1 &&
                CreatorFilesList?.length < 1 && (
                  <div className="mediaimgfile1 no_media_found mediaimgfile1NoMargin">
                    No attached media found
                  </div>
                )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
