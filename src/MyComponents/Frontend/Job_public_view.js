import React, { useState, useEffect } from "react";
import { validations } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../redux/actions/auth-actions";
import { useDispatch, useSelector } from "react-redux";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { getPublicJobDetails } from "../../redux/actions/job-actions";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function JobPublicview() {
  const { jobId, linkCopy } = useParams();

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  let buff = new Buffer(jobId, "base64");
  let decryptedJobId = buff.toString("ascii");

  useEffect(() => {
    dispatch(getPublicJobDetails(decryptedJobId));
    localStorage.setItem("redirJob", decryptedJobId);
    if (linkCopy == "copy") {
      localStorage.setItem("cop-url", true);
    }
  }, []);

  const { publicJobDetails } = useSelector(
    (state) => state.publicJobDetailsReducer
  );
  console.log("publicJobDetails-0--0--0-0",publicJobDetails)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  const { error, userData, message } = useSelector(
    (state) => state.authReducer
  );

  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      email: validations.emailRequired(email),
      password: validations.passwordRequired(password),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      console.log(
        "..values",
        Object.values(tempErrors).filter((value) => value)
      );
      return;
    }
    submitHandler(e);
  };

  useEffect(() => {
    if (userData) {
      swal({
        title: "Successfully Complete",
        text: "Login Success",
        className: "successAlert-login",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 1500,
      });
      setTimeout(() => {
        setIsLoading(true);
      }, 1);
      setTimeout(() => {
        navigate(`/jobs/details/${decryptedJobId}`);
        // window.location.href = "/home";
      }, 1500);
    }
    if (error) {
      swal({
        title: "Error",
        text: error,
        className: "errorAlert-login",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 5000,
      });
      setIsLoading(false);
    }
  }, [dispatch, userData, error]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(login({ email: email, password }));
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="jobviewpage">
            <div className="job_viewdiv2">
              <div className="container">
                <div className="viewjobdivto">
                  <div className="logo-jobview">
                    <Link to="/">
                      <img
                        src="/img/logonew.svg"
                        className="login-logo"
                        alt=""
                      />
                    </Link>
                  </div>
                  {/* <div className="loginpublicbutton">
                    <li>
                      <Link to={`/signup`} className="Loginview">
                        Sign up
                      </Link>
                    </li>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="container">
              <div className="jobpublicdiv">
                {publicJobDetails ? (
                  <div className="publicview_sec">
                    <div className="Socialmedia">
                      <h1>{publicJobDetails?.title}</h1>
                    </div>
                    <div className="Searchsocial">
                      <li>
                        <a>
                          Posted{" "}
                          {moment(moment.utc(publicJobDetails?.created))
                            .local()
                            .fromNow()}{" "}
                        </a>
                      </li>
                    </div>

                    <p className="PostedDate">
                      Posted on:{" "}
                      {moment(publicJobDetails?.created).format("MMMM Do YYYY")}
                    </p>
                    <p className="textsec">{publicJobDetails?.description}</p>
                    {publicJobDetails?.skills?.length > 0 && (
                        <div className="Skill jobpublicskill">
                        <h5 className="Expertiseskill">Skills:</h5>
                        {publicJobDetails?.skills?.map((skill, index) => (
                          <li key={index}>
                            <Link to="#">{skill.skill_name}</Link>
                          </li>
                        ))}
                      </div>
                    )}
                    {publicJobDetails?.tags && (
                       <div className="Skill jobpublicTags">
                       <h5 className="Expertiseskill">Tags:</h5>
                       {publicJobDetails?.tags?.split(",").map((tag, index) => (
                         <li key={index}>
                           <Link to="#">{tag}</Link>
                         </li>
                       ))}
                     </div>
                    )}
                  </div>
                ) : (
                  <div className="publicview_sec nodetailspublicjob">
                    <h3>Job Details not found</h3>
                  </div>
                )}
                <div className="publicview_login">
                  <div className="loginviewdiv">
                    <div className="logo-wrapper">
                      <div className="logo-content">
                        <img src="/img/logonew.svg" class="login-logo" alt="" />
                      </div>
                    </div>
                    <div className="login-message-wrapper">
                      <div className="login-message-job-view">
                        <h2>Welcome to Adifect</h2>
                        <p>
                          Log into your account by entering your
                          <br />
                          username, email and password.
                        </p>
                      </div>
                    </div>
                    <form id="websiteUserLoginForm" onSubmit={validateSubmit}>
                      <div
                        className={
                          errors.email ? "inputCntnr error" : "inputCntnr"
                        }
                      >
                        <h5 className="form-label  mt-2" htmlFor="email">
                          Username or Email
                        </h5>
                        <input
                          className="input-box validateInput w-100 h-47 border-radius border-1 pl-2"
                          type="text"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(e) => {
                            setErrors({ ...errors, email: null });
                            setEmail(e.target.value);
                          }}
                        />
                        <span
                          style={{
                            color: "#D14F4F",
                            opacity: errors.email ? 1 : 0,
                          }}
                        >
                          {errors.email ?? "valid"}
                        </span>
                      </div>
                      <div
                        className={
                          errors.password ? "inputCntnr error" : "inputCntnr"
                        }
                      >
                        <h5 className="form-label mt-1" htmlFor="password">
                          Password
                        </h5>
                        <input
                          className="input-box validateInput w-100 h-47 border-radius border-1 pl-2"
                          type="password"
                          name="password"
                          id="password"
                          value={password}
                          onChange={(e) => {
                            setErrors({ ...errors, password: null });
                            setPassword(e.target.value);
                          }}
                        />
                        <span
                          style={{
                            color: "#D14F4F",
                            opacity: errors.password ? 1 : 0,
                          }}
                        >
                          {errors.password ?? "valid"}
                        </span>
                      </div>
                      <div className="center mt-2 logindiv1">
                        <button
                          type="submit"
                          // onClick={validateSubmit}
                          className="btn btn-primary Large w-100 border-radius "
                        >
                          Log In
                        </button>
                        {/* <button type="button" className="Secondary mt-4 w-100 border-radius">Create Account</button> */}
                        <Link
                          to={`/signup`}
                          className="create-account-btn mt-3 w-100 border-radius"
                        >
                          {/* <Link
                          to={
                            linkCopy && linkCopy == "copy"
                              ? "/signup"
                              : `/signup/${jobId}`
                          }
                          className="create-account-btn mt-3 w-100 border-radius"
                        > */}
                          Create Account
                        </Link>
                      </div>
                      <div className="center mt-3 Forgotsecbott">
                        <h5>
                          <Link to="/forgot-password">Forgot Password ?</Link>
                        </h5>
                      </div>
                    </form>
                    <ToastContainer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
