import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  validateUsername,
  firstName,
  lastName,
  validateEmail,
  validatePassword,
  confirmPassword,
  validateRole,
} from "../../helper/validations";
import { MenuItem, Select } from "@mui/material";
import { Images } from "../../helper/images";
import {
  REGISTER_USER,
  TRIGGER_LOGIN,
} from "../../redux/actions/auth/auth.actions";
import swal from "sweetalert";
import { useAppDispatch } from "../../redux/store";

export default function Signup() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [role, setRole] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    confirmPassword: null,
    role: null,
  });
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [decryptedJobId, setDecryptedJobId] = useState("");
  const [redirectMyUrl, setRedirectMyUrl] = useState(false);
  const [copyMyUrl, setCopyMyUrl] = useState(false);

  useEffect(() => {
    let redirectUrl = localStorage.getItem("redirJob");
    let copiedUrl = localStorage.getItem("cop-url");
    if (redirectUrl) {
      if (copiedUrl) {
        setCopyMyUrl(true);
        localStorage.removeItem("cop-url");
      } else {
        setCopyMyUrl(false);
      }
      setRedirectMyUrl(true);
      setDecryptedJobId(redirectUrl);
      setRole("1");
    } else {
      setRedirectMyUrl(false);
    }
  }, []);

  useEffect(() => {
    // dispatch({ type: USER_LOGOUT });
    // dispatch(defaultPageLoader());
    const handler = () => {
      setIsOpen(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const menuProps: any = {
    variant: "menu",
    disableScrollLock: true,
  };

  // const { loading } = useSelector((state) => state.loaderReducer);

  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors: any = {
      username: validateUsername(username),
      firstname: firstName(firstname),
      lastname: lastName(lastname),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: confirmPassword(password, confirm_password),
      role: validateRole(role),
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

  const submitHandler = async (e) => {
    setIsLoading(true);

    const data = {
      username: username,
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
      confirm_password: confirm_password,
      role: role,
      email_verify: redirectMyUrl && !copyMyUrl ? true : false,
    };
    dispatch(REGISTER_USER(data))
      .then((res) => {
        setTimeout(() => {
          setIsLoading(true);
        }, 1000);
        if (redirectMyUrl && !copyMyUrl) {
          swal({
            title: "Successfully Complete",
            // text: res.data.message,
            text: "Login success",
            icon: Images.Logo,
            // buttons: false,
            timer: 5000,
          });
          //   dispatch(login({ email: email, password }));
          dispatch(TRIGGER_LOGIN({ email: email, password }));
          localStorage.removeItem("redirJob");

          setTimeout(() => {
            navigate(`/jobs/details/${decryptedJobId}`);
          }, 400);
        } else {
          swal({
            title: "Successfully Complete",
            // text: res?.data?.message,
            icon: Images.Logo,
            // buttons: false,
            timer: 5000,
          });
          setTimeout(() => {
            navigate("/thank-you");
          }, 5000);
        }
      })
      .catch((err) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1);
        if (
          err.response.data.message.non_field_errors ==
          "User Name already taken"
        ) {
          const tempErrors: any = {
            username: "Username already taken",
          };
          setErrors(tempErrors);
          return;
        } else if (
          err.response.data.message.non_field_errors == "Email already exist"
        ) {
          const tempErrors: any = {
            email: "Email already taken",
          };
          setErrors(tempErrors);
          return;
        } else {
          const tempErrors: any = {
            email: "Email already taken",
            username: "Username already taken",
          };
          setErrors(tempErrors);
          return;
        }
      });
  };

  return (
    <>
      {/* {loading ? <LoadingSpinner /> : isLoading ? <LoadingSpinner /> : <></>} */}
      <div className="login-signup-wrapper flex items-center p-20 justify-center min-h-screen">
        <div className="card max-w-[650px] ">
          <div className="px-5">
            {/* <div className="mt-2 mb-5"> */}
            <div className="mt-2.5 inline-flex items-center justify-center w-full h-full">
              <img src={Images.Logo} className="h-auto max-w-[200px]" alt="" />
            </div>
            <div className="text-center">
              <h2 className="mb-2 mt-3 text-xl font-bold">
                Create your adifect account
              </h2>
              {/* </div> */}
            </div>
            <form onSubmit={validateSubmit} id="websiteUserRegisterForm">
              <div className="form-group-one grid grid-cols-2 gap-5">
                <div
                  className={
                    errors.username
                      ? "input-fields-wrapper text-danger"
                      : "input-fields-wrapper"
                  }
                >
                  <h5 className="form-label my-2 font-medium">Username:</h5>
                  <input
                    className="input-style"
                    type="text"
                    autoComplete="nope"
                    value={username}
                    onChange={(e) => {
                      setErrors({ ...errors, username: null });
                      setUsername(e.target.value);
                    }}
                    name="f_Username"
                    id="Username"
                  />

                  {errors.username && (
                    <span className="error-style">
                      {errors.username ?? "valid"}
                    </span>
                  )}
                </div>
                <div
                  className={
                    errors.firstname
                      ? "input-fields-wrapper text-danger"
                      : "input-fields-wrapper"
                  }
                >
                  <h5 className="form-label my-2 font-medium">First Name:</h5>
                  <input
                    className="input-style"
                    type="text"
                    autoComplete="nope"
                    value={firstname}
                    onChange={(e) => {
                      setErrors({ ...errors, firstname: null });
                      setFirstName(e.target.value);
                    }}
                    name="f_name"
                    id="firstname"
                  />
                  {errors.firstname && (
                    <span className="error-style">
                      {errors.firstname ?? "valid"}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group-one grid grid-cols-2 gap-4">
                <div
                  className={
                    errors.lastname
                      ? "input-fields-wrapper text-danger"
                      : "input-fields-wrapper"
                  }
                >
                  <h5 className="form-label my-2 font-medium">Last Name:</h5>
                  <input
                    className="input-style"
                    type="text"
                    autoComplete="nope"
                    value={lastname}
                    onChange={(e) => {
                      setErrors({ ...errors, lastname: null });
                      setLastName(e.target.value);
                    }}
                    name="l_name"
                    id="lastname"
                  />
                  {errors.lastname && (
                    <span className="error-style">
                      {errors.lastname ?? "valid"}
                    </span>
                  )}
                </div>
                <div
                  className={
                    errors.email
                      ? "input-fields-wrapper text-danger"
                      : "input-fields-wrapper"
                  }
                >
                  <h5 className="form-label my-2 font-medium">
                    Email Address:
                  </h5>
                  <input
                    className="input-style"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setErrors({ ...errors, email: null });
                      setEmail(e.target.value);
                    }}
                    name="email"
                    id="email"
                  />
                  {errors.email && (
                    <span className="error-style">
                      {errors.email ?? "valid"}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group-one grid grid-cols-2 gap-4">
                <div
                  className={
                    errors.password
                      ? "input-fields-wrapper text-danger"
                      : "input-fields-wrapper"
                  }
                >
                  <h5 className="form-label my-2 font-medium">
                    Password: (must be 7 or more)
                  </h5>
                  <input
                    className="input-style"
                    value={password}
                    autoComplete="new-password"
                    onChange={(e) => {
                      setErrors({ ...errors, password: null });
                      setPassword(e.target.value);
                    }}
                    type="password"
                    name="password"
                    id="password"
                  />
                  {errors.password && (
                    <span className="error-style">
                      {errors.password ?? "valid"}
                    </span>
                  )}
                </div>
                <div
                  className={
                    errors.confirmPassword
                      ? "input-fields-wrapper text-danger"
                      : "input-fields-wrapper"
                  }
                >
                  <h5 className="form-label my-2 font-medium">
                    Confirm Password:
                  </h5>
                  <input
                    className="input-style"
                    value={confirm_password}
                    onChange={(e) => {
                      setErrors({ ...errors, confirmPassword: null });
                      setConfirmPassword(e.target.value);
                    }}
                    type="password"
                    name="confirm_password"
                    // Agency
                    id="confirm_password"
                  />
                  {errors.confirmPassword && (
                    <span className="error-style">
                      {errors.confirmPassword ?? "valid"}
                    </span>
                  )}
                </div>
              </div>
              {!redirectMyUrl && (
                <div className="form-group-one grid grid-cols-2 gap-4">
                  <div
                    className={
                      errors.role
                        ? "input-fields-wrapper text-danger"
                        : "input-fields-wrapper"
                    }
                  >
                    <h5 className="form-label Role_1 my-2 font-medium">
                      Role:{" "}
                    </h5>
                    <Select
                      className={`${
                        role === ""
                          ? "!text-[#939393] hover:border-[#939393] "
                          : "text-[#000]"
                      }bg-[#f9fbfc] !rounded w-full !text-sm !font-semibold`}
                      value={role}
                      open={isOpen}
                      disabled={redirectMyUrl}
                      onOpen={() => {
                        setIsOpen(true);
                      }}
                      onClose={() => {
                        setIsOpen(false);
                      }}
                      MenuProps={menuProps}
                      id="role"
                      onChange={(e) => {
                        setRole(e.target.value);
                        setErrors({ ...errors, role: null });
                      }}
                      // disableScrollLock={true}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value=""> Select Role </MenuItem>
                      <MenuItem value="1">Creator</MenuItem>
                      <MenuItem value="2">Agency</MenuItem>
                    </Select>
                    {errors.role && (
                      <span className="error-style">
                        {errors.role ?? "valid"}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="center">
                <input
                  className="btn btn-primary w-full max-w-[335px] flex justify-center my-0 mx-auto mt-4"
                  type="submit"
                  value="Create Account"
                />
                <p className="mt-3 text-center">
                  By signing up, you agree to our Privacy Policy
                </p>{" "}
                <div className="w-full text-center font-semibold mb-2.5 text-theme">
                  <Link className="Signbn" to="/">
                    Sign In Instead.
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
