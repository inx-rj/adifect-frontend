import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { validations } from "../../../utils";
import {
  agencyProfileEmailChange,
  agencyProfilePasswordChange,
} from "../../../redux/actions/agency-profile-account";
import { logout } from "../../../redux/actions/auth-actions";

const Creator_profile_account_setting = () => {
  const [email, setemail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [password, setPassword] = useState("");
  const [comPassword, setComPassword] = useState("");
  const [render, setRender] = useState(false);
  const [render1, setRender1] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [errors, setErrors] = useState({
    email: null,
    emailPassword: null,
    currPassword: null,
    password: null,
    comPassword: null,
  });

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.authReducer);
  const { success: emailChange, error: emailError } = useSelector(
    (state) => state.agencyProfileEmailChangeReducer
  );

  const { success: passwordChange, error: passwordError } = useSelector(
    (state) => state.agencyProfilePasswordChangeReducer
  );
  // console.log(success);
  // console.log(error);

  useEffect(() => {
    if (emailChange && render) {
      swal({
        title: "Successfully Complete",
        text: "Successfully change the email",
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 5000,
      });
      // setTimeout(() => {
      //   setLoader1(false);
      // }, 1500);
      setRender(false);
      setOpen(false);
      dispatch(logout());
    }
    if (emailError && render) {
      swal({
        title: "Error",
        text: emailError,
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 5000,
      });
      // setTimeout(() => {
      //   setLoader1(false);
      // }, 1500);
      setRender(false);
    }
  }, [dispatch, emailError, emailChange]);

  useEffect(() => {
    if (passwordChange && render1) {
      swal({
        title: "Successfully Complete",
        text: "Successfully changed the email",
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 5000,
      });
      // setTimeout(() => {
      //   setLoader1(false);
      // }, 1500);
      setRender1(false);
      setOpen(false);
      dispatch(logout());
    }
    if (passwordError && render1) {
      swal({
        title: "Error",
        text: passwordError,
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 5000,
      });
      // setTimeout(() => {
      //   setLoader1(false);
      // }, 1500);
      setRender1(false);
    }
  }, [dispatch, passwordError, passwordChange]);

  // useEffect(() => {
  //   dispatch(agencyProfileSetting());
  // }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const validationSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      email: validations.email(email),
      emailPassword: validations.emailPassword(emailPassword),
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }

    const sameEmail = {
      email:
        email == userData?.user?.email &&
        "Cannot change email to current email",
    };
    setErrors(sameEmail);

    if (Object.values(sameEmail).filter((value) => value).length) {
      return;
    }

    submitHandler();
  };

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", emailPassword);
    dispatch(agencyProfileEmailChange(formData));
    setRender(true);
  };

  const validationPassword = (e) => {
    e.preventDefault();
    const tempErrors = {
      currPassword: validations.currPassword(currPassword),
      password: validations.password(password),
      comPassword: validations.confirmPassword(password, comPassword),
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {

      return;
    }
    submitHandlerPassword();
  };

  const submitHandlerPassword = () => {
    // alert("clcik");
    const formData = new FormData();
    formData.append("current_password", currPassword);
    formData.append("new_password", password);
    formData.append("confirm_password", comPassword);
    dispatch(agencyProfilePasswordChange(formData));
    setRender1(true);
  };

  return (
    <>
      <div className="allContentOfAccountSettings">
        <div className="yelloBoxAccountSetting">
          <p>
            You need to set up your payment profile before you can get paid for
            jobs Set up Payments
          </p>
        </div>
        <div>
          <div className="emailAddresAccountSett">
            <div className="accountsettingEmailname">
              <h3>Email Address</h3>
              {userData?.user?.email}
            </div>
            <div className="ChangeButtonDiv">
              <button onClick={handleClickOpen} className="ChangeButtonAcS">
                Change
              </button>
            </div>
            <div className="donkey">
              <Dialog
                className="profileImgDialogagency"
                open={open}
                onClose={handleClose}
              >
                <DialogTitle className="profileImgHeadingAnew">
                  <div className="Ajobshare">
                    <h2>Change your email </h2>

                    <span className="closebuttonsec" onClick={handleClose}>
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                  </div>
                </DialogTitle>
                <div className="dialogcontent_and_actions_new">
                  <DialogContent className="ChangeEmailAContent">
                    <div className="updateEmailBelowPop">
                      <p>
                        Update your email below. There will be a new
                        verification email sent that you will need to use to
                        verify your new email address.
                      </p>
                    </div>
                    <h3 className="ChangeCurrentEmailPop">Current Email</h3>
                    <p className="ChangeCurrentEmNamelPop">
                      {userData?.user?.email}
                    </p>
                    <div className="NewMailNameAndInput">
                      <div
                        className={
                          errors.email
                            ? "inputCntnr error"
                            : "inputCntnr CategoryinputH"
                        }
                      >
                        <h3 className="nameOrEmailText">New Email</h3>
                        <input
                          className="NameorEmailNewPop"
                          type="email"
                          placeholder="Email Address"
                          onChange={(e) => {
                            setemail(e.target.value);
                            setErrors({ ...errors, email: null });
                          }}
                          value={email}
                          required
                          autoComplete="nope"
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
                    </div>
                    <div className="NewMailNameAndInput">
                      <div
                        style={{ width: "100%" }}
                        className={
                          errors.emailPassword ? "InCntnr error" : "InCntnr"
                        }
                      >
                        <h3 className="nameOrEmailText">Current Password</h3>
                        <input
                          className="NameorEmailNewPop"
                          type="password"
                          placeholder="Password"
                          value={emailPassword}
                          onChange={(e) => {
                            setErrors({ ...errors, emailPassword: null });
                            setEmailPassword(e.target.value);
                          }}
                          required
                          autoComplete="new-password"
                        />
                        <span
                          style={{
                            color: "#D14F4F",
                            opacity: errors.emailPassword ? 1 : 0,
                          }}
                        >
                          {errors.emailPassword ?? "valid"}
                        </span>
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <div className="sharebuttonjobcontent">
                      <div className="cancelButtonnewWithSave">
                        <button
                          onClick={handleClose}
                          className="canceButtonnewPop"
                        >
                          Cancel
                        </button>
                        <button
                          className="shareNewPopPublic"
                          onClick={validationSubmit}
                        >
                          Save Email
                        </button>
                      </div>
                    </div>
                  </DialogActions>
                </div>
              </Dialog>
            </div>
          </div>
          <div className="emailAddresAccountSett">
            <div className="accountsettingEmailname">
              <h3>Password</h3>
              <span>Password must be at least 7 characters long</span>
            </div>
            <div className="ChangeButtonDiv">
              <button onClick={handleClickOpen2} className="ChangeButtonAcS">
                Change
              </button>
              <Dialog
                className="profileImgDialogagency"
                open={open2}
                onClose={handleClose2}
              >
                <DialogTitle className="profileImgHeadingAnew">
                  <div className="Ajobshare">
                    <h2>Change your password </h2>

                    <span className="closebuttonsec" onClick={handleClose2}>
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                  </div>
                </DialogTitle>
                <div className="dialogcontent_and_actions_new">
                  <DialogContent className="ChangeEmailAContent">
                    <div className="updateEmailBelowPop">
                      <p>
                        Update your password below. A confirmation email will be
                        sent to your account email address.
                      </p>
                    </div>
                    <div className="NewMailNameAndInput">
                      <div
                        style={{ width: "100%" }}
                        className={
                          errors.currPassword ? "InCntnr error" : "InCntnr"
                        }
                      >
                        <h3 className="nameOrEmailText">Current Password</h3>
                        <input
                          className="NameorEmailNewPop"
                          type="password"
                          placeholder="Password"
                          value={currPassword}
                          onChange={(e) => {
                            setErrors({ ...errors, currPassword: null });
                            setCurrPassword(e.target.value);
                          }}
                          required
                        />
                        <span
                          style={{
                            color: "#D14F4F",
                            opacity: errors.currPassword ? 1 : 0,
                          }}
                        >
                          {errors.currPassword ?? "valid"}
                        </span>
                      </div>
                    </div>
                    <div className="NewMailNameAndInput">
                      <div
                        style={{ width: "100%" }}
                        className={
                          errors.password ? "InCntnr error" : "InCntnr"
                        }
                      >
                        <h3 className="nameOrEmailText">New Password</h3>
                        <input
                          className="NameorEmailNewPop"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => {
                            setErrors({ ...errors, password: null });
                            setPassword(e.target.value);
                          }}
                          required
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
                    </div>
                    <div className="NewMailNameAndInput">
                      <div
                        style={{ width: "100%" }}
                        className={
                          errors.comPassword ? "InCntnr error" : "InCntnr"
                        }
                      >
                        <h3 className="nameOrEmailText">
                          Confirm New Password
                        </h3>
                        <input
                          className="NameorEmailNewPop"
                          type="password"
                          placeholder="Password"
                          value={comPassword}
                          onChange={(e) => {
                            setErrors({ ...errors, comPassword: null });
                            setComPassword(e.target.value);
                          }}
                          required
                        />
                        <span
                          style={{
                            color: "#D14F4F",
                            opacity: errors.comPassword ? 1 : 0,
                          }}
                        >
                          {errors.comPassword ?? "valid"}
                        </span>
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <div className="sharebuttonjobcontent">
                      <div className="cancelButtonnewWithSave">
                        <button
                          onClick={handleClose2}
                          className="canceButtonnewPop"
                        >
                          Cancel
                        </button>
                        <button
                          className="shareNewPopPublic"
                          onClick={validationPassword}
                        >
                          Save Password
                        </button>
                      </div>
                    </div>
                  </DialogActions>
                </div>
              </Dialog>
            </div>
          </div>
          <div className="emailAddresAccountSett">
            <div className="accountsettingEmailname">
              <h3>Payments</h3>
              <span>
                This still needs to be set up before you can get paid for jobs
              </span>
            </div>
            <div className="ChangeButtonDiv">
              <button className="ChangeButtonAcS">Set Up</button>
            </div>
          </div>
          <div className="emailAddresAccountSett">
            <div className="accountsettingEmailname">
              <h3>Close Account</h3>
              <span>Closing your Adifect account is irreversable</span>
            </div>
            <div className="ChangeButtonDiv">
              <button onClick={handleClickOpen3} className="ChangeButtonAcS">
                Close Account
              </button>

              <Dialog
                className="profileImgDialogagency"
                open={open3}
                onClose={handleClose3}
              >
                <DialogTitle className="profileImgHeadingAnew">
                  <div className="Ajobshare">
                    <h2>Close your Adifect account</h2>

                    <span className="closebuttonsec" onClick={handleClose3}>
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                  </div>
                </DialogTitle>
                <div className="dialogcontent_and_actions_new">
                  <DialogContent className="ChangeEmailAContent">
                    <div className="updateEmailBelowPop">
                      <p>
                        Closing your Adifect account is irreversable. Please
                        verify that this is what you want to do.
                      </p>
                    </div>
                    <div className="CloseAdifectAccCheckText">
                      <input type="checkbox" id="vehicle1" name="vehicle1" />
                      <label for="vehicle1"> Yes I’m sure</label>
                    </div>
                    <div className="NewMailNameAndInput">
                      <h3 className="nameOrEmailText">Type Your Password</h3>
                      <input
                        className="NameorEmailNewPop"
                        type="email"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="accountCloseUpperText">
                      <p>
                        Legalese about what happens to remaining payments,
                        remaining jobs, etc.{" "}
                      </p>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <div className="sharebuttonjobcontent">
                      <div className="cancelButtonnewWithSave">
                        <button
                          onClick={handleClose3}
                          className="canceButtonnewPop"
                        >
                          Cancel
                        </button>
                        <button className="shareNewPopPublic">
                          Close Account
                        </button>
                      </div>
                    </div>
                  </DialogActions>
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Creator_profile_account_setting;
