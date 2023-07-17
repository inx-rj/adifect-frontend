import { CommentOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ReadMoreButton from "./ReadMoreButton";
import { useState } from "react";
import CustomMuiAutoComplete from "../../../Common/CustomMuiAutoComplete/CustomMuiAutoComplete";
import CustomPopup from "../../../Common/CustomPopup";
import PastActivityModal from "../PastActivityModal/PastActivityModal";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../../../../utils/api";
import { BACKEND_API_URL } from "../../../../environment";
import { useEffect } from "react";

const ChannelAccordion = (props) => {
  const {
    accordionId,
    displayedAudienceOptions,
    handleCheckedData,
    selectPostList,
    chanelPostHandle,
    handleStoryUrl,
    handleTimeChange,
    storyDetailsStoryUrl,
    storyUrlVal = "",
    setPostList,
    setExpandedAccordion,
    expandedAccordion,
  } = props;

  const { communityId } = useParams();
  const changedAccordionId = accordionId.split(" ").join("").toLowerCase();
  const postActivityData = [
    {
      title: "Shirley Ann Cotterman passes away in Sidney on Feb. 21",
      publish_date: "16/03/2023",
      p_url: "KmEr23Lh",
      img: "/img/addedstarmediaimg.png",
    },
    {
      title: "Shirley Ann Cotterman passes away in Sidney on Feb. 21",
      publish_date: "16/03/2023",
      p_url: "KmEr23Lh",
      img: "/img/addedstarmediaimg.png",
    },
    {
      title: "Shirley Ann Cotterman passes away in Sidney on Feb. 21",
      publish_date: "16/03/2023",
      p_url: "KmEr23Lh",
      img: "/img/addedstarmediaimg.png",
    },
  ];

  const { agencyCompanyStoryDetails } = useSelector(
    (state) => state.AgencyCompanyStoryDetailReducer
  );
  const { loading: loadingAgencyAudiencesData } = useSelector(
    (state) => state.AgencyAudiencesReducer
  );

  const [selectedOption, setSelectedOption] = useState("");
  const [searchText, setSearchText] = useState("");
  const [pastActivityPopup, setPastActivityPopup] = useState(false);

  useEffect(() => {
    setPostList((prevState) => {
      return {
        ...prevState,
        ["facebook"]: {
          ...prevState?.["facebook"],
          ["story_url"]: storyDetailsStoryUrl ? true : false,
        },
        ["opnsesame"]: {
          ...prevState?.["opnsesame"],
          ["story_url"]: storyDetailsStoryUrl ? true : false,
        },
        ["share-on-email"]: {
          ...prevState?.["share-on-email"],
          ["story_url"]: storyDetailsStoryUrl ? true : false,
        },
      };
    });
  }, [communityId]);

  // Handle accordion
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };
  // Form to handle post on opn sesame
  const handlePostOpnSesame = (e) => {
    chanelPostHandle(e.target, selectedOption);
  };
  function getKeyByValue(object, value) {
    return Object.keys(object).filter((key) => object[key] === value);
  }

  // Export data
  const handleExportData = () => {
    let exportData;

    const exportFileName = prompt("Enter download file name");

    if (changedAccordionId === "share-on-email") {
      exportData = {
        story_id: parseInt(communityId),
        // story_id: 955154,
        data_columns: getKeyByValue(selectPostList?.["share-on-email"], true),
      };
    }

    api
      .post(`${BACKEND_API_URL}community/story-export/`, exportData, {
        responseType: "blob",
      })
      .then((response) => {
        // create file link in browser's memory
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data], {
            type: response.data.type,
          })
        );
        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute(
          "download",
          exportFileName ? `${exportFileName}.zip` : "story.zip"
        );
        // document.body.appendChild(link);
        if (exportFileName) {
          link.click();
        }

        // clean up "a" element & remove ObjectURL
        // document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        // console.log("Export error", error);
      });
  };
  return (
    <>
      <Accordion
        expanded={expandedAccordion === changedAccordionId}
        onChange={handleAccordionChange(changedAccordionId)}
        sx={{
          width: "100%",
          position: "relative",
          overflow: "unset",
          p: 1.875,
          borderRadius: "5px",
          "&.MuiPaper-root": {
            "&.MuiPaper-elevation": {
              "&.MuiPaper-rounded": {
                "&.MuiPaper-elevation1": {
                  boxShadow: "none",
                  border: "1px solid rgba(113, 117, 123, 0.2);",
                  m: 0,
                  mb: 2,
                  "&:before": {
                    display: "none",
                  },
                  "&.Mui-expanded": {
                    borderColor: "#2472fc",
                  },
                },
              },
            },
          },
        }}
      >
        <AccordionSummary
          id={changedAccordionId}
          sx={{
            padding: 0,
            minHeight: "auto",
            "&.Mui-expanded": {
              minHeight: "auto",
            },
            "& .MuiAccordionSummary-content": {
              margin: 0,
              color: "#71757B",
              "&.Mui-expanded": {
                color: "#2472fc",
              },
              "&.Mui-expanded .MuiBox-root .MuiTypography-root": {
                borderColor: "#2472fc",
              },
            },
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            className="items-center justify-between w-full"
          >
            <Stack direction="row" spacing={1} className="items-center">
              <Checkbox checked={expandedAccordion === changedAccordionId} />
              <Box className="flex items-center text-[inherit] gap-1 capitalize">
                <Typography className="rounded-full border-2 p-[7px] text-[inherit] border-[#71757B]">
                  <CommentOutlined color="inherit" />
                </Typography>
                {changedAccordionId?.replace(/-/g, " ")}
              </Box>
            </Stack>
            {expandedAccordion === changedAccordionId && (
              <Button
                variant="contained"
                className="btn btn-primary"
                onClick={() => {
                  setPastActivityPopup(true);
                  handleAccordionChange(changedAccordionId);
                }}
              >
                Past Activities
              </Button>
            )}
          </Stack>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            "&.MuiAccordionDetails-root": {
              px: 0,
            },
          }}
        >
          <Divider sx={{ marginTop: "8px" }} />
          <Box className="mt-[20px]">
            <Box>
              {selectPostList?.[changedAccordionId]?.title && (
                <Typography
                  variant="h3"
                  className="[&.MuiTypography-h3]:!text-base [&.MuiTypography-h3]:mb-[16px]"
                >
                  {agencyCompanyStoryDetails?.title}
                </Typography>
              )}
              {selectPostList?.[changedAccordionId]?.lede && (
                <Typography
                  my={2}
                  sx={{
                    textAlign: "justify",
                    color: "#71757B",
                  }}
                  className="card [&.MuiTypography-root]:w-full p-2 [&.MuiTypography-root]:text-sm [&.MuiTypography-root]:mb-2 [&.MuiTypography-root]:mt-0"
                >
                  {agencyCompanyStoryDetails?.lede}
                </Typography>
              )}

              {selectPostList?.[changedAccordionId]?.image &&
                agencyCompanyStoryDetails?.image?.length > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      overflow: "hidden",
                      width: "100%",
                      borderRadius: "1rem",
                      maxHeight: "200px",
                      marginBottom: "15px",
                      "& img": {
                        objectFit: "cover",
                      },
                    }}
                  >
                    <img
                      src={agencyCompanyStoryDetails?.image[0]}
                      width="100%"
                      height="100%"
                      alt={changedAccordionId}
                    />
                  </Box>
                )}
              {selectPostList?.[changedAccordionId]?.body && (
                <Box
                  mt={2}
                  sx={{
                    "& p": {
                      marginBottom: "10px",
                      fontSize: "14px",
                      lineHeight: "20px",
                    },
                  }}
                >
                  <ReadMoreButton
                    textContent={agencyCompanyStoryDetails?.body}
                  />
                </Box>
              )}
              {selectPostList?.[changedAccordionId]?.story_url && (
                <Typography
                  my={2}
                  sx={{
                    textAlign: "justify",
                    color: "#000",
                  }}
                  className="[&.MuiTypography-root]:w-full [&.MuiTypography-root]:text-sm [&.MuiTypography-root]:mb-2 [&.MuiTypography-root]:mt-0"
                >
                  Url:
                  <Link
                    href={agencyCompanyStoryDetails?.story_url}
                    target="_blank"
                    className="[&.MuiLink-root]:!pl-1"
                  >
                    {agencyCompanyStoryDetails?.story_url}
                  </Link>
                </Typography>
              )}
              {selectPostList?.[changedAccordionId]?.publication && (
                <Stack direction="row" className="items-center text-sm">
                  BY
                  <Typography
                    variant="body1"
                    className="[&.MuiTypography-root]:text-sm text-theme [&.MuiTypography-root]:ml-1 uppercase"
                  >
                    {agencyCompanyStoryDetails?.community?.name}
                  </Typography>
                </Stack>
              )}
            </Box>
            {selectPostList?.[changedAccordionId] && (
              <Divider sx={{ marginTop: "8px" }} />
            )}
            <FormGroup
              sx={{
                flexDirection: "row",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="title"
                    checked={selectPostList?.[changedAccordionId]?.title}
                    onChange={(e) => handleCheckedData(e, changedAccordionId)}
                  />
                }
                label="Title"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="lede"
                    checked={selectPostList?.[changedAccordionId]?.lede}
                    onChange={(e) => handleCheckedData(e, changedAccordionId)}
                  />
                }
                label="Lede"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="image"
                    checked={selectPostList?.[changedAccordionId]?.image}
                    onChange={(e) => handleCheckedData(e, changedAccordionId)}
                    disabled={
                      selectPostList?.changedAccordionId?.image?.length === 0
                    }
                  />
                }
                label="Image"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="publication"
                    checked={selectPostList?.[changedAccordionId]?.publication}
                    onChange={(e) => handleCheckedData(e, changedAccordionId)}
                  />
                }
                label="Publication"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="body"
                    checked={selectPostList?.[changedAccordionId]?.body}
                    onChange={(e) => handleCheckedData(e, changedAccordionId)}
                  />
                }
                label="Body Text"
              />
              <Tooltip
                title={
                  !storyDetailsStoryUrl ? "Story URL does not exist" : null
                }
                placement="top"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="story_url"
                      checked={selectPostList?.[changedAccordionId]?.story_url}
                      onChange={(e) => handleCheckedData(e, changedAccordionId)}
                    />
                  }
                  disabled={!storyDetailsStoryUrl}
                  label="Story Url"
                />
              </Tooltip>
            </FormGroup>
            {changedAccordionId === "facebook" && !storyDetailsStoryUrl && (
              <div className="input-fields-wrapper mt-2">
                <label className="mb-1">Published URL (Story URL)</label>
                <input
                  className={"input-style mb-[20px]"}
                  placeholder="Enter story url to share on FB"
                  type="url"
                  name="storyUrl"
                  id="storyUrl"
                  value={storyUrlVal}
                  onChange={handleStoryUrl}
                />
              </div>
            )}
            {changedAccordionId !== "share-on-email" &&
              changedAccordionId !== "facebook" && (
                <>
                  <Divider sx={{ my: "12px" }} />
                  <FormGroup>
                    <Grid container spacing={2}>
                      <Grid item lg={6}>
                        <FormControl sx={{ width: "100%" }}>
                          <Typography
                            htmlFor="start-time"
                            sx={{
                              fontSize: "14px",
                              lineHeight: "18px",
                              marginBottom: "10px",
                            }}
                          >
                            Scheduled Time
                          </Typography>
                          <TextField
                            type="datetime-local"
                            id="scheduled-time"
                            sx={{
                              "& .MuiInputBase-input": {
                                px: "10px",
                                py: "12px",
                                borderRadius: "5px",
                              },
                            }}
                            onChange={(e) => handleTimeChange(e.target.value)}
                          />
                        </FormControl>
                      </Grid>
                      {/*<Grid item lg={3}>*/}
                      {/*  <FormControl sx={{ width: "100%" }}>*/}
                      {/*    <Typography*/}
                      {/*      htmlFor="end-time"*/}
                      {/*      sx={{*/}
                      {/*        fontSize: "14px",*/}
                      {/*        lineHeight: "18px",*/}
                      {/*        marginBottom: "10px",*/}
                      {/*      }}*/}
                      {/*    >*/}
                      {/*      End Time*/}
                      {/*    </Typography>*/}
                      {/*    <TextField*/}
                      {/*      type="time"*/}
                      {/*      id="end-time"*/}
                      {/*      sx={{*/}
                      {/*        "& .MuiInputBase-input": {*/}
                      {/*          px: "10px",*/}
                      {/*          py: "12px",*/}
                      {/*          borderRadius: "5px",*/}
                      {/*        },*/}
                      {/*      }}*/}
                      {/*    />*/}
                      {/*  </FormControl>*/}
                      {/*</Grid>*/}
                    </Grid>

                    <Divider sx={{ my: "12px" }} />
                    <Grid container spacing={2}>
                      <Grid item lg={12}>
                        <Typography
                          htmlFor="audience"
                          sx={{
                            fontSize: "14px",
                            lineHeight: "18px",
                            marginBottom: "10px",
                          }}
                        >
                          Audience
                        </Typography>
                        <CustomMuiAutoComplete
                          loader={loadingAgencyAudiencesData}
                          filterList={displayedAudienceOptions}
                          setSelectedOption={setSelectedOption}
                          selectedOption={selectedOption}
                          setSearchText={setSearchText}
                          searchText={searchText}
                          disableClearable={true}
                        />
                      </Grid>
                    </Grid>
                  </FormGroup>
                </>
              )}
            <Divider sx={{ marginTop: "12px" }} />
            <Stack direction="row" spacing={2} className="justify-end mt-3">
              <Button
                variant="outlined"
                className="btn btn-outline"
                onClick={() => setExpandedAccordion(false)}
              >
                Cancel
              </Button>
              {changedAccordionId === "share-on-email" ? (
                <Button
                  variant="contained"
                  className="btn btn-primary"
                  onClick={handleExportData}
                >
                  Export
                </Button>
              ) : (
                <Button
                  name={accordionId}
                  variant="contained"
                  className="btn btn-primary"
                  onClick={handlePostOpnSesame}
                  disabled={
                    changedAccordionId === "facebook" &&
                    !(storyDetailsStoryUrl || storyUrlVal)
                  }
                >
                  Post on {accordionId?.replace(/-/g, " ")}
                </Button>
              )}
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
      <CustomPopup
        dialogTitle="Past Activities"
        textAlign="left"
        dialogContent={<PastActivityModal activityData={postActivityData} />}
        openPopup={pastActivityPopup}
        closePopup={() => setPastActivityPopup(false)}
        dialogAction={false}
        maxWidth="575px"
      />
    </>
  );
};

export default ChannelAccordion;
