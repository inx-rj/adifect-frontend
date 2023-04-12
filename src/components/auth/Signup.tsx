import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import Logo from "components/common/logo/Logo";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import {
  SET_USER_DATA_LOADING,
  USER_DATA_LOADER,
} from "redux/reducers/auth/auth.slice";

export default function Signup() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userLoader = useAppSelector(USER_DATA_LOADER);

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

  // const [isLoading, setIsLoading] = useState(false);

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
      return;
    }
    submitHandler(e);
  };

  const submitHandler = async (e) => {
    // setIsLoading(true);

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

    dispatch(SET_USER_DATA_LOADING(true));

    dispatch(REGISTER_USER(data))
      .then((res) => {
        // setTimeout(() => {
        //   setIsLoading(true);
        // }, 1000);
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
        // setTimeout(() => {
        //   setIsLoading(false);
        // }, 1);
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
      })
      .finally(() => {
        dispatch(SET_USER_DATA_LOADING(false));
      });
  };

  return (
    <>
      {userLoader && <LoadingSpinner />}
      <div className="login-signup-wrapper">
        <div className="card max-w-[650px] md:px-9 w-full">
          <div className="max-w-[150px] md:max-w-[200px] w-full mx-auto my-3 h-[65px]">
            <Logo />
          </div>
          <h2 className="card-page-title text-center mb-5">
            Create your adifect account
          </h2>
          <form
            onSubmit={validateSubmit}
            id="websiteUserRegisterForm"
            className="grid md:grid-cols-2 grid-flow-row auto-rows-max gap-x-6"
          >
            <div className="input-fields-wrapper">
              <label>Username:</label>
              <input
                className={
                  errors.username
                    ? "input-style input-err-style"
                    : "input-style"
                }
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
              <span className="err-tag">{errors.username ?? ""}</span>
            </div>
            <div className="input-fields-wrapper">
              <label>First Name:</label>
              <input
                className={
                  errors.username
                    ? "input-style input-err-style"
                    : "input-style"
                }
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
              <span className="err-tag">{errors.firstname ?? ""}</span>
            </div>

            <div className="input-fields-wrapper">
              <label>Last Name:</label>
              <input
                className={
                  errors.username
                    ? "input-style input-err-style"
                    : "input-style"
                }
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
              <span className="err-tag">{errors.lastname ?? ""}</span>
            </div>
            <div className="input-fields-wrapper">
              <label>Email Address:</label>
              <input
                className={
                  errors.username
                    ? "input-style input-err-style"
                    : "input-style"
                }
                type="text"
                value={email}
                onChange={(e) => {
                  setErrors({ ...errors, email: null });
                  setEmail(e.target.value);
                }}
                name="email"
                id="email"
              />
              <span className="err-tag">{errors.email ?? ""}</span>
            </div>

            <div className="input-fields-wrapper">
              <label>Password: (must be 7 or more)</label>
              <input
                className={
                  errors.username
                    ? "input-style input-err-style"
                    : "input-style"
                }
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
              <span className="err-tag">{errors.password ?? ""}</span>
            </div>
            <div className="input-fields-wrapper">
              <label>Confirm Password:</label>
              <input
                className={
                  errors.username
                    ? "input-style input-err-style"
                    : "input-style"
                }
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
              <span className="err-tag">{errors.confirmPassword ?? ""}</span>
            </div>
            {!redirectMyUrl && (
              <div
                className={
                  errors.role
                    ? "input-fields-wrapper error-style"
                    : "input-fields-wrapper"
                }
              >
                <label>Role: </label>
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
                <span className="err-tag">{errors.role ?? ""}</span>
              </div>
            )}
            <div className="md:col-start-1 md:col-end-3 text-center mt-uni-gap">
              <input
                className="btn btn-primary w-full md:max-w-[335px] text-base"
                type="submit"
                value="Create Account"
              />
              <p className="card-page-info mt-uni-gap">
                By signing up, you agree to our Privacy Policy
              </p>{" "}
              <Link className="btn-link" to="/login">
                Sign In Instead
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
