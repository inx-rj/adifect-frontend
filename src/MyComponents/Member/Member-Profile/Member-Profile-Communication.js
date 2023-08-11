import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import LoadingSpinner from "../../../containers/LoadingSpinner/index";
import { validations } from "../../../utils";
import {
  agencyProfileCommunication,
  getAgencyProfileCommunication,
  agencyProfileCommDelete,
  agencyProfileCommEditDataAction,
} from "../../../redux/actions/agency-profile-account";

const Member_profile_communication = () => {
  const dispatch = useDispatch();

  const [selectData, setSelectData] = useState("");

  const [commData, setCommData] = useState([]);

  const [inputPhone, setInputPhone] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputSms, setInputSms] = useState("");
  const [inputSlack, setInputSlack] = useState("");

  const [editUpdateName, setEditUpdateName] = useState({});

  // ----------------------------------------test state---------------------------------------
  const [rerender, setRerender] = useState(false);
  const [prefeValue, setPrefeValue] = useState(false);
  const [rerender1, setRerender1] = useState(false);
  const [rerender2, setRerender2] = useState(false);

  const [show, setShow] = useState(true);

  const [errors, setErrors] = useState({
    selectData: null,
    inputPhone: null,
    inputEmail: null,
    inputSms: null,
    inputSlack: null,
  });

  const {
    getcommunication,
    loading: getCommsLoading,
    error: getCommError,
    success: successGetComms,
  } = useSelector((state) => state.getAgencyProfileCommunicationReducer);

  const { userData } = useSelector((state) => state.authReducer);

  const {
    success: postcom,
    error: postcomError,
    loading: postLoading,
  } = useSelector((state) => state.agencyProfileCommunicationReducer);

  const {
    success: DeleteComm,
    error: delteError,
    loading: deleteLoading,
  } = useSelector((state) => state.agencyProfileCommDeleteReducer);

  const {
    success: commEditDataSuccess,
    error: commEditDataError,
    loading: updateLoading,
  } = useSelector((state) => state.agencyProfileCommEditDataReducer);

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  useEffect(() => {
    dispatch(getAgencyProfileCommunication());
  }, [postcom, DeleteComm, commEditDataSuccess]);

  useEffect(() => {
    if (commEditDataSuccess && rerender) {
      swal({
        title: "Successfully Complete",
        text: "Updated Successfully",
        className: "successAlert-login",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 3000,
      });
      setRerender(false);
    }
    if (commEditDataError && rerender) {
      swal({
        title: "",
        text: commEditDataError,
        className: "errorAlert-login",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 3000,
      });
      setRerender(false);
    }
  }, [dispatch, commEditDataSuccess, commEditDataError]);

  useEffect(() => {
    if (postcom && rerender1) {
      swal({
        title: "Successfully Complete",
        text: "Saved Successfully",
        className: "successAlert-login",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 3000,
      });
      setRerender1(false);
    }
    if (postcomError && rerender1) {
      swal({
        title: "",
        text: postcomError,
        className: "errorAlert-login",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 3000,
      });
      setRerender1(false);
    }
  }, [dispatch, postcom, postcomError]);

  useEffect(() => {
    if (DeleteComm && rerender2) {
      swal({
        title: "Successfully Complete",
        text: "Successfully deleted",
        className: "successAlert-login",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 3000,
      });
      setRerender2(false);
    }
    if (delteError && rerender2) {
      swal({
        title: "",
        text: delteError,
        className: "errorAlert-login",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 3000,
      });
      setRerender2(false);
    }
  }, [dispatch, DeleteComm, delteError]);

  useEffect(() => {
    if (getcommunication) {
      let myArr = [];
      let editupdateArr = [];

      for (let index = 0; index < getcommunication?.length; index++) {
        myArr.push({
          id: getcommunication[index]?.id,
          communication_mode: getcommunication[index]?.communication_mode,
          mode_value: getcommunication[index]?.mode_value,
          is_preferred: getcommunication[index]?.is_preferred,
        });
        editupdateArr.push({
          id: getcommunication[index]?.id,
          fieldName: "Edit",
        });
      }

      setEditUpdateName(editupdateArr);
      setCommData(myArr);
    }
  }, [postcom, getcommunication]);

  const validateSubmit = (e) => {
    e.preventDefault();

    const tempErrors = {
      selectData: !selectData && "This field is required",
      inputEmail: selectData === "0" && validations.email(inputEmail),
      inputSms: selectData === "1" && validations.phoneNumber1(inputSms),
      inputPhone: selectData === "2" && validations.phoneNumber1(inputPhone),
      inputSlack: selectData === "3" && validations.username(inputSlack),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      // console.log(
      //   "..values",
      //   Object.values(tempErrors).filter((value) => value)
      // );
      return;
    }
    submitHandler();
  };

  const submitHandler = () => {
    dispatch(
      agencyProfileCommunication({
        user: userData?.user?.user_id,
        communication_mode: selectData,
        mode_value:
          selectData === "0"
            ? inputEmail
            : selectData === "1"
            ? inputSms
            : selectData === "2"
            ? inputPhone
            : selectData === "3"
            ? inputSlack
            : "",
        is_preferred: prefeValue,
      })
    );
    setRerender1(true);
    setSelectData("");
    setInputPhone("");
    setInputEmail("");
    setInputSms("");
    setInputSlack("");
    setShow(false);
    setPrefeValue(false);
  };

  const handleDelete = (id) => {
    swal({
      title: "",
      text: "Are you sure you want to Remove this communication method?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(agencyProfileCommDelete(id));
        setRerender2(true);
      }
    });
  };

  const handleAddComm = () => {
    setShow(true);
  };

  const handleRemove = () => {
    setSelectData("");
    setInputPhone("");
    setInputEmail("");
    setInputSms("");
    setInputSlack("");
    setShow(false);
    setPrefeValue(false);
  };

  const handleEditUpdateName = (e, index, id) => {
    let list = [...editUpdateName];
    if (list[index]["fieldName"] === "Edit") {
      list[index]["fieldName"] = "Update";
    } else if (list[index]["fieldName"] === "Update") {
      swal({
        title: "",
        text: "Are you sure you want to change this communication method?",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(
            agencyProfileCommEditDataAction(id, {
              user: userData?.user?.user_id,
              communication_mode: commData[index]?.communication_mode,
              mode_value: commData[index]?.mode_value,
              is_preferred: commData[index]?.is_preferred,
            })
          );
          setRerender(true);
        }
      });
    }
    setEditUpdateName(list);
  };

  const handleEditMethod = (e, index) => {
    let list = [...commData];
    list[index]["communication_mode"] = e.target.value;
    setCommData(list);
  };

  const handleEditField = (e, index) => {
    let list = [...commData];
    list[index]["mode_value"] = e.target.value;
    setCommData(list);
  };

  const handleChangePreferred = (e, index) => {
    let list = [...commData];
    list[index]["is_preferred"] = !list[index]["is_preferred"];
    setCommData(list);
  };

  const handleChangePreferredAdd = (e, id) => {
    setPrefeValue(!prefeValue);
  };

  return (
    <>
      {postLoading || getCommsLoading || updateLoading || deleteLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="agencyprofilecumminicationmainD">
            <div className="AboutMeTitleDigitalM">
              <h3>Preferred Communication Methods</h3>
              <p className="preCommMethPara">
                This is how you’ll be notified when a job is ready for approval,
                content creators apply for a job, and more. You will be
                contacted by all methods you add below.{" "}
              </p>
            </div>
            <div>
              {commData?.length > 0 &&
                commData?.map((item, index) => (
                  <div className="agencyprofilecomm" key={item.id}>
                    <div className="methodPhUpdateRemoveMain">
                      <div className="methodagencyProfile">
                        <p>Method</p>
                        <Select
                          className="methodagencyProfileSelectOne"
                          MenuProps={menuProps}
                          disabled={
                            editUpdateName[index]["fieldName"] === "Edit"
                          }
                          value={item.communication_mode}
                          onChange={(e) => {
                            handleEditMethod(e, index);
                          }}
                          name="methodData"
                          placeholder="Select method"
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value={0}> Email</MenuItem>
                          <MenuItem value={1}>SMS</MenuItem>
                          <MenuItem value={2}> WhatsApp</MenuItem>
                          <MenuItem value={3}> Slack</MenuItem>
                        </Select>
                      </div>
                      <div className="inputPhoneNumberProDiv">
                        <p>
                          {item.communication_mode === 0
                            ? "Email Address"
                            : item.communication_mode === 1
                            ? "Phone Number"
                            : item.communication_mode === 2
                            ? "Phone Number"
                            : "Slack Workspace"}
                        </p>
                        <input
                          className="inputPhoneNumberPro"
                          type="text"
                          disabled={
                            editUpdateName[index]["fieldName"] === "Edit"
                          }
                          placeholder="757-555-1432"
                          name="title"
                          value={item?.mode_value}
                          onChange={(e) => handleEditField(e, index)}
                        />
                      </div>
                      <div className="preferred_main_div">
                        <label>
                          <p className="selectPreferred_div">
                            Select Preferred
                          </p>
                          <input
                            disabled={
                              editUpdateName[index]["fieldName"] === "Edit"
                            }
                            className="preferred_part_comm"
                            type="checkbox"
                            checked={item.is_preferred}
                            onChange={(e) => handleChangePreferred(e, index)}
                          />
                        </label>
                      </div>
                      <div className="updateAndRemoveNewProfile">
                        <div className="communicationUpdateMethidBtnDiv">
                          <button
                            className="UpdateMethidBtnAgency"
                            onClick={(e) => {
                              handleEditUpdateName(e, index, item.id);
                            }}
                          >
                            {editUpdateName[index].fieldName}
                          </button>
                        </div>
                        <div className="communicationDeleteMethidBtnDiv">
                          <button
                            className="deleteMethidBtnAgency"
                            onClick={() => handleDelete(item.id)}
                          >
                            <img src="/img/removered.png" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {show && (
              <div className="methodPhUpdateRemoveMain">
                <div className="methodagencyProfile">
                  <div
                    className={
                      errors.selectData
                        ? "upload-profileImg error profile_info2"
                        : "upload-profileImg profile_info2"
                    }
                  >
                    <p className="selectPreferred_div">Select Method</p>
                    <Select
                      className="methodagencyProfileSelectOne"
                      MenuProps={menuProps}
                      value={selectData}
                      onChange={(e) => {
                        setSelectData(e.target.value);
                        setErrors({ ...errors, selectData: null });
                      }}
                      name="methodData"
                      placeholder="Select method"
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">Select method</MenuItem>
                      <MenuItem value="0">Email</MenuItem>
                      <MenuItem value="1">SMS</MenuItem>
                      <MenuItem value="2">WhatsApp</MenuItem>
                      <MenuItem value="3">Slack</MenuItem>
                    </Select>
                    <span
                      style={{
                        color: "#D14F4F",
                        opacity: errors.selectData ? 1 : 0,
                      }}
                    >
                      {errors.selectData ?? "valid"}
                    </span>
                  </div>
                </div>
                {selectData === "" && (
                  <>
                    {" "}
                    <div className="inputPhoneNumberProDiv clssaddddnew">
                      <p className="selectPreferred_div selectPreferred_div1">
                        Select Method type
                      </p>
                      <input
                        disabled
                        className="inputPhoneNumberPro"
                        type="text"
                        placeholder="method value"
                        name="title"
                      />
                    </div>
                    <div className="preferred_main_div">
                      <label>
                        <p>Select Preferred</p>
                        <input
                          className="preferred_part_comm"
                          disabled
                          type="checkbox"
                          checked={prefeValue}
                          onChange={handleChangePreferredAdd}
                        />
                      </label>
                    </div>
                    <div className="updateAndRemoveNewProfile">
                      <div className="communicationUpdateMethidBtnDiv">
                        <button disabled className="UpdateMethidBtnAgency">
                          Save
                        </button>
                      </div>
                      <div className="communicationDeleteMethidBtnDiv">
                        <button
                          className="deleteMethidBtnAgency"
                          onClick={() => handleRemove()}
                        >
                          <img src="/img/removered.png" /> Remove
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {selectData === "0" && (
                  <>
                    <div className="inputPhoneNumberProDiv clssaddddnew">
                      <div
                        className={
                          errors.inputEmail
                            ? "upload-profileImg error profile_info2"
                            : "upload-profileImg profile_info2"
                        }
                      >
                        <p>Email</p>
                        <input
                          className="inputPhoneNumberPro"
                          type="email"
                          placeholder="Email Address"
                          name="title"
                          value={inputEmail}
                          onChange={(e) => {
                            setInputEmail(e.target.value);
                            setErrors({ ...errors, inputEmail: null });
                          }}
                        />
                        <span
                          className="phoneagencypro"
                          style={{
                            color: "#D14F4F",
                            opacity: errors.inputEmail ? 1 : 0,
                          }}
                        >
                          {errors.inputEmail ?? "valid"}
                        </span>
                      </div>
                    </div>
                    <div className="preferred_main_div">
                      <label>
                        <p className="selectPreferred_div">Select Preferred</p>
                        <input
                          className="preferred_part_comm"
                          type="checkbox"
                          checked={prefeValue}
                          onChange={handleChangePreferredAdd}
                        />
                      </label>
                    </div>
                    <div className="updateAndRemoveNewProfile">
                      <div className="communicationUpdateMethidBtnDiv">
                        <button
                          className="UpdateMethidBtnAgency"
                          onClick={(e) => validateSubmit(e)}
                        >
                          Save
                        </button>
                      </div>
                      <div className="communicationDeleteMethidBtnDiv">
                        <button
                          className="deleteMethidBtnAgency"
                          onClick={() => handleRemove()}
                        >
                          <img src="/img/removered.png" /> Remove
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {selectData === "1" && (
                  <>
                    {" "}
                    <div className="inputPhoneNumberProDiv clssaddddnew">
                      <div
                        className={
                          errors.inputSms
                            ? "upload-profileImg error profile_info2"
                            : "upload-profileImg profile_info2"
                        }
                      >
                        <p>Phone</p>
                        <input
                          className="inputPhoneNumberPro"
                          type="tel"
                          placeholder="757-555-1432"
                          name="title"
                          value={inputSms}
                          onChange={(e) => {
                            setInputSms(e.target.value);
                            setErrors({ ...errors, inputSms: null });
                          }}
                        />
                        <span
                          className="phoneagencypro"
                          style={{
                            color: "#D14F4F",
                            opacity: errors.inputSms ? 1 : 0,
                          }}
                        >
                          {errors.inputSms ?? "valid"}
                        </span>
                      </div>
                    </div>
                    <div className="preferred_main_div">
                      <label>
                        <p>Select Preferred</p>
                        <input
                          className="preferred_part_comm"
                          type="checkbox"
                          checked={prefeValue}
                          onChange={handleChangePreferredAdd}
                        />
                      </label>
                    </div>
                    <div className="updateAndRemoveNewProfile">
                      <div className="communicationUpdateMethidBtnDiv">
                        <button
                          className="UpdateMethidBtnAgency"
                          onClick={(e) => validateSubmit(e)}
                        >
                          Save
                        </button>
                      </div>
                      <div className="communicationDeleteMethidBtnDiv">
                        <button
                          className="deleteMethidBtnAgency"
                          onClick={() => handleRemove()}
                        >
                          <img src="/img/removered.png" /> Remove
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {selectData === "2" && (
                  <>
                    {" "}
                    <div className="inputPhoneNumberProDiv clssaddddnew">
                      <div
                        className={
                          errors.inputPhone
                            ? "upload-profileImg error profile_info2"
                            : "upload-profileImg profile_info2"
                        }
                      >
                        <p>Phone</p>
                        <input
                          className="inputPhoneNumberPro"
                          type="tel"
                          placeholder="757-555-1432"
                          name="title"
                          value={inputPhone}
                          onChange={(e) => {
                            setInputPhone(e.target.value);
                            setErrors({ ...errors, inputPhone: null });
                          }}
                        />
                        <span
                          className="phoneagencypro"
                          style={{
                            color: "#D14F4F",
                            opacity: errors.inputPhone ? 1 : 0,
                          }}
                        >
                          {errors.inputPhone ?? "valid"}
                        </span>
                      </div>
                    </div>
                    <div className="preferred_main_div">
                      <label>
                        <p className="selectPreferred_div">Select Preferred</p>
                        <input
                          className="preferred_part_comm"
                          type="checkbox"
                          checked={prefeValue}
                          onChange={handleChangePreferredAdd}
                        />
                      </label>
                    </div>
                    <div className="updateAndRemoveNewProfile">
                      <div className="communicationUpdateMethidBtnDiv">
                        <button
                          className="UpdateMethidBtnAgency"
                          onClick={(e) => validateSubmit(e)}
                        >
                          Save
                        </button>
                      </div>
                      <div
                        className="communicationDeleteMethidBtnDiv"
                        onClick={() => handleRemove()}
                      >
                        <button className="deleteMethidBtnAgency">
                          <img src="/img/removered.png" /> Remove
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {selectData === "3" && (
                  <>
                    {" "}
                    <div className="inputPhoneNumberProDiv clssaddddnew">
                      <div
                        className={
                          errors.inputSlack
                            ? "upload-profileImg error profile_info2"
                            : "upload-profileImg profile_info2"
                        }
                      >
                        <p>Slack</p>
                        <input
                          className="inputPhoneNumberPro"
                          type="text"
                          placeholder="Slack Workspace Name"
                          name="title"
                          value={inputSlack}
                          onChange={(e) => {
                            setInputSlack(e.target.value);
                            setErrors({ ...errors, inputSlack: null });
                          }}
                        />
                        <span
                          className="phoneagencypro"
                          style={{
                            color: "#D14F4F",
                            opacity: errors.inputSlack ? 1 : 0,
                          }}
                        >
                          {errors.inputSlack ?? "valid"}
                        </span>
                      </div>
                    </div>
                    <div className="preferred_main_div">
                      <label>
                        <p className="selectPreferred_div">Select Preferred</p>
                        <input
                          className="preferred_part_comm"
                          type="checkbox"
                          checked={prefeValue}
                          onChange={handleChangePreferredAdd}
                        />
                      </label>
                    </div>
                    <div className="updateAndRemoveNewProfile">
                      <div className="communicationUpdateMethidBtnDiv">
                        <button
                          className="UpdateMethidBtnAgency"
                          onClick={(e) => validateSubmit(e)}
                        >
                          Save
                        </button>
                      </div>
                      <div className="communicationDeleteMethidBtnDiv">
                        <button
                          className="deleteMethidBtnAgency"
                          onClick={() => handleRemove()}
                        >
                          <img src="/img/removered.png" /> Remove
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            {!show && (
              <div className="createCompanyButtonProfileDiv">
                <button
                  className="createCompanyButtonProfile"
                  onClick={handleAddComm}
                >
                  <img src="/img/plusIconconnect.png" alt="" />
                  Add Comm Method
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default Member_profile_communication;
