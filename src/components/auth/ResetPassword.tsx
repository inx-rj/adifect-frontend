import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Images } from "helper/images";
import {
  TRIGGER_FORGOT_PASSWORD,
  TRIGGER_GET_RESET_PASSWORD,
  TRIGGER_RESET_PASSWORD,
} from "redux/actions/auth/auth.actions";
import { useAppDispatch } from "redux/store";
import Logo from "components/common/logo/Logo";
import swal from "sweetalert";
import { confirmPassword, validatePassword } from "helper/validations";

const ResetPassword = () => {
  let { userId } = useParams();
  const { ResetpasswordId } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    checkToken();
  }, []);

  // useEffect(() => {
  //   dispatch(defaultPageLoader());
  // }, []);

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 4000);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({
    password: null,
    passwordConfirm: null,
  });

  const submitHandler = async () => {
    const data = {
      password: password,
      confirm_password: passwordConfirm,
    };
    dispatch(TRIGGER_RESET_PASSWORD(data, ResetpasswordId, userId))
      .then((res) => {
        // console.log("res---", res.data);
        swal({
          title: "Successfully Complete",
          // text: res.data.message,
          text: "Password has been changed successfully!",
          className: "successAlert",
          icon: Images.Logo,
          buttons: { visible: false },
          timer: 5000,
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      })
      .catch((err) => {
        // console.log("err---", err.response);
        var myError;
        if (err.response.data.message.token_expire) {
          myError = err.response.data.message.token_expire;
          return;
        }
        if (err.response.data.message) {
          myError = err.response.data.message;
          return;
        }
        swal({
          text: myError,
          className: "errorAlert",
          icon: Images.ErrorLogo,
          buttons: { visible: false },
          timer: 5000,
        });
        // console.log(err.response.data.message);
      });
  };

  const checkToken = async () => {
    dispatch(TRIGGER_GET_RESET_PASSWORD(ResetpasswordId, userId))
      .then((res) => {
        console.log("res---", res.data);
      })
      .catch((err) => {
        console.log("err---", err.response.data);

        var myError;
        if (err.response.data.token_expire) {
          myError = err.response.data.token_expire;
        }
        if (err.response.data.message) {
          myError = err.response.data.message;
        }
        swal({
          title: "Error",
          text: myError,
          className: "errorAlert",
          icon: Images.ErrorLogo,
          buttons: { visible: false },
          timer: 5000,
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      });
  };

  const validateSubmit = (e) => {
    // e.preventDefault();
    const tempErrors = {
      password: validatePassword(password),
      passwordConfirm: confirmPassword(password, passwordConfirm),
    };

    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      // console.log(
      //   "..values",
      //   Object.values(tempErrors).filter((value) => value)
      // );
      return;
    }
    checkToken();
    submitHandler();
  };

  return (
    <>
      {/* {loading ? (
        <LoadingSpinner />
      ) : ( */}
      <>
        <div className="login-signup-wrapper">
          <div className="card max-w-[650px] w-full">
            <div className="mb-4">
              <div className="max-w-[150px] md:max-w-[200px] w-full mx-auto my-3 h-[65px]">
                <Logo />
              </div>
              <h2 className="card-page-title text-center mb-5">
                Reset Password
              </h2>
              <p className="text-center max-w-[450px] w-full mx-auto">
                Looks like you have forgotten your password. Enter your new
                password and confirm password to reset.
              </p>
            </div>
            <form id="ResetPasswordForm">
              <div
                className={errors.password ? "inputCntnr error" : "inputCntnr"}
              >
                <h5 className="mb-2 boldf">New Password</h5>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter new password"
                  className={
                    errors.password
                      ? "input-style input-err-style"
                      : "input-style"
                  }
                  value={password}
                  onChange={(e) => {
                    setErrors({ ...errors, password: null });
                    setPassword(e.target.value);
                  }}
                />
                <span className="err-tag">{errors.password ?? ""}</span>
              </div>
              <div
                className={
                  errors.passwordConfirm ? "inputCntnr error" : "inputCntnr"
                }
              >
                <h5 className="mb-2 mt-2">Confirm New Password</h5>
                <input
                  type="password"
                  name="Confirm Password"
                  placeholder="Enter confirm password"
                  id="Confirm Password"
                  className={
                    errors.passwordConfirm
                      ? "input-style input-err-style"
                      : "input-style"
                  }
                  value={passwordConfirm}
                  onChange={(e) => {
                    setErrors({ ...errors, passwordConfirm: null });
                    setPasswordConfirm(e.target.value);
                  }}
                />
                <span className="err-tag">{errors.passwordConfirm ?? ""}</span>
              </div>
              <div className="center mt-4">
                <button
                  type="button"
                  className="btn btn-primary mx-auto block max-w-[200px] w-full"
                  onClick={validateSubmit}
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
      {/* )} */}
    </>
  );
};

export default ResetPassword;
