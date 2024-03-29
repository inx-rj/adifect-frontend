import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { Images } from "../../helper/images";
import { TRIGGER_FORGOT_PASSWORD } from "../../redux/actions/auth/auth.actions";
import { useAppDispatch } from "../../redux/store";
import Logo from "components/common/logo/Logo";

const ForgotPassword = () => {
  let navigate = useNavigate();

  const dispatch = useAppDispatch();
  useEffect(() => {
    // dispatch(defaultPageLoader());
  }, []);
  //   const { loading } = useSelector((state) => state.loaderReducer);

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: null,
  });

  const validateSubmit = (e: any) => {
    // e.preventDefault();
    const tempErrors: any = {
      // email: validations.Email(email),
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler(e);
  };

  const submitHandler = async (e: any) => {
    dispatch(TRIGGER_FORGOT_PASSWORD({ email: email }))
      .then((res) => {
        swal({
          title: "Successfully Complete",
          text: "Email has been sent successfully!",
          // text: res.data.message,
          className: "successAlert",
          icon: Images.Logo,
          buttons: { visible: false },
          timer: 5000,
        });
        navigate("/");
        // toast.success(res.data.message);
      })
      .catch((err: any) => {
        var error = "";
        if (err.response.data["message"]) {
          error = err.response.data["message"];
        } else if (err.response.data["email"][0]) {
          error = err.response.data["email"][0];
        }
        swal({
          title: "Error",
          text: error,
          className: "errorAlert",
          icon: Images.Logo,
          buttons: { visible: false },
          timer: 5000,
        });
      });
  };

  return (
    <>
      {/* {loading ? (
        <LoadingSpinner />
      ) : ( */}
      <>
        <div className="login-signup-wrapper">
          <div className="card max-w-[380px] w-full">
            <div className="px-0 xs:px-5">
              <div className="max-w-[150px] md:max-w-[200px] w-full mx-auto my-3 h-[65px]">
                <Logo />
              </div>
              <div className="login-content">
                <div className="ForgotPgae">
                  <div className="logo-content">
                    <img src={Images.Logo} className="login-logo" alt="" />
                  </div>
                  <form className="forgotpass mb-5">
                    <div
                      className={
                        errors.email
                          ? "input-fields-wrapper error-style"
                          : "input-fields-wrapper"
                      }
                    >
                      <h5 className="mb-2">Email</h5>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="input-style"
                        value={email}
                        onChange={(e) => {
                          setErrors({ ...errors, email: null });
                          setEmail(e.target.value);
                        }}
                      />
                      {/* <span
                      style={{
                        color: "#D14F4F",
                        opacity: errors.email ? 1 : 0,
                      }}
                    >
                      {errors.email ?? "valid"}
                    </span> */}
                      {errors.email && <span>{errors.email ?? "valid"}</span>}
                    </div>
                    <div className="center mt-7 CancelBtnFP">
                      <button
                        type="button"
                        onClick={validateSubmit}
                        className="btn btn-primary w-full text-base"
                      >
                        Send
                      </button>
                      <Link
                        to={"/"}
                        className="btn btn-outline block w-full mt-4 py-[11px] text-base"
                      >
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* )} */}
    </>
  );
};

export default ForgotPassword;
