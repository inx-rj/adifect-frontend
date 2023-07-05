import { Button, Checkbox, FormControlLabel } from "@mui/material";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import { Images } from "helper/images";
import { isEmpty } from "helper/utility/customFunctions";
import { useState } from "react";
import { GET_USER_DETAILS } from "redux/actions/auth/auth.actions";
import { CHANGE_USER_PASSWORD, CLOSE_USER_ACCOUNT } from "redux/actions/profile/profile.actions";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "redux/store";
import swal from "sweetalert";


const CloseAccountContent = ({setExpanded}) => {

    // Redux
    const dispatch = useAppDispatch();
    const userProfile = useAppSelector(GET_USER_PROFILE_DATA);


    // React State
    const [closeAccountData, setCloseAccountData] = useState({
        areYouSure: true,
        currPassword: '',
    });
    const [errors, setErrors] = useState({
        areYouSure: null,
        currPassword: null,
      });


    // Submit passowrd data 
    const submitHandler = () => {
        const formData = new FormData();
        // @ts-ignore 
        formData.append("sure", closeAccountData?.["areYouSure"]);
        formData.append("password", closeAccountData?.["currPassword"]);

        console.log("SUBMIT", closeAccountData, formData)

        // dispatch(agencyProfileEmailChange(formData));
        dispatch(CLOSE_USER_ACCOUNT(formData))
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
              setCloseAccountData({areYouSure: false, currPassword: ''})
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
            areYouSure: isEmpty(closeAccountData?.["areYouSure"]) ? "Please confirm you surity" : "",
            currPassword: isEmpty(closeAccountData?.["currPassword"]) ? "Please enter your current password" : 
                            closeAccountData?.["currPassword"]?.length < 7 ? 'Atleast 7 characters required' : "",
        };
        setErrors(tempErrors);

        if (Object.values(tempErrors).filter((value) => value).length) {
            return;
        }
        submitHandler();
    }

   

    return <>
        <p className="mb-3" >Closing your Adifect account is irreversable. Please verify that this is what you want to do.
        </p>
        {userProfile?.loading && <div className="relative min-h-[200px] p-4 [&>.spinner-container-bg]:bg-white" ><LoadingSpinner /></div>}
        {!userProfile?.loading && <>
            <div className='mb-5' >
            <FormControlLabel 
                required 
                control={
                    <Checkbox 
                        name="areYouSure"
                        defaultChecked={closeAccountData?.["areYouSure"]} 
                        checked={closeAccountData?.["areYouSure"]} 
                        onChange={(e) => {
                            setCloseAccountData({ ...closeAccountData, [e.target.name]: e.target.value });
                        }}
                    />
                } 
                label="Yes I’m sure" 
            />
                
            </div>
            <div className="grid grid-cols-1 gap-3 mb-4" >
        
            <div className="input-fields-wrapper">
                <label>Type Your Password</label>
                <input
                    className={
                        errors?.["currPassword"] ? "input-style input-err-style" : "input-style"
                    }
                    type="password"
                    name="currPassword"
                    id="currPassword"
                    placeholder="Enter new Password"
                    value={closeAccountData?.["currPassword"]}
                    onChange={(e) => {
                        setCloseAccountData({ ...closeAccountData, [e.target.name]: e.target.value });
                    }}
                />
                <span className="err-tag">{errors?.["currPassword"] ?? " "}</span>
            </div>
            <p className="text-sm text-disable" >Legalese about what happens to remaining payments, remaining jobs, etc.</p>
        </div>
        <div className="flex gap-3" >
            <Button type="submit" variant="contained" className="btn btn-primary" onClick={validationSubmit} >Save</Button>
            <Button variant="outlined" className="btn btn-outline" onClick={() => setExpanded(false)} >Cancel</Button>
        </div>
        </>}
    </>
}

export default CloseAccountContent;