import { Link } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import useCopyToClipboard from "../CopyToClipBoard";

const PastActivityModal = (props) => {
  const { activityData } = props;
  const [isValueCopied, copy] = useCopyToClipboard();

  return (
    <div className="grid grid-cols-1 gap-3 [&>:not(:first-child)]:border-t [&>:not(:first-child)]:pt-3">
      {activityData &&
        activityData?.map((item, index) => {
          return (
            <Stack
              direction="row"
              spacing={1}
              className="items-start"
              key={index}
            >
              <i className="w-[55px] h-[55px] rounded overflow-hidden">
                <img
                  src={item?.img}
                  alt="story image"
                  className="w-full h-full object-cover"
                />
              </i>
              <Box className="w-[calc(100%-55px)] pl-[15px]">
                <Typography
                  variant="h6"
                  className="[&.MuiTypography-root]:text-base text-[#2E2E2E]"
                >
                  {item?.title}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  className="items-center text-[#71757B]"
                >
                  <Typography sx={{ color: "#71757B" }}>
                    {item?.publish_date}
                  </Typography>
                  {item?.p_url && (
                    <>
                      <Divider orientation="vertical" flexItem className="" />
                      <Stack
                        direction="row"
                        spacing={1}
                        className="items-center gap-2"
                      >
                        pURL:
                        <Stack
                          direction="row"
                          spacing={1}
                          className="items-center"
                        >
                          <Typography className="text-[#000000]">
                            {item?.p_url}
                          </Typography>
                          <Tooltip
                            title={`${item.p_url} copied`}
                            open={isValueCopied}
                            disableFocusListener
                            disableHoverListener
                            arrow
                          >
                            <IconButton
                              className="[&.MuiIconButton-root]:bg-[#71757B]/20 text-xs p-1"
                              onClick={() => copy(item.p_url)}
                            >
                              <Link
                                fontSize="inherit"
                                className="[&.MuiSvgIcon-root]:w-4 [&.MuiSvgIcon-root]:h-4 -rotate-45"
                              />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Stack>
                    </>
                  )}
                </Stack>
              </Box>
            </Stack>
          );
        })}
    </div>
  );
};

export default PastActivityModal;
