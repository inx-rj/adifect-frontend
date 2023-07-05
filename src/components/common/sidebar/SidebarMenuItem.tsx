import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from "@mui/icons-material/Remove";
import MuiIcon from "components/common/MuiIcon";
import { IS_SIDEBAR_OPEN } from "redux/reducers/config/app/app.slice";
import { useAppDispatch, useAppSelector } from "redux/store";
import { Button, Divider, Menu, MenuItem, Tooltip } from "@mui/material";
import { TOGGLE_SIDEBAR } from "redux/actions/config/app/app.actions";

const SidebarMenuItem = ({ navItem }) => {
  const { children } = navItem;

  const location = useLocation();
  const dispatch = useAppDispatch();

  const { pathname } = location;

  const [expanded, setExpanded] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth);
  const open = Boolean(anchorEl);

  const isSidebarOpen = useAppSelector(IS_SIDEBAR_OPEN);

  const handleWindowResize = () => {
    setIsMobile(window.innerWidth);
  };
  window.addEventListener("resize", handleWindowResize);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  useEffect(() => {
    // console.log({ isSidebarOpen, isMobile, navItem });
    if (isMobile < 767) {
      dispatch(TOGGLE_SIDEBAR(false));
    }
  }, [isMobile, location])

  return (
    <>
      {children?.length ? (
        <li
          className={`sub-menu-wrapper ${children.find((item) => pathname.includes(item.path)) ? "active" : ""}`}
        >
          {/* Minisidebar menu with tooltip  */}
          {!isSidebarOpen && (
            <>
              <Button
                disableRipple
                onClick={handleClick}
                aria-controls={open ? navItem.name : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                className={`tooltip-btn w-full flex-col transition ease-out duration-1000 ${open ? "tooltip-open" : ""}`}
                sx={{
                  px: 0,
                  py: 1
                }}
              >
                <MuiIcon icon={navItem?.icon} />
                <span className="capitalize text-base">{navItem.name}</span>
              </Button>
              <Menu
                anchorEl={anchorEl}
                id={navItem.name}
                open={open}
                onClose={() => setAnchorEl(null)}
                // onClick={handleClose}

                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
                className="sidebar-mini-menu"
              >
                <MenuItem>{navItem.name}</MenuItem>
                <Divider />
                {children.map((item, index) => (
                  <MenuItem
                    key={index}
                    className={
                      pathname.includes(item.path) ? "submenu-active" : ""
                    }
                    onClick={() => setAnchorEl(null)}
                  >
                    <Link className="sub-menu" to={item.path}>
                      <RemoveIcon
                        sx={{
                          width: "16px",
                          margin: "0 10px 0 -9px",
                        }}
                      />
                      {item.name}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>{" "}
            </>
          )}
          {isSidebarOpen && (
            <Accordion
              expanded={expanded === navItem.id}
              onChange={handleChange(navItem.id)}
            >
              <AccordionSummary
                expandIcon={isSidebarOpen && <ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className="transition ease-out duration-1000">
                  <MuiIcon icon={navItem?.icon} />
                  <span className="ml-2">{navItem.name}</span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="ml-6 p-2">
                <ul>
                  {children.map((item, index) => (
                    <li
                      key={index}
                      className={
                        pathname.includes(item.path) ? "submenu-active" : ""
                      }
                    >
                      <Link className="sub-menu" to={item.path}>
                        <RemoveIcon
                          sx={{
                            width: "16px",
                            margin: "0 10px 0 -9px",
                          }}
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          )}
        </li>
      ) : (
        <li className={pathname === navItem.path ? "active" : ""}>
          <Link className={`transition ease-out duration-1000 nav-link ${isSidebarOpen ? "px-5" : "flex-col px-0 py-2"}`} to={navItem.path}>
            <MuiIcon icon={navItem?.icon} />
            <span className={`${isSidebarOpen ? 'ml-2' : 'ml-0 mt-2'}`}>{navItem.name}</span>
          </Link>
        </li>
      )}
    </>
  );
};
export default SidebarMenuItem;
