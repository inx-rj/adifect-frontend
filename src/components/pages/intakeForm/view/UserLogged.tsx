import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import Logout from "@mui/icons-material/Logout";
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { getUserDetails, logout } from "../../../../redux/actions/auth-actions";
import { useSingleEffect } from "react-haiku";
import { GET_USER_DETAILS } from "redux/actions/auth/auth.actions";
import { TRIGGER_PERSIST_MODE } from "redux/actions/config/app/app.actions";
import { ActionTypes } from "helper/actions";
import { useAppDispatch, useAppSelector } from "redux/store";
import {
  GET_USER_DATA,
  GET_USER_PROFILE_DATA,
} from "redux/reducers/auth/auth.slice";
import { Images } from "helper/images";

const UserLogged = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useAppDispatch();
  const open = Boolean(anchorEl);

  const {
    data: { user },
  } = useAppSelector(GET_USER_DATA);

  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  // Handle Menu Click
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Fetch user data on component mount
  useSingleEffect(() => {
    dispatch(GET_USER_DETAILS());
  });

  const logoutHandler = () => {
    // dispatch(TRIGGER_HEADER_COMPANY(null, null));
    dispatch(TRIGGER_PERSIST_MODE(false)).then((r) => r);
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("userData");
    dispatch({ type: ActionTypes.DESTROY_SESSION });
  };

  // If no user data, return empty div
  if (!user) {
    return <div></div>;
  }
  return (
    <div className="flex items-center justify-end p-2 fixed top-1 right-1 z-10">
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            <img
              src={
                !userProfile?.data?.profile_img
                  ? Images?.UserAvatar
                  : userProfile?.data?.profile_img
              }
              alt="Profile Picture"
            />
          </Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        elevation={1}
        sx={{ minWidth: 200 }}
      >
        <MenuItem>
          <div className="flex items-center">
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <span className="text-sm font-bold">
              {user?.first_name} {user?.last_name}
            </span>
          </div>
        </MenuItem>
        <Divider className="mt-0" />
        <MenuItem onClick={handleClose}>
          <Link to={"/home"} className="flex items-center">
            <ListItemIcon>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            <span>Homepage</span>
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            logoutHandler();
          }}
        >
          <div className="flex items-center">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <span className="text-sm">Logout</span>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserLogged;
