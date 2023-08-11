import React, { useState, useEffect } from "react";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  adminUpdateUserAction,
  listAllUser,
} from "../../redux/actions/user-actions";
import { getUserDetails } from "../../redux/actions/user-actions";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import LoadingSpinner from "../../containers/LoadingSpinner";
import swal from "sweetalert";
import moment from "moment";
import { Frontend_URL } from "../../environment";
import { Button } from "@mui/material";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { USER_ADMIN_LIST_RESET } from "../../constants/user-constants";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function UserList() {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

  const dispatch = useDispatch();

  const [userRole, setUserRole] = useState(null);
  const [userID1, setUserID1] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [usersForRender, setUsersForRender] = useState([]);
  const [rerender, setRerender] = useState(false);

  const { useradminData, loading: loadingUsers } = useSelector(
    (state) => state.usersAdminReducer
  );
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = useSelector((state) => state.adminUpdateUserReducer);
  const { useradminDetails } = useSelector(
    (state) => state.UserAdminDetailsReducer
  );
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const [isOpen, setIsOpen] = useState(false);

  const openPopup = async (user_id, role, is_blocked) => {
    setIsOpen(!isOpen);
    dispatch(getUserDetails(user_id));

    setUserID1(user_id);
    setUserRole(role);
    setUserStatus(is_blocked);
  };

  const closePopup = () => {
    setIsOpen(false);
    setUserRole(null);
    setUserID1(null);
    setUserStatus(null);
  };

  const submitHandler = (e) => {
    const updateUser = dispatch(
      adminUpdateUserAction(userID1, {
        role: userRole,
        user: userID1,
        is_blocked: userStatus,
        // company_type,
      })
    );
    setRerender(true);
    closePopup();
  };

  useEffect(() => {
    if (successUpdate && rerender) {
      swal({
        title: "Successfully Complete",
        text: "User updated successfully!",
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 5000,
      });
      setRerender(false);
    }
    if (errorUpdate && rerender) {
      swal({
        title: "Error",
        text: "Something went wrong!",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 5000,
      });
      setRerender(false);
    }
  }, [dispatch, successUpdate, errorUpdate]);

  useEffect(() => {
    dispatch({ type: USER_ADMIN_LIST_RESET });
    dispatch(listAllUser());
    dispatch(defaultPageLoader());
  }, [successUpdate]);

  const { loading } = useSelector((state) => state.loaderReducer);

  // const { success } = useSelector((state) => state.userDeleteReducer);

  // useEffect(() => {
  //   if (useradminDetails) {
  //     setUserRole(useradminDetails.role);
  //     setUserStatus(useradminDetails.is_blocked);
  //     setUserID1(useradminDetails.id);
  //   }
  // }, [useradminDetails]);

  useEffect(() => {
    let userData1 = [];
    useradminData?.length > 0 &&
      useradminData?.map((item, index) => {
        item.user_name = item.username;

        item.useremail = item.email;

        item.userrole = item.role;
        if (item.role == 0) {
          item.userrole = "admin";
        }
        if (item.role == 1) {
          item.userrole = "creator";
        }
        if (item.role == 2) {
          item.userrole = "agency";
        }
        var utc = null;
        if (item.date_joined) {
          utc = moment(item.date_joined).format("MM-DD-yyyy hh:mm a");
        }
        item.date_joined = utc;

        // item.is_blocked = item.is_blocked;
        if (item.is_blocked == false) {
          item.is_blocked1 = "active";
          // {
          //   item.is_blocked == false && (
          //     <div className="active_status">
          //       <i className="fa fa-check" aria-hidden="true"></i>{" "}
          //     </div>
          //   );
          // }
        }
        if (item.is_blocked == true) {
          item.is_blocked1 = "block";
        }

        item.is_blocked1 = (
          <div style={{ display: "flex" }}>
            {item.is_blocked1 == "active" ? (
              <div className="active_status">
                <i className="fa fa-check" aria-hidden="true"></i>{" "}
              </div>
            ) : (
              <div className="inactive_status">
                <i className="fa fa-times" aria-hidden="true"></i>
              </div>
            )}
          </div>
        );
        item.action = (
          <div className="Permissionbtnuser" style={{ display: "flex" }}>
            <Button
              title="Setting"
              className="deletebutt"
              // onClick={() => openPopup(item.id, item.role, item.is_blocked)}
            >
              {/* <img src="/img/Settings.png" /> */}
              <p
                onClick={() => openPopup(item.id, item.role, item.is_blocked)}
                class="editiconDelete deleteSettingsAdmin"
              >
                Setting
              </p>
            </Button>
          </div>
        );
        userData1.push(item);
      });
    setUsersForRender(userData1);
    // }
  }, [useradminData]);

  const data = {
    columns: [
      {
        label: "User Name",
        field: "user_name",
        sort: "asc",
        width: 500,
      },
      {
        label: "Email",
        field: "useremail",
        sort: "asc",
        width: 500,
      },

      {
        label: "Register Date",
        field: "date_joined",
        sort: "asc",
        width: 500,
      },

      {
        label: "Role",
        field: "userrole",
        sort: "asc",
        width: 500,
      },

      {
        label: "Status",
        field: "is_blocked1",
        sort: "asc",
        width: 500,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: usersForRender,
  };

  return (
    <>
      {isLoading || loadingUsers || loadingUpdate ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* {JSON.stringify(useradminDetails)} */}
          {/* {JSON.stringify(useradminData)} */}
          <div className="Category_p Userpage">
            <div className="CategorylistName">
              <h1>User List</h1>
            </div>
          </div>
          <div className="Topallpage AllPageHight Custompage">
            <div className="ContentDiv Categoriesdiv1 userlist">
              <div className="Status"></div>

              <MDBDataTable
                // style={{}}
                responsive
                striped
                bordered
                small
                data={data}
              />
            </div>
          </div>

          <Dialog
            className="userlistpage"
            open={isOpen}
            keepMounted
            onClose={closePopup}
          >
            <DialogContent>
              <div className="joblisttopdivpage">
                <div className="jobdes_newdiv11">
                  <h2>Permission</h2>
                  {/* {JSON.stringify(userRole)}
                  {JSON.stringify(userStatus)} */}
                </div>
                <hr className="u-top" />
                <div className="userform">
                  <div className="userforminput Roleuserpage">
                    <label>Role</label>
                    <Select
                      className={
                        userRole === ""
                          ? "selectinputcolor"
                          : "menuiteminputcolor"
                      }
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                      displayEmpty
                    >
                      {/* <MenuItem value={null}> Select Role </MenuItem> */}
                      <MenuItem value="1">Creator</MenuItem>
                      <MenuItem value="2">Agency</MenuItem>
                      <MenuItem value="0">Admin</MenuItem>
                    </Select>
                  </div>

                  <div className="userforminput Roleuserpage">
                    <label>User Status</label>
                    <Select
                      className={
                        userStatus === ""
                          ? "selectinputcolor"
                          : "menuiteminputcolor"
                      }
                      value={userStatus}
                      onChange={(e) => setUserStatus(e.target.value)}
                      displayEmpty
                    >
                      {/* <MenuItem value={null}> Select Status </MenuItem> */}
                      <MenuItem value={"false"}>Active</MenuItem>
                      <MenuItem value={"true"}> Block</MenuItem>
                    </Select>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions className="closebtnuser">
              <div className="userlistbns">
                <button className="sendbtnuser" onClick={submitHandler}>
                  Save
                </button>

                <Button className="closebtnu1" onClick={closePopup}>
                  Close
                </Button>
              </div>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}
export default UserList;
