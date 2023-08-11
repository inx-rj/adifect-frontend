import React, { useState, useEffect } from "react";

import LoadingSpinner from "../../containers/LoadingSpinner";
import { getJobDetails } from "../../redux/actions/job-actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMemberActivityFilesList } from "../../redux/actions/file-actions";
import { memberAdminCompanyListAction } from "../../redux/actions/Member-Company-List-Action";

export default function Member_job_detail_files() {
  const dispatch = useDispatch();
  const { jobId } = useParams();

  const {
    success: job_detail_success,
    jobDetails,
    loading: loadingJobDetails,
  } = useSelector((state) => state.jobDetailsReducer);

  const { agecyIdCompany, success: successCompanyList } = useSelector(
    (state) => state.memberAdminCompanyListReducer
  );

  const { MemberFilesList, loading: loadingActivityFilesList } = useSelector(
    (state) => state.getMemberActivityFilesListReducer
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
    dispatch(memberAdminCompanyListAction());
  }, []);

  useEffect(() => {
    if (successCompanyList && job_detail_success) {
      dispatch(getMemberActivityFilesList(jobId, agecyIdCompany));
    }
  }, [successCompanyList, job_detail_success]);

  useEffect(() => {
    dispatch(getJobDetails(jobId));
  }, []);

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

  return (
    <>
      {loadingActivityFilesList || loadingJobDetails ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="Marketingcamaign">
            <h5 className="ProvidedTitle">Media</h5>
            <div className="mediaimgfile1 mediafilesmember9 media_file_contnet">
              <div className="job_media_list_section">
                {MemberFilesList?.final_approved_data?.length > 0 && (
                  <h5 className="headingJobDetailsFiles">
                    Final Approved Assets
                  </h5>
                )}
                {MemberFilesList?.final_approved_data?.map((item, index) => (
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
                {MemberFilesList?.approved_job_work_attachments?.length > 0 && (
                  <h5 className="headingJobDetailsFiles">
                    Accepted Files and Assets
                  </h5>
                )}
                {MemberFilesList?.approved_job_work_attachments?.map(
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
                {MemberFilesList?.rejected_job_work_attachments?.length > 0 && (
                  <h5 className="headingJobDetailsFiles">
                    Rejected Files and Assets
                  </h5>
                )}
                {MemberFilesList?.rejected_job_work_attachments?.map(
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
                {MemberFilesList?.job_applied_attachments?.length > 0 && (
                  <h5 className="headingJobDetailsFiles">
                    Job Applied Files and Assets
                  </h5>
                )}
                {MemberFilesList?.job_applied_attachments?.map(
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
                            <video className="videoIsvideoShow addvideoShowSeconddiv" controls>
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
                            <video className="videoIsvideoShow addvideoShowSeconddiv" controls>
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
                {MemberFilesList?.job_activity_attachments?.length > 0 && (
                  <h5 className="headingJobDetailsFiles">
                    Job Activity Files and Assets
                  </h5>
                )}
                {MemberFilesList?.job_activity_attachments?.map(
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

              {jobDocuments?.length < 1 && jobSampleDocuments?.length < 1 && (
                <div className="mediaimgfile1 no_media_found">
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
