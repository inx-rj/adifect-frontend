import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from "@mui/icons-material/Remove";

const SidebarMenuItem = ({ navItem }) => {
  const { children } = navItem;

  const location = useLocation();
  const { pathname } = location;

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {children?.length > 0 ? (
        <Accordion
          sx={{
            "&.MuiPaper-root": {
              "&.MuiAccordion-root": {
                boxShadow: "none",
                margin: "0 9px",
              },
            },
          }}
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            sx={{
              background: children.find((item) => pathname.includes(item.path))
                ? "rgba(36, 114, 252, 0.1)"
                : "",
              color: children.find((item) => pathname.includes(item.path))
                ? "#2472fc"
                : "",
              "&.MuiButtonBase-root": {
                "&.MuiAccordionSummary-root": {
                  padding: "0 16px 0 0",
                  margin: "0",
                },
              },
              ".MuiAccordionSummary-content": {
                margin: "0",
                "li.active a": {
                  background: "transparent",
                },
                "&.Mui-expanded": {
                  margin: "0",
                },
              },
            }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <li
              className={`
                ${
                  children.find((item) => pathname.includes(item.path))
                    ? "active"
                    : ""
                } m-0
              `}
            >
              <Link className="Menu m-0" to={navItem.path}>
                <Typography
                  sx={{
                    fontSize: "16px !important",
                    fontFamily: "Figtree, sans-serif",
                    fontWeight: "700",
                    color: children.find((item) => pathname.includes(item.path))
                      ? "#2472fc"
                      : "#a0a0a0",
                  }}
                >
                  <span className="menu_img">
                    <img
                      className="mr-2"
                      src={process.env.PUBLIC_URL + navItem.imgPath}
                      alt=""
                    />
                  </span>
                  {navItem.title}
                </Typography>
              </Link>
            </li>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {children.map((item, index) => (
                <li
                  key={index}
                  className={pathname.includes(item.path) ? "submenu-active" : ""}
                >
                  <Link className="sub-menu" to={item.path}>
                    <RemoveIcon
                      sx={{
                        width: "16px",
                        margin: "0 10px 0 -9px",
                      }}
                    />
                    {/* <span className="">
                      <img
                        className="mr-2"
                        src={process.env.PUBLIC_URL + item.imgPath}
                        alt=""
                      />
                    </span> */}
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      ) : (
        <li className={pathname === navItem.path ? "active" : ""}>
          <Link className="Menu" to={navItem.path}>
            <span className="menu_img">
              <img
                className="mr-2"
                src={process.env.PUBLIC_URL + navItem.imgPath}
                alt=""
              />
            </span>
            {navItem.title}
          </Link>
        </li>
      )}
    </>
  );
};
export default SidebarMenuItem;
