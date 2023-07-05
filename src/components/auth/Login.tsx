import { useState } from "react";
import { Link } from "react-router-dom";
import { TRIGGER_LOGIN } from "redux/actions/auth/auth.actions";
import { useAppDispatch, useAppSelector } from "redux/store";
import { emailRequired, passwordRequired } from "helper/validations";
import {
  USER_DATA_LOADER,
} from "redux/reducers/auth/auth.slice";
import { AUTH_ROUTE } from "routes/baseRoute";
import Logo from "components/common/logo/Logo";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import axiosPrivate from "api/axios";

const Login = () => {
  const dispatch = useAppDispatch();

  const userLoader = useAppSelector(USER_DATA_LOADER);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const redirect =
    window.location.search && window.location.search?.split("=")[1];

  const validateSubmit = (e: any) => {
    e.preventDefault();

    shareOnSms(); // OpnSesame Related function call

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

  // OpnSesame API Code
  const shareOnSms = async () => {
    const payloadData = {
      username: "zakhayes+dsdev@directsnd.com",
      password: "admintest22!",
    };

    // axiosPrivate.defaults.xsrfCookieName = 'CSRF-TOKEN';
    // axiosPrivate.defaults.xsrfHeaderName = 'X-CSRF-Token';

    const configs = {
      headers: {
        "Content-Type": "application/json",
        // Allow: ['GET', 'POST', 'OPTIONS'],
        'Accept': 'application/json',
        // 'Accept-Encoding': 'gzip, deflate, br',
        // 'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'Access-Control-Allow-Origin': '*',
        Authorization: "Basic emFraGF5ZXMrZHNkZXZAZGlyZWN0c25kLmNvbTphZG1pbnRlc3QyMiE=",
        // Connection: "keep-alive",
        // Host: 'cors-anywhere.herokuapp.com',
        // Origin: 'https://localhost:3001',
        // Referer: 'https://localhost:3001/',
        // 'Sec-Fetch-Mode': 'cors',
        // 'Sec-Fetch-Site': 'cross-site',
        'X-Requested-With': 'application/json',
        // 'Vary': 'Accept',
        // 'cross-origin-resource-policy': 'cross-origin',
        // "Transfer-Encoding": "chunked",
        // 'Access-Control-Allow-Methods': '*',
        // 'Server': 'cloudflare',
        // 'x-content-type-options': 'nosniff',
        // 'strict-transport-security': 'max-age=7776000; includeSubDomains; preload',
        // 'Content-Encoding': 'gzip',
        // 'CF-RAY': '7c1f94281ad84390-EWR',
        // 'content-security-policy': "default-src 'self' opnsesame-media-dev.s3.amazonaws.com os-ui-resources.s3.amazonaws.com google.com maxcdn.bootstrapcdn.com www.googletagmanager.com *.opnsesame.com s3.amazonaws.com/static.opnsesame.com code.jquery.com www.google.com www.gstatic.com www.google-analytics.com cdn.datatables.net cdnjs.cloudflare.com ajax.googleapis.com d3js.org stats.g.doubleclick.net text.advantage.gop cdn.jsdelivr.net; media-src https://s3.amazonaws.com/opnsesame-media-dev/; script-src 'self' opnsesame-media-dev.s3.amazonaws.com os-ui-resources.s3.amazonaws.com google.com maxcdn.bootstrapcdn.com www.googletagmanager.com *.opnsesame.com s3.amazonaws.com/static.opnsesame.com code.jquery.com www.google.com www.gstatic.com www.google-analytics.com cdn.datatables.net cdnjs.cloudflare.com ajax.googleapis.com d3js.org stats.g.doubleclick.net text.advantage.gop cdn.jsdelivr.net; style-src * 'unsafe-inline' 'self'; img-src * 'self' 'unsafe-inline' 'unsafe-eval'; font-src *; worker-src 'self' blob:",
        // 'mode': 'no-cors'
      },
    };

    // console.log("Payload", { payloadData, configs });

    try {
      const response = await axiosPrivate.post(
        "https://dev-api.opnsesame.com/auth/api-token-auth",
        payloadData,
        configs
      );
      // const response = await axiosPrivate.get(
      //   // "https://cors-anywhere.herokuapp.com/https://dev-api.opnsesame.com/accounts",
      //   "https://dev-api.opnsesame.com/accounts",
      //   configs
      // );
      console.log({ response }, "OpnRes");
    } catch (err) {
      console.error(err);
    }
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    await dispatch(TRIGGER_LOGIN({ email: email, password }));
  };

  return (
    <>
      {userLoader && <LoadingSpinner />}
      <div className="login-signup-wrapper">
        <div className="card max-w-[380px] w-full">
          <div className="max-w-[150px] md:max-w-[200px] w-full mx-auto my-3 h-[65px]">
            <Logo />
          </div>
          <div className="text-center">
            <h2 className="card-page-title">Welcome to Adifect</h2>
            <p className="card-page-info">
              Log into your account by entering your username, email and
              password.
            </p>
          </div>
          <form
            id="websiteUserLoginForm"
            onSubmit={validateSubmit}
            className="group grid grid-cols-1"
          >
            <div className="input-fields-wrapper">
              <label>Username or Email</label>
              <input
                className={
                  errors.email ? "input-style input-err-style" : "input-style"
                }
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setErrors({ ...errors, email: null });
                  setEmail(e.target.value);
                }}
              />
              <span className="err-tag">{errors.email ?? " "}</span>
            </div>
            <div className="input-fields-wrapper">
              <label>Password</label>
              <input
                className={
                  errors.password
                    ? "input-style input-err-style"
                    : "input-style"
                }
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setErrors({ ...errors, password: null });
                  setPassword(e.target.value);
                }}
              />
              <span className="err-tag">{errors.password ?? ""}</span>
            </div>
            <div className="mt-uni-gap">
              <button
                type="submit"
                className="btn btn-primary w-full text-base"
              >
                Log In
              </button>
              <Link
                to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
                className="btn btn-outline block w-full mt-uni-gap text-base"
              >
                Create Account
              </Link>
            </div>
            <Link
              to={AUTH_ROUTE.FORGOT_PASSWORD}
              className="btn-link mt-uni-gap"
            >
              Forgot Password ?
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
