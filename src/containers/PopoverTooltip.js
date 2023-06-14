import React from "react";
import Popover from "@mui/material/Popover";

export default function PopoverTooltip(props) {
  const {
    id = "",
    anchorEl = "",
    openPopover = false,
    handlePopoverClose,
    children,
  } = props;

  return (
    <>
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          pointerEvents: "none",
          "& .MuiPaper-root": {
            boxShadow: "none",
            overflow: "unset",
            "&.MuiPopover-paper": {
              backgroundColor: "transparent",
            },
          },
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        {...props}
      >
        {children}
      </Popover>
    </>
  );
}
