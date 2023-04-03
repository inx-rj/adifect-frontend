import React, { useState, useEffect } from "react";
// import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// import LoadingSpinner from "../../containers/LoadingSpinner";
// import { login } from "../../redux/actions/auth-actions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Images } from "../../helper/images";
import { TRIGGER_LOGIN } from "../../redux/actions/auth/auth.actions";
import { useAppDispatch } from "../../redux/store";
import {
  emailRequired,
  passwordRequired,
} from "helper/validations";
// import { defaultPageLoader } from "../../redux/actions/other-actions";
// import swal from "sweetalert";

const Login = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // dispatch(defaultPageLoader());
  }, []);
  // const { loading } = useSelector((state) => state.loaderReducer);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  // const { error, userData, message } = useSelector(
  //   (state) => state.authReducer
  // );

  const redirect =
    window.location.search && window.location.search?.split("=")[1];
  // : "/home";

  const [redirectMyUrl, setRedirectMyUrl] = useState("/home");

  useEffect(() => {
    let redirectUrl = localStorage.getItem("redirJob");
    if (redirectUrl) {
      setRedirectMyUrl(`/jobs/details/${redirectUrl}`);
    }
    // else {
    //   setRedirectMyUrl("/home");
    // }
    localStorage.removeItem("redirJob");
  }, []);

  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      email: emailRequired(email),
      password: passwordRequired(password),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      // console.log(
      //   "..values",
      //   Object.values(tempErrors).filter((value) => value)
      // );
      return;
    }
    submitHandler(e);
  };

  // useEffect(() => {
  //   if (userData) {
  //     swal({
  //       title: "Successfully Complete",
  //       text: "Login Success",
  //       className: "successAlert-login",
  //       icon: "/img/logonew.svg",
  //       buttons: false,
  //       timer: 1500,
  //     });
  //     setTimeout(() => {
  //       setIsLoading(true);
  //     }, 1000);
  //     setTimeout(() => {
  //       // navigate(redirect ? redirect : "/home");
  //       navigate(redirect ? redirect : redirectMyUrl);
  //       // navigate("/home");
  //     }, 1500);
  //   }
  //   if (error) {
  //     swal({
  //       title: "Error",
  //       text: error,
  //       className: "errorAlert-login",
  //       icon: "/img/logonew-red.svg",
  //       buttons: false,
  //       timer: 1500,
  //     });
  //     setIsLoading(false);
  //   }
  // }, [dispatch, userData, error]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(TRIGGER_LOGIN({ email: email, password }));
  };

  return (
    <>
      {/* {loading ? <LoadingSpinner /> : <></>} */}
      {/* {isLoading && <LoadingSpinner />} */}

      <div className="flex my-0 mx-auto max-w-[380px] items-center justify-center w-[90%] h-screen">
        <div className="card">
          <div className="mt-2.5 mb-4 inline-flex items-center justify-center w-full h-full">
            <img src={Images.Logo} className="h-auto max-w-[200px]" alt="" />
          </div>
          <div className="text-center">
            <h2 className="mb-2 font-bold">Welcome to Adifect</h2>
            <p className="text-base">
              Log into your account by entering your
              <br />
              username, email and password.
            </p>
          </div>
          <form id="websiteUserLoginForm" onSubmit={validateSubmit}>
            <div className={errors.email ? "input-fields-wrapper text-danger" : "input-fields-wrapper"}>
              <h5 className="mt-2 mb-1">Username or Email</h5>
              <input
                className="input-style"
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setErrors({ ...errors, email: null });
                  setEmail(e.target.value);
                }}
              />
              {errors.email && <span className="error-style">{errors.email ?? "valid"}</span>}
            </div>
            <div className={errors.password ? "input-fields-wrapper text-danger" : "input-fields-wrapper"}>
              <h5 className="mb-1">Password</h5>
              <input
                className="input-style"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setErrors({ ...errors, password: null });
                  setPassword(e.target.value);
                }}
              />
              {errors.password && <span className="error-style">{errors.password ?? "valid"}</span>}
            </div>
            <div className="mt-2 text-center w-full">
              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Log In
              </button>
              <Link
                to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
                className="link-btn"
              >
                Create Account
              </Link>
            </div>
            <div className="text-center mt-4 text-theme">
              <h5>
                <Link to="/forgot-password">Forgot Password ?</Link>
              </h5>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
