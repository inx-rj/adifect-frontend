import { Button } from "@mui/material";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import { Images } from "helper/images";
import { isEmpty } from "helper/utility/customFunctions";
import { useState } from "react";
import { GET_USER_DETAILS } from "redux/actions/auth/auth.actions";
import { CHANGE_USER_EMAIL } from "redux/actions/profile/profile.actions";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "redux/store";
import swal from "sweetalert";


const EmailContent = ({setExpanded}) => {

    // Redux
    const dispatch = useAppDispatch();
    const userProfile = useAppSelector(GET_USER_PROFILE_DATA);


    // React State
    const [emailData, setEmailData] = useState({
        newEmail: '',
        currPassword: ''
    });
    const [errors, setErrors] = useState({
        newEmail: null,
        currPassword: null,
      });


    // Submit email data 
    const submitHandler = () => {
        const formData = new FormData();
        formData.append("email", emailData?.["newEmail"]);
        formData.append("password", emailData?.["currPassword"]);

        dispatch(CHANGE_USER_EMAIL(formData))
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
              setEmailData({newEmail: '',currPassword: ''})
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
            newEmail: isEmpty(emailData?.["newEmail"]) ? "New email is required" : 
            !emailData?.["newEmail"].toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) ? "Email is not valid" : "",
            currPassword: isEmpty(emailData?.["currPassword"]) ? "Please enter your current password" : 
            emailData?.["currPassword"]?.length < 7 ? 'Atleast 7 characters required' : "",
        };
        setErrors(tempErrors);

        if (Object.values(tempErrors).filter((value) => value).length) {
            return;
        }
        submitHandler();
    }

   

    return <>
        <p className="mb-3" >Update your email below. There will be a new verification email sent that you will need to use to verify your new email address.
        </p>
        {userProfile?.loading && <div className="relative min-h-[200px] p-4 [&>.spinner-container-bg]:bg-white" ><LoadingSpinner /></div>}
        {!userProfile?.loading && <><div className="grid grid-cols-1 xl:grid-cols-3 gap-3 mb-4" >
            <div className="input-fields-wrapper">
                <label>Current Email</label>
                <input
                    className='input-style'
                    type="text"
                    name="email"
                    id="email"
                    disabled
                    value={userProfile?.data?.email}
                />
            </div>
            <div className="input-fields-wrapper">
                <label>New Email</label>
                <input
                    className={
                        errors?.["newEmail"] ? "input-style input-err-style" : "input-style"
                    }
                    type="text"
                    name="newEmail"
                    id="newEmail"
                    placeholder="Enter New Email"
                    value={emailData?.["newEmail"]}
                    onChange={(e) => {
                        setEmailData({ ...emailData, [e.target.name]: e.target.value });
                    }}
                />
                <span className="err-tag">{errors?.["newEmail"] ?? " "}</span>
            </div>
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
                    value={emailData?.["currPassword"]}
                    onChange={(e) => {
                        setEmailData({ ...emailData, [e.target.name]: e.target.value });
                    }}
                />
                <span className="err-tag">{errors?.["currPassword"] ?? ""}</span>
            </div>
        </div>
        <div className="flex gap-3" >
            <Button variant="contained" className="btn btn-primary" onClick={validationSubmit} >Save</Button>
            <Button variant="outlined" className="btn btn-outline" onClick={() => setExpanded(false)} >Cancel</Button>
        </div>
        </>}
    </>
}

export default EmailContent;