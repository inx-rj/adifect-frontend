import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { validations } from "../../utils";
import { MDBDataTable } from "mdbreact";
import { AllInvite } from "../../redux/actions/invite-actions";
import { Button } from "@mui/material";
import { CompanyInviteProflePostAction } from "../../redux/actions/invite-actions";
import swal from "sweetalert";
import { ROLE } from "../../constants/other-constants";
import { deleteInvite } from "../../redux/actions/invite-actions";
import { updateInvite } from "../../redux/actions/invite-actions";
import {
  memberAdminInviteListAction,
  memberAdminInviteLisDeldetetAction,
  memberAdminInvitePostAction,
  memberAdminInviteUpdateAction,
} from "../../redux/actions/Member-Admin-Invite-List-Action";

const Member_Admin_company_Users = () => {
  const [shwoId, setShowId] = useState();
  const [email, setemail] = useState("");
  const [rerender, setRerender] = useState(false);
  const [isOpen11, setIsOpen11] = useState(false);
  const [isOpen12, setIsOpen12] = useState(false);
  const [userid, setuserid] = useState("");
  const [levelvalue, setlevelvalue1] = useState("");
  const [levelvalueChange, setlevelvalueChange1] = useState();
  const [levelId, setLevelId] = useState();
  const [usersForRender, setUsersForRender] = useState([]);
  const [errors, setErrors] = useState({
    email: null,
    userid: null,
    company: null,
  });

  const { userData } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  //   /companydata/:companyid/:agencyId"
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userData"));
    setuserid(user?.user.user_id);
  }, []);
  const { companyid, agencyId } = useParams();

  //   {
  //     email: email,
  //     agency: agencyId,
  //     company: companyid,
  //     levels: levelvalue,
  //   }

  const {
    success: successInvitePost,
    error: errorInvitePost,
    memberAdminPost,
  } = useSelector((state) => state.memberAdminInviteListPostReducer);

  const { success: InviteDeleteSuccess } = useSelector(
    (state) => state.memberAdminInviteListDeleteReducer
  );

  const {
    memberAdmInviteList,
    success: MemberInviteSuccess,
    error: MemberInviteError,
  } = useSelector((state) => state.memberAdminInviteListReducer);

  const { inviteData, loading: draftJobsLoading } = useSelector(
    (state) => state.AllInviteReducer
  );

  const { success: successUpdate, error: errorUpdate } = useSelector(
    (state) => state.memberAdminInviteListUpdateReducer
  );

  const { success } = useSelector((state) => state.InviteDeleteReducer);

  const {
    inviteProfilePost,
    error: copmanyProfileError,
    succes: copmanyProfileSuccess,
  } = useSelector((state) => state.CompanyInviteProflePostReducer);

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  useEffect(() => {
    dispatch(memberAdminInviteListAction(companyid));
  }, [successInvitePost, successUpdate, InviteDeleteSuccess]);

  useEffect(() => {
    if (successInvitePost && rerender) {
      swal({
        title: "Successfully Complete",
        text: successInvitePost.message,
        className: "successAlert-login",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 3000,
      });
      setRerender(false);
    }
    if (errorInvitePost && rerender) {
      swal({
        title: "Error",
        text: errorInvitePost,
        className: "errorAlert-login",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 3000,
      });
      setRerender(false);
    }
  }, [dispatch, successInvitePost, errorInvitePost]);

  const deleteHandler = (id) => {
    swal({
      title: "Warning",
      text: "Are you sure you want to remove this user?",
      className: "errorAlert",
      icon: "/img/WarningAlert.png",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(memberAdminInviteLisDeldetetAction(id));
        swal({
          title: "Successfully Complete",
          text: "Successfully removed!",
          className: "successAlert",
          icon: "/img/SuccessAlert.png",
          buttons: false,
          timer: 1500,
        });
      }
    });
  };

  useEffect(() => {
    dispatch(AllInvite());
  }, [inviteProfilePost, successUpdate, success]);

  useEffect(() => {
    // handleClickOpen3();
    const handler = () => {
      setIsOpen11(false);

      //   setIsOpen10(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const handleChangeRole = (e, index, id) => {
    const leveUpdate = e.target.value;
    setErrors({ ...errors, levelvalueChange: null });
    submitUpdate(leveUpdate, id);
  };

  const submitUpdate = (leveUpdate, id) => {
    swal({
      title: "Warning",
      text: "Are you sure you want to change this user Role?",
      className: "errorAlert",
      icon: "/img/WarningAlert.png",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(memberAdminInviteUpdateAction(id, { levels: leveUpdate }));
        swal({
          title: "Successfully Complete",
          text: "Successfully Updated!",
          className: "successAlert",
          icon: "success",
          buttons: false,
          timer: 1500,
        });
      }
    });
  };

  const getinvitevalue = (e, id) => {
    setlevelvalue1(e.target.value);
    setErrors({ ...errors, level: null });
  };
  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      email: validations.email(email),
      //   company: !companyvalue && "please select a company",
      level: !levelvalue && "please select a level",
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
    setRerender(true);
    dispatch(
      memberAdminInvitePostAction({
        email: email,
        agency: userData?.user?.user_id,
        company: companyid,
        levels: levelvalue,
      })
    );
    setemail("");
    setlevelvalue1("");
  };
  useEffect(() => {
    if (memberAdmInviteList) {
      // console.log("inviteData -- ", inviteData);
      // setNametitle(item.user_name);
      let userData = [];
      memberAdmInviteList?.map((item, index) => {
        item.user = (
          <>
            <div className="active_status">
              {item.user_email ? item.user_name : "N/A"}
            </div>
            <div className="inactive_status">
              {item.user_email ? item.user_email : item.email}
            </div>
          </>
        );

        // if (item.is_blocked) {
        //   item.status = (
        //     <div style={{ display: "flex" }}>
        //       <p className="blocked_company_listss">
        //         <i className="blocked_company_listss fa fa-ban"></i>
        //       </p>
        //     </div>
        //   );
        // } else {
        //   item.status = (
        //     <div style={{ display: "flex" }}>
        //       {item.status ? (
        //         <div className="active_status">
        //           <i className="fa fa-check" aria-hidden="true"></i>{" "}
        //         </div>
        //       ) : (
        //         <div className="inactive_status">
        //           <i className="fa fa-times" aria-hidden="true"></i>
        //         </div>
        //       )}
        //     </div>
        //   );
        // }

        // item.email = item.email;
        // if (item.user_email) {
        //   item.email = item.user_email;
        // }

        // item.name = item.user_first_name;

        // // item.level = item.level;
        // item.user_level = item.level;

        // if (item.level == 1) {
        //   item.level = "Admin";
        // }
        // if (item.level == 2) {
        //   item.level = "Marketer";
        // }
        // if (item.level == 3) {
        //   item.level = "Approver";
        // }

        item.action = (
          <>
            {userData?.user?.role == Object.keys(ROLE)[3] &&
              userData?.user?.user_level === 1 && (
                <>
                  <div className="userforminput Roleuserpage1">
                    <Select
                      className={
                        levelvalueChange === ""
                          ? "inputCntnr error"
                          : "inputCntnr CategoryinputH CategoryinputHTableSelect "
                      }
                      // open={isOpen12}
                      // onOpen={() => {
                      //   setIsOpen12(true);
                      // }}
                      // onClose={() => {
                      //   setIsOpen12(false);
                      // }}
                      MenuProps={menuProps}
                      value={item.level}
                      onChange={(e) => handleChangeRole(e, index, item.id)}
                      // onChange={(e)=>setlevelvalueChange(e.target.value)}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      // value={userRole}
                      // onChange={(e) => setUserRole(e.target.value)}
                      // displayEmpty
                    >
                      {/* <MenuItem value={null}> Select Level </MenuItem> */}
                      <MenuItem value="1">Admin Level</MenuItem>
                      <MenuItem value="2">Marketer Level</MenuItem>
                      <MenuItem value="3">Approver Level</MenuItem>
                      <MenuItem value="4">In-house Designer</MenuItem>
                    </Select>
                  </div>
                  <div className="approvelSelectDropAndBtn">
                    <button
                      className="addanewmailnewNew"
                      type="button"
                      onClick={() => deleteHandler(item.id)}
                    >
                      <img
                        className="removereddddButttonLogo"
                        src="/img/removered.png"
                      />
                      Remove
                    </button>
                  </div>
                </>
              )}
          </>
        );
        userData.push(item);
      });
      setUsersForRender(userData);
    }
  }, [memberAdmInviteList]);

  const data = {
    columns: [
      {
        label: "Member",
        field: "user",
        sort: "asc",
        width: 500,
      },
      //   {
      //     label: "Email",
      //     field: "email",
      //     sort: "asc",
      //     width: 500,
      //   },

      //   {
      //     label: "Level",
      //     field: "level",
      //     sort: "asc",
      //     width: 100,
      //   },

      //   {
      //     label: "Status",
      //     field: "status",
      //     sort: "asc",
      //     width: 500,
      //   },
      {
        label:
          userData?.user?.role === 3 &&
          userData?.user?.user_level === 1 &&
          "Role",
        field:
          userData?.user?.role === 3 &&
          userData?.user?.user_level === 1 &&
          "action",
        sort:
          userData?.user?.role === 3 &&
          userData?.user?.user_level === 1 &&
          "asc",
        width:
          userData?.user?.role === 3 && userData?.user?.user_level === 1 && 100,
      },
    ],
    rows: usersForRender,
  };

  return (
    <>
      <div className="company_users_profile">
        {userData?.user?.role == Object.keys(ROLE)[3] &&
          userData?.user?.user_level === 1 && (
            <>
              <div className="company_users_profile_text">
                <h5>Invite new member</h5>
                <p>
                  Member will only have access to jobs,approvel workflow,and
                  files inside this campany
                </p>
              </div>
              <div className="company_users_profile_email">
                <div
                  className={
                    errors.email
                      ? "inputCntnr error"
                      : "inputCntnr CategoryinputH"
                  }
                >
                  <h4>Email Address</h4>
                  <input
                    className="category_name validateInput w-100 h-47 border-radius border-1"
                    type="email"
                    placeholder="Enter Email Address"
                    autoComplete="nope"
                    name="email"
                    onChange={(e) => {
                      setemail(e.target.value);
                      setErrors({ ...errors, email: null });
                    }}
                    value={email}
                    required
                  />
                  {/* {error1 && <h2 style={{color: 'red'}}>{error1}</h2>} */}
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
              <div className="company_users_profile_role">
                {/* {JSON.stringify(levelvalue)} */}
                <h4>Role</h4>
                <div className="userforminput Roleuserpage1Table">
                  <Select
                    className={
                      levelvalue === ""
                        ? "inputCntnr error"
                        : "inputCntnr CategoryinputH CategoryinputHSelect"
                    }
                    open={isOpen11}
                    onOpen={() => {
                      setIsOpen11(true);
                    }}
                    onClose={() => {
                      setIsOpen11(false);
                    }}
                    MenuProps={menuProps}
                    value={levelvalue}
                    onChange={getinvitevalue}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    // value={userRole}
                    // onChange={(e) => setUserRole(e.target.value)}
                    // displayEmpty
                  >
                    <MenuItem value=""> Select Level </MenuItem>
                    <MenuItem value="1">Admin Level</MenuItem>
                    <MenuItem value="2">Marketer Level</MenuItem>
                    <MenuItem value="3">Approver Level</MenuItem>
                    <MenuItem value="4">In-house Designer</MenuItem>
                  </Select>
                  <div className="company_users_profile_invite">
                    <button
                      className="company_users_profile_invite_button"
                      onClick={validateSubmit}
                    >
                      invite
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
      </div>
      <div className="Topallpage AllPageHight Custompage Custompageinvite ">
        <div className="ContentDiv Categoriesdiv1 draft Categoriesdiv1PaddingZero">
          <MDBDataTable
            style={{}}
            responsive
            striped
            bordered
            small
            data={data}
            paging={false}
            searching={false}
          />
        </div>
      </div>
    </>
  );
};

export default Member_Admin_company_Users;
