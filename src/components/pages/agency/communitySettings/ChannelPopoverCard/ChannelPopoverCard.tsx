import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import SharePostToSocialMedia from "components/common/ShareToSocialMedia/SharePostToSocialMedia";

const ChannelPopoverCard = ({
  urlTitle = "Facebook Account URL: ",
  apiTitle = "Facebook API Key: ",
  urlApiValue = { channel_data: { name: "" } },
}) => {
  return (
    <Card
      sx={{
        maxWidth: "471px",
        width: "100%",
        position: "relative",
        overflow: "unset",
        display: "flex",
        p: 2.625,
        borderRadius: 0,
        "&.MuiPaper-root": {
          "&.MuiPaper-elevation": {
            "&.MuiPaper-rounded": {
              "&.MuiPaper-elevation1": {
                boxShadow: "none",
                filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 0px 4px)",
                m: 0,
                mt: 1.875,
              },
            },
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-18px",
          width: "25px",
          height: "33px",
          background: "#EDEDED linear-gradient(white, white)",
          clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
        }}
      />
      <Grid container spacing={0} sx={{ alignItems: "center" }}>
        <Grid item>
          <SharePostToSocialMedia
            facebook={
              urlApiValue?.channel_data?.name?.toLowerCase() === "facebook"
            }
            sms={urlApiValue?.channel_data?.name?.toLowerCase() === "opnsesame"}
            color="secondary"
            sx={{
              color: "#2472FC",
              fontSize: "2.625rem",
            }}
          />
        </Grid>
        <Grid item xs={12} sm container ml={2}>
          <Card
            sx={{
              p: 1.875,
              borderRadius: 1,
              border: "1px solid rgba(113, 117, 123, 0.2);",
              boxShadow: "none",
              "& .MuiTypography-root": {
                fontFamily: '"Figtree", sans-serif',
                fontWeight: 400,
                lineHeight: "16.5px",
                fontSize: 14,
                "& .MuiTypography-titlespan": {
                  color: "#71757B",
                },
                "& .MuiTypography-valuespan": {
                  color: "#000000",
                },
              },
            }}
          >
            {urlTitle && (
              <Typography component="div" mb={1.25}>
                {/* @ts-ignore */}
                <Typography variant="titlespan" component="span">
                  {urlTitle}
                </Typography>
                {/* @ts-ignore */}
                <Typography variant="valuespan" component="span">
                  {urlApiValue?.["url"]}
                </Typography>
              </Typography>
            )}
            {apiTitle && (
              <Typography component="div">
                {/* @ts-ignore */}
                <Typography variant="titlespan" component="span">
                  {apiTitle}
                </Typography>
                {/* @ts-ignore */}
                <Typography variant="valuespan" component="span">
                  {urlApiValue?.["api_key"]}
                </Typography>
              </Typography>
            )}
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ChannelPopoverCard;
