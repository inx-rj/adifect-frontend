import { Button } from "@mui/material";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import { Images } from "helper/images";
import { isEmpty } from "helper/utility/customFunctions";
import { useState } from "react";
import { GET_USER_DETAILS } from "redux/actions/auth/auth.actions";
import { CHANGE_USER_PASSWORD } from "redux/actions/profile/profile.actions";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "redux/store";
import swal from "sweetalert";


const PasswordContent = ({setExpanded}) => {

    // Redux
    const dispatch = useAppDispatch();
    const userProfile = useAppSelector(GET_USER_PROFILE_DATA);


    // React State
    const [passwordData, setPasswordData] = useState({
        currPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        currPassword: null,
        newPassword: null,
        confirmPassword: null,
      });


    // Submit passowrd data 
    const submitHandler = () => {
        const formData = new FormData();
        formData.append("current_password", passwordData?.["currPassword"]);
        formData.append("new_password", passwordData?.["newPassword"]);
        formData.append("confirm_password", passwordData?.["confirmPassword"]);

        dispatch(CHANGE_USER_PASSWORD(formData))
            .then((res) => {
              swal({
                title: "Successfully Complete",
                text: res.data.message.length
                  ? res.data.message
                  : res.data.message,
                className: "successAlert-login",
                icon: Images.Logo,
                buttons: {
                  OK: false,
                },
                timer: 1500,
              });
              dispatch(GET_USER_DETAILS());
              setPasswordData({currPassword: '', newPassword: '', confirmPassword:''})
            })
            .catch((err) => {
              swal({
                title: "Error",
                text: err.response.data.message.length
                  ? err.response.data.message
                  : err.response.data.message,
                className: "errorAlert",
                icon: Images.ErrorLogo,
                buttons: {
                  OK: false,
                },
                timer: 5000,
              });
            });
    };

    //   Validate Email form data 
    const validationSubmit = (e) => {
        
        e.preventDefault();
        const tempErrors = {
            currPassword: isEmpty(passwordData?.["currPassword"]) ? "Please enter your current password" : 
                            passwordData?.["currPassword"]?.length < 7 ? 'Atleast 7 characters required' : "",
            newPassword: isEmpty(passwordData?.["newPassword"]) ? "Please enter your new password" : 
                            passwordData?.["newPassword"]?.length < 7 ? 'Atleast 7 characters required' : "",
            confirmPassword: isEmpty(passwordData?.["confirmPassword"]) ? "Please enter your confirm password" : 
                            passwordData?.["confirmPassword"]?.length < 7 ? 'Atleast 7 characters required' : 
                            passwordData?.["newPassword"] !== passwordData?.["confirmPassword"] ? "Passwords do not match" : "",
        };
        setErrors(tempErrors);

        if (Object.values(tempErrors).filter((value) => value).length) {
            return;
        }
        submitHandler();
    }

   

    return <>
        <p className="mb-3" >Update your password below. A confirmation email will be sent to your account email address.
        </p>
        {userProfile?.loading && <div className="relative min-h-[200px] p-4 [&>.spinner-container-bg]:bg-white" ><LoadingSpinner /></div>}
        {!userProfile?.loading && <><div className="grid grid-cols-1 xl:grid-cols-3 gap-3 mb-4" >
        <div className="input-fields-wrapper">
                <label>Current Password</label>
                <input
                    className={
                        errors?.["currPassword"]
                        ? "input-style input-err-style"
                        : "input-style"
                    }
                    type="password"
                    name="currPassword"
                    id="currPassword"
                    placeholder="Enter Current Password"
                    value={passwordData?.["currPassword"]}
                    onChange={(e) => {
                        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
                    }}
                />
                <span className="err-tag">{errors?.["currPassword"] ?? ""}</span>
            </div>
            <div className="input-fields-wrapper">
                <label>New Password</label>
                <input
                    className={
                        errors?.["newPassword"] ? "input-style input-err-style" : "input-style"
                    }
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="Enter new Password"
                    value={passwordData?.["newPassword"]}
                    onChange={(e) => {
                        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
                    }}
                />
                <span className="err-tag">{errors?.["newPassword"] ?? " "}</span>
            </div>
            <div className="input-fields-wrapper">
                <label>Confirm New Password</label>
                <input
                    className={
                        errors?.["confirmPassword"]
                        ? "input-style input-err-style"
                        : "input-style"
                    }
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Enter new confirm Password"
                    value={passwordData?.["confirmPassword"]}
                    onChange={(e) => {
                        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
                    }}
                />
                <span className="err-tag">{errors?.["confirmPassword"] ?? ""}</span>
            </div>
        </div>
        <div className="flex gap-3" >
            <Button type="submit" variant="contained" className="btn btn-primary" onClick={validationSubmit} >Save</Button>
            <Button variant="outlined" className="btn btn-outline" onClick={() => setExpanded(false)} >Cancel</Button>
        </div>
        </>}
    </>
}

export default PasswordContent;