import React, { useState, useEffect } from "react";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import { validations } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listAllJobs, listAgencyJobs } from "../../redux/actions/job-actions";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { ROLE } from "../../constants/other-constants";
import swal from "sweetalert";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { Frontend_URL } from "../../environment";
import { Button } from "@mui/material";
import { deleteJob } from "../../redux/actions/job-actions";
import { defaultPageLoader } from "../../redux/actions/other-actions";

export default function Creator_latest_jobs() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const [usersForRender, setUsersForRender] = useState([]);

  // const { jobData, loading, success } = useSelector(
  //   (state) => state.jobReducer
  // );
  const { jobData, loading: jobLoading } = useSelector(
    (state) => state.jobReducer
  );
  const { success } = useSelector((state) => state.jobDeleteReducer);
  const { userData } = useSelector((state) => state.authReducer);

  const { loading } = useSelector((state) => state.loaderReducer);

  useEffect(() => {
    dispatch(defaultPageLoader());
    // dispatch(listAllJobs());
    if (userData?.user?.role == Object.keys(ROLE)[2]) {
      dispatch(listAgencyJobs());
    } else {
      dispatch(listAllJobs());
    }
  }, [success]);

  useEffect(() => {
    // if (!user?.user?.role == Object.keys(ROLE)[2]) {
    let userData1 = [];

    if (jobData) {
      jobData?.map((item, index) => {
        // item.job_name = (
        //   <Button title="edit" className="EditBut" href={`/job/${item.id}`}>
        //     {item.job_name}
        //   </Button>
        // );
        item.price = item.price;

        // var utc1 = null;
        // if (item.created_at) {
        //   utc1 = moment(item.created_at).format("MM-DD-yyyy hh:mm a");
        // }
        // item.created_at = utc1;

        // var utc = null;
        // if (item.updated_at) {
        //   utc = moment(item.updated_at).format("MM-DD-yyyy hh:mm a");
        // }

        // item.updated_at = utc;

        item.action = (
          <div style={{ display: "flex" }}>
            <Button
              title="view"
              className="EditBut"
              href={`/jobs/details/${item.id}`}
            >
              {" "}
              <img
                className="viewicon"
                src={process.env.PUBLIC_URL + "/img/viewicon.png"}
                alt=""
              />{" "}
            </Button>
            <Button title="edit" className="EditBut" href={`/jobs/${item.id}`}>
              {" "}
              <img
                className="editicon"
                src={process.env.PUBLIC_URL + "/img/editicon.png"}
                alt=""
              />{" "}
            </Button>
            <Button
              title="delete"
              className="deletebutt"
              onClick={() => deleteHandler(item.id)}
            >
              {" "}
              <img
                className="editicon"
                src={process.env.PUBLIC_URL + "/img/delet.png"}
                alt=""
              />{" "}
            </Button>
            {/* <Button
            title="copy"
            className="EditBut"
            onClick={() => clipboardHandler(item.slug)}
          >
            {" "}
            <i className="fa fa-clipboard"></i>{" "}
          </Button> */}
          </div>
        );
        userData1.push(item);
      });
    }

    setUsersForRender(userData1);
    // }
  }, [jobData]);

  // useEffect(() => {
  // let jobsDataArray = JSON.parse(JSON.stringify(jobsData));
  // if (user?.user?.role == Object.keys(ROLE)[2]) {
  // let userData = [];
  // agencyJobData?.map((item, index) => {
  // item.job_name = (
  //   <Button title="edit" className="EditBut" href={`/job/${item.id}`}>
  //     {item.job_name}
  //   </Button>
  // );
  // item.price = item.price;

  // var utc1 = null;
  // if (item.created_at) {
  //   utc1 = moment(item.created_at).format("MM-DD-yyyy hh:mm a");
  // }
  // item.created_at = utc1;

  // var utc = null;
  // if (item.updated_at) {
  //   utc = moment(item.updated_at).format("MM-DD-yyyy hh:mm a");
  // }

  // item.updated_at = utc;

  //       item.action = (
  //         <div style={{ display: "flex" }}>
  //           <Button
  //             title="view"
  //             className="EditBut"
  //             href={`/job-details/${item.id}`}
  //           >
  //             {" "}
  //             <img
  //               className="viewicon"
  //               src={process.env.PUBLIC_URL + "/img/viewicon.png"}
  //               alt=""
  //             />{" "}
  //           </Button>
  //           <Button title="edit" className="EditBut" href={`/job/${item.id}`}>
  //             {" "}
  //             <img
  //               className="editicon"
  //               src={process.env.PUBLIC_URL + "/img/editicon.png"}
  //               alt=""
  //             />{" "}
  //           </Button>
  //           <Button
  //             title="delete"
  //             className="deletebutt"
  //             onClick={() => deleteHandler(item.id)}
  //           >
  //             {" "}
  //             <img
  //               className="editicon"
  //               src={process.env.PUBLIC_URL + "/img/delet.png"}
  //               alt=""
  //             />{" "}
  //           </Button>
  //           {/* <Button
  //           title="copy"
  //           className="EditBut"
  //           onClick={() => clipboardHandler(item.slug)}
  //         >
  //           {" "}
  //           <i className="fa fa-clipboard"></i>{" "}
  //         </Button> */}
  //         </div>
  //       );
  //       userData.push(item);
  //     });

  //     setUsersForRender(userData);
  //   // }
  // }, [agencyJobData]);

  const data = {
    columns: [
      {
        label: "Title",
        field: "title",
        sort: "asc",
        width: 500,
      },
      {
        label: "Offer Price",
        field: "price",
        sort: "asc",
        width: 500,
      },
      {
        label: "Due Date",
        field: "expected_delivery_date",
        sort: "asc",
        width: 500,
      },
      // {
      //   label: "Updated At",
      //   field: "updated_at",
      //   sort: "asc",
      //   width: 500,
      // },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: usersForRender,
  };

  const deleteHandler = (id) => {
    swal({
      title: "Warning",
      text: "Are you sure you want to delete this job?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteJob(id));
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
        });
      }
    });
    // if (window.confirm("Are you sure you want to delete this job?")) {
    //   dispatch(deleteJob(id));
    // }
  };

  const fetchMoreData = () => {};

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* <div className="Category_p">
              <div className="CategorylistName">
                <h1>Jobs List</h1>
              </div>
            </div>
            <div className="Topallpage AllPageHight">
              <div className="ContentDiv Categoriesdiv1">
                <div className="Status"></div>
                <div className="savebtn Categorybtn">
                  <Link
                    className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                    to={`/job/add`}
                  >
                    {" "}
                    Create a Job{" "}
                  </Link>
                </div>
                <MDBDataTable
                  style={{}}
                  responsive
                  striped
                  bordered
                  small
                  data={data}
                />
              </div>
            </div> */}

          <div className="Topallpage bak_h">
            <div className="ContentDiv TopM">
              {/* <div className="Fresh">
                <h1>
                  Hello {userData.user.first_name} {userData.user.last_name}
                </h1>
              </div> */}
              <div className="Fresh">
                <div className="Jobs">
                  <h1 className="Freshtitle">
                    {userData?.user?.role == Object.keys(ROLE)[1]
                      ? "Fresh Jobs"
                      : "Job List"}
                  </h1>

                  {/* <div className="Status"></div> */}
                  <div className="FreshBtn">
                    <Link
                      className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                      to={`/jobs/add`}
                      hidden={userData?.user?.role == Object.keys(ROLE)[1]}
                    >
                      {" "}
                      Create a Job{" "}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="AllPageHight FreshJobTop">
                {jobData?.map((item, index) => (
                  <div className="Remotemarkeitng" key={index}>
                    <div className="bt-Title">
                      <div className="TitleRequired">
                        <Link to={`/jobs/details/${item.id}`}>
                          <h2>{item.title}</h2>
                        </Link>
                      </div>
                      <div className="ApplyButton">
                        <a href="#">
                          <button
                            type="button"
                            hidden={
                              userData?.user?.role == Object.keys(ROLE)[0] ||
                              userData?.user?.role == Object.keys(ROLE)[2]
                            }
                            className="btn btn-primary Small border-radius"
                          >
                            Apply Now
                          </button>
                        </a>

                        <a href={`/jobs/details/${item.id}`}>
                          <button
                            type="button"
                            hidden={
                              userData?.user?.role == Object.keys(ROLE)[1]
                            }
                            className="delJobedeidtbtn "
                          >
                            <img
                              className="viewicon"
                              src={process.env.PUBLIC_URL + "/img/viewicon.png"}
                              alt=""
                            />
                          </button>
                        </a>
                        <a href={`/jobs/${item.id}`}>
                          <button
                            type="button"
                            hidden={
                              userData?.user?.role == Object.keys(ROLE)[1]
                            }
                            className="delJobedeidtbtn "
                          >
                            <img
                              className="editicon"
                              src={process.env.PUBLIC_URL + "/img/editicon.png"}
                              alt=""
                            />
                          </button>
                        </a>
                        <a onClick={() => deleteHandler(item.id)}>
                          <button
                            type="button"
                            hidden={
                              userData?.user?.role == Object.keys(ROLE)[1]
                            }
                            className="delJob"
                          >
                            <img
                              className="editicon"
                              src={process.env.PUBLIC_URL + "/img/delet.png"}
                              alt=""
                            />
                          </button>
                        </a>
                      </div>
                    </div>
                    <div className="RemoteText">
                      <p className="PostedDate">
                        Posted on: {item.expected_delivery_date}
                      </p>
                      <div className="PostedDesc">
                        {item.description.substring(0, 300) + "..."}
                      </div>
                      <div className="Budget-Title">
                        <li>
                          <h5>Budget:</h5>
                        </li>
                        <li>
                          <h5>${item.price}</h5>
                        </li>
                      </div>
                      <div className="Budget-Title">
                        <li>
                          <h5>Level:</h5>
                        </li>
                        <li>
                          <h5>{item?.level?.level_name}</h5>
                        </li>
                      </div>
                      {/* <div className="Skill mt-4">
                        <li>
                          <h5>Skills:</h5>
                        </li>
                        {item.skills.map((skill, index) => (
                          <li key={index}>
                            <a href="#">{skill.skill_name}</a>
                          </li>
                        ))} */}
                      <div className="Skill mt-4">
                        <li>
                          <h5>Skills:</h5>
                        </li>

                        {item.skills?.map((item, index) => (
                          <li key={index}>
                            <a href="">{item.skill_name}</a>
                          </li>
                        ))}
                        {/* <li>
                            <a href="#">Marketing</a>
                          </li>
                          <li>
                            <a href="#">Digital Marketing</a>
                          </li>
                          <li>
                            <a href="#">Ad Campaign</a>
                          </li>
                          <li>
                            <a href="#">DIgital</a>
                          </li>
                          <li>
                            <a href="#">Social Marketing</a>
                          </li>
                          <li>
                            <a href="#">Insta Ads</a>
                          </li> */}
                      </div>
                      {/* </div> */}
                      <div className="Skill mt-4">
                        <li>
                          <h5>Tags:</h5>
                        </li>
                        {item.tags.split(",").map((tag, index) => (
                          <li key={index}>
                            <a href="#">{tag}</a>
                          </li>
                        ))}
                        {/* <li>
                          <a href="#">Marketing</a>
                        </li>
                        <li>
                          <a href="#">Digital Marketing</a>
                        </li>
                        <li>
                          <a href="#">Ad Campaign</a>
                        </li>
                        <li>
                          <a href="#">DIgital</a>
                        </li>
                        <li>
                          <a href="#">Social Marketing</a>
                        </li>
                        <li>
                          <a href="#">Insta Ads</a>
                        </li> */}
                      </div>
                      <div className="ApplyButton_2">
                        <button
                          type="button"
                          className="btn btn-primary Small border-radius"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="Topallpage"></div>
        </>
      )}
    </>
  );
}
