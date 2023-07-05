import { AddOutlined, BorderColorRounded, DeleteForeverRounded, FileDownloadDone, Upgrade } from "@mui/icons-material";
import { Checkbox, FormControl, FormControlLabel, MenuItem, Select } from "@mui/material";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import { isEmpty } from "helper/utility/customFunctions";
import { isValidPhoneNumber, validateEmail } from "helper/validations";
import { useState } from "react";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import { DELETE_PROFILE_COMMUN_LIST, SUBMIT_PROFILE_COMMUN_LIST, TRIGGER_PROFILE_COMMUN_LIST, UPDATE_PROFILE_COMMUN_LIST } from "redux/actions/profile/profile.actions";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { CommunDataType, GET_PROFILE_COMMUN } from "redux/reducers/profile/commun.slice";
import { useAppDispatch, useAppSelector } from "redux/store";

const UserCommunication = () => {
  // Redux state 
  const dispatch = useAppDispatch();
  const communicationResult = useAppSelector(GET_PROFILE_COMMUN);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  // React State
  const methodOptions = [
    { label: "Email", value: 0 },
    { label: "SMS", value: 1 },
    { label: "WhatsApp", value: 2 },
    { label: "Slack", value: 3 },
  ];
  const [communicationData, setCommunicationData] = useState<CommunDataType[]>([{
    communication_mode: null,
    mode_value: "",
    is_preferred: false,
    user: userProfile?.data?.id,
    editField: true
  }]);
  const [errors, setErrors] = useState([{
    communication_mode: null,
    mode_value: null,
    is_preferred: null,
  }]);
  const handleChannelInputChange = (event, index) => {
    let values = [...communicationData];
    values[index][event.target.name] = event.target.value;
    if (event.target.name === 'communication_mode') {
      values[index]['mode_value'] = '';
      if(values[index]['mode_value']) {
        let errorValue;
        errorValue = [...errors];
        errorValue[index]['mode_value'] = '';
        setErrors(errorValue)
      }
    }

    if(event.target.name === 'is_preferred') {
      values[index]['is_preferred'] = event.target.checked;
    }

    setCommunicationData(values);

  };

  const addMoreField = () => {
    const addValues = [...communicationData];
    addValues?.push({
      communication_mode: null,
      mode_value: "",
      is_preferred: false,
      user: userProfile?.data?.id,
      editField: false
    });
    setCommunicationData(addValues);
  };

  const setEditModeField = (methodIndex) => {
    let editModeValues;
    editModeValues = [...communicationData];
    editModeValues[methodIndex]['editField'] = true;
    setCommunicationData(editModeValues);
  };


  const removeField = (index) => {
    if(communicationData[index]?.id) {
      dispatch(DELETE_PROFILE_COMMUN_LIST(communicationData[index]?.id))
    } else {
      const removeValues = [...communicationData];
      removeValues?.splice(index, 1);
      setCommunicationData(removeValues);
    }
  };

  useUpdateEffect(() => {
    let data = []
    communicationResult?.data.forEach((item, index) => {
      const updateValue = {
        ...item,
        editField: false
      }
      data.push(updateValue)
    }) 
    setCommunicationData(data);
  }, [communicationResult?.loading])


  useSingleEffect(() => {
    dispatch(TRIGGER_PROFILE_COMMUN_LIST());
  })

  // Submit the 'Add Audiences' modal
  const handleAddCommunication = (communIndex) => {
    dispatch(SUBMIT_PROFILE_COMMUN_LIST(communicationData[`${communIndex}`]))
  };
  // Submit the 'Edit Audiences' modal
  const handleEditCommunication = (communIndex) => {
    // API call
    // @ts-ignore 
    dispatch(UPDATE_PROFILE_COMMUN_LIST(communicationData[communIndex]?.id, communicationData[`${communIndex}`]))
  };
  const submitHandler = (communIndex) => {
    if (!communicationData[`${communIndex}`]?.editField) {
      handleAddCommunication(communIndex);
    } else {
      handleEditCommunication(communIndex);
    }
  };

  // validate inputs
  const inputValidate = (methodIndex) => {
    if (communicationData?.[methodIndex]?.communication_mode === 0) {

      return isEmpty(communicationData?.[methodIndex]?.mode_value) ? "Email is required" :
        validateEmail(communicationData?.[methodIndex]?.mode_value) ? validateEmail(communicationData?.[methodIndex]?.mode_value) : false

    } else if ((communicationData?.[methodIndex]?.communication_mode === 1) || (communicationData?.[methodIndex]?.communication_mode === 2)) {

      return isEmpty(communicationData?.[methodIndex]?.mode_value) ? "Phone number is required" :
        validateEmail(communicationData?.[methodIndex]?.mode_value) ? isValidPhoneNumber(communicationData?.[methodIndex]?.mode_value) : false

    } else if (communicationData?.[methodIndex]?.communication_mode === 3) {
      return isEmpty(communicationData?.[methodIndex]?.mode_value) ? "Slack workspace name is required" : false
    } else {
      return false
    }
  }

  // Validate form data 
  const validateSubmit = (e, communIndex) => {
    e.preventDefault();
    let methodArr = [];
    communicationData?.forEach((methodItem, methodIndex) => {

      const methodSelect = isEmpty(methodItem?.communication_mode) ? "Method is required" : false;

      const chErr = {
        communication_mode: methodSelect,
        mode_value: !methodSelect && inputValidate(methodIndex)
      };

      methodArr.push(chErr);

    });
    setErrors(methodArr);

    if (Object.values(methodArr[communIndex]).filter((value) => value).length) {
      return;
    }
    submitHandler(communIndex);
  };

  return (
    <div className="card border p-4 drop-shadow-none">
      {communicationResult?.loading && <div className="relative min-h-[200px] p-4 [&>.spinner-container-bg]:bg-white" ><LoadingSpinner /></div>}
      {!communicationResult?.loading && <>
        <h5 className="card-page-title text-base mb-4" >Preferred Communication Methods</h5>
        <p className="card-page-info text-sm" >This is how you’ll be notified when a job is ready for approval, content creators apply for a job, and more. You will be contacted by all methods you add below.</p>
        <div className="mb-4">
          <button
            className="btn btn-primary flex-center px-3 py-2 gap-2"
            onClick={addMoreField}
          >
            <AddOutlined fontSize="medium" />
            Add Comm Method
          </button>
        </div>
        {communicationData?.map((communItem, communIndex) => {
          return (
            <div key={communIndex} className="mb-5">
              <div className="flex items-center gap-3" >
                <div className="input-fields-wrapper">
                <FormControl disabled={!communicationData[`${communIndex}`]?.editField} className="w-full">
                    <label>Select Method</label>
                    <Select
                      className="input-style pl-0 border-none [&>.Mui-disabled]:cursor-not-allowed [&.Mui-disabled]:bg-gray-100"
                      value={communicationData?.[communIndex]?.communication_mode}
                      onChange={(event) =>
                        handleChannelInputChange(event, communIndex)
                      }
                      name="communication_mode"
                      placeholder="Select method"
                    >
                      {methodOptions?.map((methodName, methodIndex) => {
                        return (
                          <MenuItem key={methodIndex} value={methodName?.value}>
                            {methodName?.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <span className="err-tag">
                    {errors?.[communIndex]?.communication_mode ?? ""}
                  </span>
                </div>
                <div className="input-fields-wrapper">
                  <label>
                    {communicationData?.[communIndex]?.communication_mode === 0 ? "Email" :
                      communicationData?.[communIndex]?.communication_mode === 1 ? "Phone number" :
                        communicationData?.[communIndex]?.communication_mode === 2 ? "Whatsapp Number" :
                          communicationData?.[communIndex]?.communication_mode === 3 ? "Slack Name" : "Method Type"}
                  </label>
                  <input
                    className={"input-style"}
                    placeholder={communicationData?.[communIndex]?.communication_mode === 0 ? "Enter Email" :
                      communicationData?.[communIndex]?.communication_mode === 1 ? "Enter Phone Number" :
                        communicationData?.[communIndex]?.communication_mode === 2 ? "Enter Whatsapp Number" :
                          communicationData?.[communIndex]?.communication_mode === 3 ? "Enter Slack Workspace Name" : "Method Value"}
                    type={communicationData?.[communIndex]?.communication_mode === 0 ? "email" :
                      communicationData?.[communIndex]?.communication_mode === 1 ? "number" :
                        communicationData?.[communIndex]?.communication_mode === 2 ? "number" :
                          communicationData?.[communIndex]?.communication_mode === 3 ? "text" : "text"}
                    name="mode_value"
                    disabled={!communicationData[`${communIndex}`]?.editField}
                    id="mode_value"
                    value={communicationData?.[communIndex]?.mode_value}
                    onChange={(event) =>
                      handleChannelInputChange(event, communIndex)
                    }
                  />
                  <span className="err-tag">
                    {" "}
                    {errors?.[communIndex]?.mode_value ?? ""}
                  </span>
                </div>

                {communicationResult?.data[`${communIndex}`]?.id && 
                <>
                {!communicationData[`${communIndex}`]?.editField && <span
                  onClick={(event) => {
                    // validateSubmit(event, communIndex);
                    setEditModeField(communIndex);
                  }}
                  className=" block text-right text-sm mr-0 ml-auto cursor-pointer"
                  >
                <BorderColorRounded className="text-warning" />
                </span>}
                {communicationData[`${communIndex}`]?.editField && <span
                  onClick={(event) => {
                    validateSubmit(event, communIndex);
                  }}
                  className=" block text-right text-sm mr-0 ml-auto cursor-pointer"
                  >
                  <Upgrade className="text-primary w-7 h-7" />
                </span>}
                </>
                }
                {!communicationResult?.data[`${communIndex}`]?.id && <span
                  onClick={(event) => validateSubmit(event, communIndex)}
                  className=" block text-right text-sm mr-0 ml-auto cursor-pointer"
                >
                  <FileDownloadDone className="text-success [&.MuiSvgIcon-root]:w-7 [&.MuiSvgIcon-root]:h-7" />
                </span>}
                <span
                  onClick={() => removeField(communIndex)}
                  className="text-danger block text-right text-sm mr-0 ml-auto cursor-pointer"
                >
                  <DeleteForeverRounded />
                </span>
              </div>
              <FormControlLabel
                disabled={!communicationData[`${communIndex}`]?.editField}
                control={
                  <Checkbox
                    name="is_preferred"
                    defaultChecked={communicationData?.[communIndex]?.["is_preferred"]}
                    checked={communicationData?.[communIndex]?.["is_preferred"]}
                    onChange={(event) =>
                      handleChannelInputChange(event, communIndex)
                    }
                  />
                }
                label="Yes I'm sure"
              />
            </div>
          )
        })}
      </>}
    </div>
  )
}

export default UserCommunication;