import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from "@mui/icons-material/Remove";
import MuiIcon from "common/MuiIcon";
import { IS_SIDEBAR_COLLAPSED } from "redux/reducers/config/app/app.slice";
import { useAppSelector } from "redux/store";
import { Button, Fade, Popper } from "@mui/material";

const SidebarMenuItem = ({ navItem }) => {
  const { children } = navItem;

  const location = useLocation();
  const { pathname } = location;

  const [expanded, setExpanded] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);

  const isSidebarCollapsed = useAppSelector(IS_SIDEBAR_COLLAPSED);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <>
      {children?.length > 0 ? (
        <li
          className={`sub-menu-wrapper
          ${
            children.find((item) => pathname.includes(item.path))
              ? "active"
              : ""
          }
        `}
        >
          {/* <Button aria-describedby={navItem?.id} onClick={handleClick}>
            <MuiIcon icon={navItem?.icon} />
          </Button>
          <Popper
            id={navItem?.id}
            open={open}
            anchorEl={anchorEl}
            placement="right-start"
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
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
              </Fade>
            )}
          </Popper> */}
          <Accordion
            expanded={expanded === navItem.id}
            onChange={handleChange(navItem.id)}
          >
            <AccordionSummary
              expandIcon={isSidebarCollapsed && <ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>
                <MuiIcon icon={navItem?.icon} />
                {isSidebarCollapsed && (
                  <span className="ml-2">{navItem.name}</span>
                )}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
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
        </li>
      ) : (
        <li className={pathname === navItem.path ? "active" : ""}>
          <Link className="Menu nav-link" to={navItem.path}>
            <MuiIcon icon={navItem?.icon} />
            {isSidebarCollapsed && <span className="ml-2">{navItem.name}</span>}
          </Link>
        </li>
      )}
    </>
  );
};
export default SidebarMenuItem;
