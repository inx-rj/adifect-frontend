import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { Images } from "../../helper/images";
import { TRIGGER_FORGOT_PASSWORD } from "../../redux/actions/auth/auth.actions";
import { useAppDispatch } from "../../redux/store";

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
      console.log(
        "..values",
        Object.values(tempErrors).filter((value) => value)
      );
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
          icon: "/img/logonew.svg",
          //   buttons: false,
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
          //   buttons: false,
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
        <div className="flex my-0 mx-auto max-w-[380px] items-center justify-center w-[90%] h-screen">
          <div className="card">
            <div className="px-5">
              <div className="mt-2.5 mb-4 inline-flex items-center justify-center w-full h-full">
                <img
                  src={Images.Logo}
                  className="h-auto max-w-[200px]"
                  alt=""
                />
              </div>
              <div className="login-content">
                <div className="ForgotPgae">
                  <div className="logo-content">
                    <img src="img/logonew.svg" className="login-logo" alt="" />
                  </div>
                  <form className="forgotpass">
                    <div
                      className={
                        errors.email
                          ? "input-fields-wrapper text-danger"
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
                      {errors.email && (
                        <span className="error-style">
                          {errors.email ?? "valid"}
                        </span>
                      )}
                    </div>
                    <div className="center mt-3 CancelBtnFP">
                      <button
                        type="button"
                        onClick={validateSubmit}
                        className="btn btn-primary w-full bg-theme border-solid border-theme text-white disabled:bg-dark-100 disabled:text-title-color"
                      >
                        Send
                      </button>
                      <button className="w-full mb-2.5">
                        <a href="/" className="link-btn">
                          Cancel
                        </a>
                      </button>
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
