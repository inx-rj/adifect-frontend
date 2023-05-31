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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axiosPrivate from "api/axios";
import ReadMoreButton from "./ReadMoreButton";
import MuiAutoComplete from "components/common/muiAutocomplete/MuiAutoComplete";
import MuiPopup from "components/common/muiPopup/MuiPopup";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "redux/store";
import { COMPANY_PROJECTS_STORY_DETAILS_DATA } from "redux/reducers/companies/companies.slice";
import PastActivityModal from "../PastActivityModal/PastActivityModal";
import { Images } from "helper/images";

const ChannelAccordion = (props) => {
  const {
    accordionId,
    displayedAudienceOptions,
    handleCheckedData,
    selectPostList,
    chanelPostHandle,
  } = props;

  const { storyId } = useParams();

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

  const companyProjectsStoryDetails = useAppSelector(
    COMPANY_PROJECTS_STORY_DETAILS_DATA
  );

  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [searchText, setSearchText] = useState("");
  const [pastActivityPopup, setPastActivityPopup] = useState(false);

  // Handle accordion
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  // Form to handle post on opn sesame
  const handlePostOpnSesame = (e) => {
    e.preventDefault();
    chanelPostHandle(e.target);
  };
  function getKeyByValue(object, value) {
    return Object.keys(object).filter((key) => object[key] === value);
  }
  // Export data
  const handleExportData = () => {
    let exportData;
    const exportFileName = prompt("Enter download file name");
    if (accordionId === "share-on-email") {
      exportData = {
        story_id: parseInt(storyId),
        data_columns: getKeyByValue(selectPostList?.["share-on-email"], true),
      };
    }

    axiosPrivate
      .post("https://dev-api.adifect.com/community/story-export/", exportData, {
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
        console.log("Export error", error);
      });
  };

  const handleChange = (e, v) => {
    setSelectedOption(v);
  };

  return (
    <>
      <Accordion
        expanded={expanded === accordionId}
        onChange={handleAccordionChange(accordionId)}
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
          id={accordionId}
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
                margin: 0
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
              <Checkbox checked={expanded === accordionId} />
              <Box className="flex items-center text-[inherit] gap-1 capitalize">
                <Typography className="rounded-full border-2 p-[7px] text-[inherit] border-[#71757B]">
                  <CommentOutlined color="inherit" />
                </Typography>
                {accordionId?.replace(/-/g, " ")}
              </Box>
            </Stack>
            {expanded === accordionId && (
              <Button
                variant="contained"
                className="btn btn-primary"
                onClick={() => {
                  setPastActivityPopup(true);
                  handleAccordionChange(accordionId);
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
              {selectPostList?.[accordionId]?.title && (
                <Typography
                  variant="h3"
                  className="[&.MuiTypography-h3]:!text-base [&.MuiTypography-h3]:mb-2 [&.MuiTypography-h3]:font-semibold"
                >
                  {companyProjectsStoryDetails?.data?.title}
                </Typography>
              )}
              {selectPostList?.[accordionId]?.lede && (
                <Typography
                  my={2}
                  sx={{
                    textAlign: "justify",
                    color: "#71757B",
                  }}
                  className="card [&.MuiTypography-root]:w-full p-2 [&.MuiTypography-root]:text-sm [&.MuiTypography-root]:mb-3 [&.MuiTypography-root]:mt-0"
                >
                  {companyProjectsStoryDetails?.data?.lede}
                </Typography>
              )}

              {selectPostList?.[accordionId]?.image &&
                companyProjectsStoryDetails?.data?.image?.length > 0 && (
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
                      src={
                        companyProjectsStoryDetails?.data?.image?.length > 0
                          ? companyProjectsStoryDetails?.data?.image[0]
                          : Images?.PlaceholderImage
                      }
                      width="100%"
                      height="100%"
                      alt="story"
                    />
                  </Box>
                )}
              {selectPostList?.[accordionId]?.body && (
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
                    textContent={companyProjectsStoryDetails?.data?.body}
                  />
                </Box>
              )}
              {selectPostList?.[accordionId]?.publication && (
                <Stack direction="row" className="items-center text-sm">
                  BY
                  <Typography
                    variant="body1"
                    className="[&.MuiTypography-root]:text-sm text-theme [&.MuiTypography-root]:ml-1 uppercase"
                  >
                    {companyProjectsStoryDetails?.data?.community?.name}
                  </Typography>
                </Stack>
              )}
            </Box>
            {selectPostList?.[accordionId] && (
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
                    checked={selectPostList?.[accordionId]?.title}
                    onChange={(e) => handleCheckedData(e, accordionId)}
                  />
                }
                label="Title"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="lede"
                    checked={selectPostList?.[accordionId]?.lede}
                    onChange={(e) => handleCheckedData(e, accordionId)}
                  />
                }
                label="Lede"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="image"
                    checked={selectPostList?.[accordionId]?.image}
                    onChange={(e) => handleCheckedData(e, accordionId)}
                    disabled={selectPostList?.accordionId?.image?.length === 0}
                  />
                }
                label="Image"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="publication"
                    checked={selectPostList?.[accordionId]?.publication}
                    onChange={(e) => handleCheckedData(e, accordionId)}
                  />
                }
                label="Publication"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="body"
                    checked={selectPostList?.[accordionId]?.body}
                    onChange={(e) => handleCheckedData(e, accordionId)}
                  />
                }
                label="Body Text"
              />
            </FormGroup>
            {accordionId !== "share-on-email" && (
              <>
                <Divider sx={{ my: "12px" }} />
                <FormGroup>
                  {accordionId !== "facebook" && (
                    <>
                      <Grid container spacing={2}>
                        <Grid item lg={6}>
                          <FormControl sx={{ width: "100%" }}>
                            <Typography
                              // htmlFor="start-time"
                              sx={{
                                fontSize: "14px",
                                lineHeight: "18px",
                                marginBottom: "10px",
                              }}
                            >
                              Start Time
                            </Typography>
                            <TextField
                              type="time"
                              id="start-time"
                              sx={{
                                "& .MuiInputBase-input": {
                                  px: "10px",
                                  py: "12px",
                                  borderRadius: "5px",
                                },
                              }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item lg={6}>
                          <FormControl sx={{ width: "100%" }}>
                            <Typography
                              // htmlFor="end-time"
                              sx={{
                                fontSize: "14px",
                                lineHeight: "18px",
                                marginBottom: "10px",
                              }}
                            >
                              End Time
                            </Typography>
                            <TextField
                              type="time"
                              id="end-time"
                              sx={{
                                "& .MuiInputBase-input": {
                                  px: "10px",
                                  py: "12px",
                                  borderRadius: "5px",
                                },
                              }}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Divider sx={{ my: "12px" }} />
                    </>
                  )}
                  <Grid container spacing={2}>
                    <Grid item lg={12}>
                      <Typography
                        // htmlFor="audience"
                        sx={{
                          fontSize: "14px",
                          lineHeight: "18px",
                          marginBottom: "10px",
                        }}
                      >
                        Audience
                      </Typography>
                      <MuiAutoComplete
                        label=""
                        placeholder={"Select Community"}
                        filterList={displayedAudienceOptions ?? []}
                        // setSelectedOption={setSelectedOption}
                        selectedOption={selectedOption}
                        setSearchText={setSearchText}
                        searchText={searchText}
                        handleChange={handleChange}
                        customClass={""}
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
                onClick={() => setExpanded(false)}
              >
                Cancel
              </Button>
              {accordionId === "share-on-email" ? (
                <Button
                  variant="contained"
                  className="btn btn-primary"
                  onClick={handleExportData}
                >
                  Export
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="btn btn-primary"
                  name={accordionId}
                  onClick={handlePostOpnSesame}
                >
                  Post on {accordionId?.replace(/-/g, " ")}
                </Button>
              )}
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
      <MuiPopup
        dialogTitle="Past Activities"
        textAlign="left"
        dialogContent={<PastActivityModal activityData={postActivityData} />}
        openPopup={pastActivityPopup}
        closePopup={() => setPastActivityPopup(false)}
        dialogAction={false}
        maxWidth="575px"
        mainActionTitle="Create"
      />
    </>
  );
};

export default ChannelAccordion;
