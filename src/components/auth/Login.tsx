import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Images } from "../../helper/images";
import { TRIGGER_LOGIN } from "../../redux/actions/auth/auth.actions";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { emailRequired, passwordRequired } from "helper/validations";
import { GET_USER_DATA } from "redux/reducers/auth/auth.slice";
import swal from "sweetalert";
import { PAGE_ROUTE } from "../../routes/baseRoute";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  const userData = useAppSelector(GET_USER_DATA);
  const redirect =
    window.location.search && window.location.search?.split("=")[1];
  const validateSubmit = (e: any) => {
    e.preventDefault();
    const tempErrors: any = {
      email: emailRequired(email),
      password: passwordRequired(password),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler(e);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    await dispatch(TRIGGER_LOGIN({ email: email, password }));
  };

  useEffect(() => {
    if (userData.hasData) {
      swal({
        title: "Successfully Complete",
        text: "Login Success",
        className: "successAlert-login",
        icon: Images.Logo,
        // buttons: false,
        timer: 1500,
      });

      setTimeout(() => {
        // navigate(redirect ? redirect : "/home");
        navigate(PAGE_ROUTE.HOME, { replace: true, state: true });
        // navigate("/home");
      }, 1500);
    }
  }, [dispatch, userData]);

  return (
    <>
      <div className="login-signup-wrapper  flex items-center p-20 justify-center min-h-screen">
        <div className="card max-w-[380px]">
          <div className="mt-2.5 mb-4 inline-flex items-center justify-center w-full h-full">
            <img
              src={Images.Logo}
              className="h-auto max-w-[200px] mx-auto"
              alt=""
            />
          </div>
          <div className="text-center">
            <h2 className="mb-2 font-bold text-2xl">Welcome to Adifect</h2>
            <p className="text-base font-normal break-words">
              Log into your account by entering your username, email and
              password.
            </p>
          </div>
          <form id="websiteUserLoginForm" onSubmit={validateSubmit}>
            <div
              className={
                errors.email
                  ? "input-fields-wrapper error-style"
                  : "input-fields-wrapper"
              }
            >
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
              {errors.email && (
                <span>{errors.email ?? "valid"}</span>
              )}
            </div>
            <div
              className={
                errors.password
                  ? "input-fields-wrapper error-style"
                  : "input-fields-wrapper"
              }
            >
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
              {errors.password && (
                <span>
                  {errors.password ?? "valid"}
                </span>
              )}
            </div>
            <div className="mt-2 text-center w-full">
              <button type="submit" className="btn btn-primary w-full">
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
              <h5 className="text-base font-medium">
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
