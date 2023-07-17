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
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSingleEffect } from "../../../../hooks/useSingleEffect";
import { getUserDetails, logout } from "../../../../redux/actions/auth-actions";

const UserLogged = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const { user, successDetails } = useSelector(
    (state) => state.userDetailsReducer
  );

  // Handle Menu Click
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Fetch user data on component mount
  useSingleEffect(() => {
    dispatch(getUserDetails());
  });

  // If no user data, return empty div
  if (!successDetails) {
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
            {user?.profile_img && (
              <img src={user?.profile_img} alt="Profile Picture" />
            )}
            {!user?.profile_img && (
              <img
                src={process.env.PUBLIC_URL + "/img/avataruser.png"}
                alt=""
              />
            )}
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
            dispatch(logout());
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
