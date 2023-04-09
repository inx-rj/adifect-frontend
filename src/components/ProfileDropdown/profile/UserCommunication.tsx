import { AddOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useSingleEffect } from "react-haiku";
import { TRIGGER_PROFILE_COMMUN_LIST } from "redux/actions/profile/commun.actions";
import { useAppDispatch } from "redux/store";

const UserCommunication = () => {
    const dispatch = useAppDispatch();

    const [show, setShow] = useState(false);

    const handleAddComm = () => {
        setShow(true);
      };

      useSingleEffect(()=>{
        dispatch(TRIGGER_PROFILE_COMMUN_LIST());
      })

    return (
        <>
            <h5 className="card-page-title text-base mb-4" >Preferred Communication Methods</h5>
            <p className="card-page-info text-sm" >This is how you’ll be notified when a job is ready for approval, content creators apply for a job, and more. You will be contacted by all methods you add below.</p>
            
            {!show && (
              <div className="createCompanyButtonProfileDiv">
                <button
                  className="btn btn-primary flex-center px-3 py-2 gap-2"
                  onClick={handleAddComm}
                >
                  <AddOutlined fontSize="medium" />
                  Add Comm Method
                </button>
              </div>
            )}
        </>
    )
}

export default UserCommunication;