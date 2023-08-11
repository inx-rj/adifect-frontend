import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  listAllProposals,
  rejectJobPropsosal,
  acceptJobProposal,
  proposalsSeen,
} from "../../redux/actions/proposals-action";
import { updateJobStatus } from "../../redux/actions/job-actions";
import moment from "moment";
import swal from "sweetalert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { getJobDetails } from "../../redux/actions/job-actions";

const Agency_job_proposal = (props) => {
  const { jobId } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [dropdown, setDropdown] = useState("");
  const [fullCoverLetter, setFullCoverLetter] = useState(false);

  const { proposalsData, loading: proposalsLoading } = useSelector(
    (state) => state.proposalsListReducer
  );
  const { success: rejectSuccess } = useSelector(
    (state) => state.rejectProposalReducer
  );
  const { success: acceptSuccess } = useSelector(
    (state) => state.acceptProposalReducer
  );
  const { success: updateJobSuccess } = useSelector(
    (state) => state.updateJobStatusReducer
  );
  const {
    loading: jobLoading,
    success,
    jobDetails,
  } = useSelector((state) => state.jobDetailsReducer);

  useEffect(() => {
    dispatch(proposalsSeen(jobId));
  }, []);

  useEffect(() => {
    dispatch(getJobDetails(jobId));
    dispatch(listAllProposals(jobId));
    window.scrollTo(0, 0);
    // }, []);
  }, [rejectSuccess, acceptSuccess, updateJobSuccess]);

  useEffect(() => {
    const handler = () => {
      // setOpen("");
      setAnchorEl(null);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  const handleRejectProposal = (id) => {
    swal({
      title: "",
      text: "Are you sure you want to reject this proposal?",
      className: "noticeAlert",
      icon: "/img/logonew-red.svg",
      buttons: ["No", "Yes"],
      dangerMode: true,
      closeOnClickOutside: false,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(rejectJobPropsosal(id, { status: 1, id: id }));
        swal({
          title: "Successfully Complete",
          text: "Proposal Rejected!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });
      }
    });
  };

  const handleAcceptProposal = (id) => {
    swal({
      title: "",
      text: "Do you want to hire multiple users for the job?",
      className: "noticeAlert",
      icon: "/img/logonew-red.svg",
      buttons: ["No", "Yes"],
      dangerMode: true,
      closeOnClickOutside: false,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(acceptJobProposal(id, { status: 2, id: id }));
        swal({
          title: "Successfully Complete",
          text: "Proposal Accepted!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 4000,
        });
        // props.handleChangeTab("e", "2");
      } else {
        dispatch(updateJobStatus(jobId, 0));
        dispatch(acceptJobProposal(id, { status: 2, id: id }));
        swal({
          title: "Successfully Complete",
          text: "Job closed for more applications!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 4000,
        });
        // props.handleChangeTab(e, "2");
      }
    });
  };

  const handleDateDiff = (firstDate, secondDate) => {
    const date1 = new Date(firstDate);
    const date2 = new Date(secondDate);
    const diffTime = Math.abs(date1 - date2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffDays + " days");
    return diffDays;
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="marketingAgencyFilesMain">
        {jobDetails?.is_active == false && (
          <div className="jobStatusOnProposalPage">Job Closed</div>
        )}
        {proposalsData?.length > 0 &&
          proposalsData?.map((proposal, index1) => (
            <div key={index1} className="rachelSmithContent">
              <div className="tonnyWillisContent">
                <div className="InlinewillisNameDate">
                  <div className="willisNameDate">
                    <div className="willisNameImg">
                      {proposal.profile_img ? (
                        <img
                          className="willisLogo"
                          src={proposal.profile_img}
                          alt="profilepic"
                        />
                      ) : (
                        <img
                          className="willisLogo"
                          src="/img/avataruser.png"
                          alt="profilepic"
                        />
                      )}
                      {/* <img
                        className="willisLogo"
                        src="/img/tonnywillis2.png"
                        alt=""
                      /> */}
                      <span className="tonnyWillisName">
                        {proposal.full_name}
                      </span>
                    </div>
                    <label className="Tonny_Agen_Date">
                      Submitted{" "}
                      {moment(proposal.created).format("YYYY-MM-DD hh:mm a")}
                      {/* Submitted June 18 3:25 PM */}
                    </label>
                    {proposal.Accepted_proposal_date && (
                      <label className="Tonny_Agen_Date">
                        Accepted{" "}
                        {moment(proposal.Accepted_proposal_date).format(
                          "YYYY-MM-DD hh:mm a"
                        )}
                        {/* Submitted June 18 3:25 PM */}
                      </label>
                    )}
                  </div>
                </div>
                <span className="dropdowntonnyWillisParaOfferPrice">
                  {/* <button
                    onClick={() => {
                      setOpen(proposal.id);
                    }}
                    type="button"
                  >
                    ...
                  </button> */}
                  {/* {open && ( */}
                  <div className="proposalpage">
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      ...
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleClose}>Visit Profile</MenuItem>
                      <MenuItem onClick={handleClose}>Message</MenuItem>
                    </Menu>
                    {/* <Select

                        className={
                        companyvalue === "null"
                        ? "selectinputcolor"
                        : "menuiteminputcolor"
                        }
                      onOpen={() => {
                        setOpen(proposal.id);
                      }}
                      onClose={() => {
                        setOpen("");
                      }}
                      MenuProps={menuProps}
                      // className={classes.root}
                      id="select-language"
                      onClick={() => setOpen(!open)}
                      value={dropdown}
                      onChange={(e) => setDropdown(e.target.value)}
                      open={open == proposal.id}
                      // open={isOpen}
                    >
                      <MenuItem
                        value="1"
                        onClick={(e) => navigate("/profile-demo")}
                      >
                        Visit Profile
                      </MenuItem>
                      <MenuItem value="2">Message</MenuItem>
                    </Select> */}
                  </div>
                  {/* )} */}
                </span>
                {proposal.status == 1 ? (
                  <span className="proposalSmallSec">Proposal Rejected</span>
                ) : proposal.status == 2 ? (
                  <span className="proposalSmall">Proposal Accepted</span>
                ) : null}

                <div className="tonnyWillisParaOfferPrice">
                  <div className="agencyjobproposal">
                    <div className="agencyjobproposal_text">
                      {proposal.cover_letter?.length >= 200 &&
                        !fullCoverLetter && (
                          <>
                            <p className="willisPara">
                              {proposal.cover_letter.slice(0, 200)}...
                            </p>
                            <button onClick={() => setFullCoverLetter(true)}>
                              Read more...
                            </button>
                          </>
                        )}
                      {proposal.cover_letter?.length >= 200 && fullCoverLetter && (
                        <>
                          <p className="willisPara">{proposal.cover_letter}</p>
                          <button onClick={() => setFullCoverLetter(false)}>
                            Read less...
                          </button>
                        </>
                      )}
                      {proposal.cover_letter?.length < 200 && (
                        <p className="willisPara">{proposal.cover_letter}</p>
                      )}{" "}
                    </div>

                    <div className="tonnyProposedPriceDateNew">
                      <div className="offerPriceDueDate">
                        <div className="TonnyOfferPrice">
                          <h3>Offer Price</h3>
                          <p>${props.jobProposalPrice}</p>
                        </div>

                        <div className="tonnyDueDate">
                          <h3>Offer Due Date</h3>
                          <p>${props.jobProposalDate}</p>
                        </div>
                      </div>
                      <div className="willisProposedDueDate">
                        <div className="ag-detailproduedate">
                          {proposal.proposed_price && (
                            <div
                              className={
                                proposal.proposed_price >
                                1.5 * props.jobProposalPrice
                                  ? "TonnyProposedPrice"
                                  : proposal.proposed_price >
                                    1.25 * props.jobProposalPrice
                                  ? "orangeTonnyProposedPrice"
                                  : undefined
                              }
                            >
                              <h3>Proposed Price</h3>
                              <p>${proposal.proposed_price}</p>
                            </div>
                          )}
                        </div>
                        <div className="Ag-detail-prop">
                          {proposal.proposed_due_date && (
                            <div
                              className={
                                handleDateDiff(
                                  props.jobProposalDate,
                                  proposal.proposed_due_date
                                ) > 7
                                  ? "redProposedDueDate"
                                  : handleDateDiff(
                                      props.jobProposalDate,
                                      proposal.proposed_due_date
                                    ) > 3
                                  ? "orangetonnyProposedDueDate"
                                  : "tonnyProposedDueDate"
                              }
                            >
                              <h3>Proposed Due Date</h3>
                              <p>{proposal.proposed_due_date}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {proposal.question && (
                        <div className="abc">
                          <div className="formatNeedBox">
                            <div className="formatIconText">
                              <div className="formatIcon">
                                <img src="/img/chatformat.png" alt="" />
                              </div>
                              <div className="formatTextNew">
                                <h3>{proposal.question}</h3>
                                <span
                                  style={{ cursor: "pointer" }}
                                  className="answerFormat"
                                  onClick={(e) => props.handleChangeTab(e, "5")}
                                >
                                  Answer
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="TwoButtonsPdf">
                  <div className="imagestonnyBannerPortfolio">
                    {proposal.job_applied_attachments?.length > 0 &&
                      proposal.job_applied_attachments_name?.length > 0 &&
                      proposal.job_applied_attachments?.map((doc, index) => (
                        <div
                          className="imageItemtonnyBannerPortfolio"
                          key={index}
                        >
                          <a href={doc} target="_blank">
                            <img src="/img/Projects.png" alt="" />
                            <span className="TonyBannerAdPitch">
                              {proposal.job_applied_attachments_name[index]}
                            </span>
                          </a>
                        </div>
                      ))}
                  </div>
                  <div className="tonnyBannerPortfolio">
                    {proposal.links &&
                      proposal.links?.split(",").map((link, index) => (
                        <div className="urltonnyBannerPortfolio" key={index}>
                          <Link to="#" className="TonyBannerAdPitch">
                            {link}
                          </Link>
                        </div>
                      ))}
                  </div>
                  {proposal.status == 0 && (
                    <div className="acceptRejectButtons">
                      {jobDetails.is_active == true && (
                        <>
                          <div className="rejectbtnProposal">
                            <button
                              hidden={props.statusJob == false}
                              type="button"
                              onClick={() => handleRejectProposal(proposal.id)}
                              className="RejectButtonPro"
                            >
                              Reject Proposal
                            </button>
                          </div>
                          <div className="acceptbtnProposal">
                            <button
                              hidden={props.statusJob == false}
                              type="button"
                              onClick={() => handleAcceptProposal(proposal.id)}
                              className="AcceptButtonpro"
                            >
                              Accept Proposal
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

        {/* <div className="tonnyWillisContent">
          <div className="InlinewillisNameDate">
            <div className="willisNameDate">
              <div className="willisNameImg">
                <img
                  className="willisLogo"
                  src="/img/tonnywillis2.png"
                  alt=""
                />
                <span className="tonnyWillisName">Tonny Willis</span>
              </div>
              <label className="Tonny_Agen_Date">
                Submitted June 18 3:25 PM
              </label>
            </div>
          </div>
          <span className="proposalSmall">Proposal Accepted</span>
          <div className="tonnyWillisParaOfferPrice">
            <p className="willisPara">
              Here are all the reasons I’d be a great choice for this job. Lorem
              ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
              Aliquam in hendrerit urna.at sodales sodales. Quisque sagittis
              orci ut diam condimentum, vel euismod erat placerat. In iaculis
              arcu eros, eget tempus orci facilisis id. Praesent lorem orci,
              mattis non efficitur id, ultricies vel nibh.{" "}
            </p>
            <div className="tonnyProposedPriceDate">
              <div className="offerPriceDueDate">
                <div className="TonnyOfferPrice">
                  <h3>Offer Price</h3>
                  <p>$1000</p>
                </div>

                <div className="tonnyDueDate">
                  <h3>Offer Due Date</h3>
                  <p>09-22-2022</p>
                </div>
              </div>
              <div className="willisProposedDueDate">
                <div className="TonnyProposedPrice">
                  <h3>Proposed Price</h3>
                  <p>$1200</p>
                </div>

                <div className="tonnyProposedDueDate">
                  <h3>Proposed Due Date</h3>
                  <p>09-20-2022</p>
                </div>
              </div>
            </div>
          </div>
          <div className="tonnyBannerPortfolio">
            <img src="/img/Projects.png" alt="" />
            <Link to="#" className="TonyBannerAdPitch">
              TonyBannerAdPitch.doc
            </Link>
            <Link to="#" className="TonyWillisPortfolio">
              TonyWillisPortfolio.com
            </Link>
          </div>

          <div className="acceptRejectButtons">
            <div className="rejectbtnProposal">
              <button className="RejectButtonPro">Reject Proposal</button>
            </div>
            <div className="acceptbtnProposal">
              <button className="AcceptButtonpro">Accept Proposal</button>
            </div>
          </div>
        </div> */}

        {/* <div className="rachelSmithContent">
          <div className="tonnyWillisContent">
            <div className="InlinewillisNameDate">
              <div className="willisNameDate">
                <div className="willisNameImg">
                  <img
                    className="willisLogo"
                    src="/img/rachelsmith.png"
                    alt=""
                  />
                  <span className="tonnyWillisName">Rachel Smith</span>
                </div>
                <label className="Tonny_Agen_Date">
                  Submitted June 18 3:34 PM
                </label>
              </div>
            </div>
            <span className="proposalSmallSec">Proposal Rejected</span>
            <div className="tonnyWillisParaOfferPrice">
              <p className="willisPara">
                Here are all the reasons I’d be a great choice for this job.
                Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                massa mi. Aliquam in hendrerit urna.at sodales sodales. Quisque
                sagittis orci ut diam condimentum, vel euismod erat placerat. In
                iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem
                orci, mattis non efficitur id, ultricies vel nibh.{" "}
              </p>
              <div className="tonnyProposedPriceDateNew">
                <div className="offerPriceDueDate">
                  <div className="TonnyOfferPrice">
                    <h3>Offer Price</h3>
                    <p>$1000</p>
                  </div>

                  <div className="tonnyDueDate">
                    <h3>Offer Due Date</h3>
                    <p>09-22-2022</p>
                  </div>
                </div>
                <div className="willisProposedDueDate">
                  <div className="TonnyProposedPrice">
                    <h3>Proposed Price</h3>
                    <p>$1200</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="abc">
              <div className="TwoButtonsPdf">
                <div className="tonnyBannerPortfolio">
                  <img src="/img/Projects.png" alt="" />
                  <Link to="#" className="TonyBannerAdPitch">
                    RachelSmithAdPitch.doc
                  </Link>
                </div>
                <div className="acceptRejectButtons">
                  <div className="rejectbtnProposal">
                    <button className="RejectButtonPro">Reject Proposal</button>
                  </div>
                  <div className="acceptbtnProposal">
                    <button className="AcceptButtonpro">Accept Proposal</button>
                  </div>
                </div>
              </div>
              <div className="formatNeedBox">
                <div className="formatIconText">
                  <div className="formatIcon">
                    <img src="/img/chatformat.png" alt="" />
                  </div>
                  <div className="formatTextNew">
                    <h3>
                      What format do you need this delivered in? JPEG? PNG? What
                      size?
                    </h3>
                    <span className="answerFormat">Answer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sendButtontextArea">
          <div className="textareacommentsProp">
            <textarea
              id="storyProposal"
              name="story"
              rows="5"
              cols="33"
            ></textarea>
            <span className="limitWordsNew">0/4000</span>
          </div>

          <button className="sendButtonLimit">Send</button>
        </div> */}
      </div>

      <div className="noJobProposalFounddiv">
        {proposalsData?.length < 1 && (
          <span className="noJobProposalFound">No new job proposals found</span>
        )}
      </div>
    </>
  );
};

export default Agency_job_proposal;
