import Swal from "sweetalert";
import {
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { validations } from "../../../utils";
import { Link } from "@mui/icons-material";
import { BACKEND_API_URL } from "../../../environment";
import api from "../../../utils/api";
import {
  agencyAudiencesListAction,
  agencyCompanyStoryDetailsAction,
} from "../../../redux/actions/Agency-companies-tabs-actions";
import useCopyToClipboard from "./CopyToClipBoard";
import ReadMoreButton from "./channelAccordion/ReadMoreButton";
import ChannelAccordion from "./channelAccordion/ChannelAccordion";
import LoadingSpinner from "../../../containers/LoadingSpinner";
import HelmetMetaData from "./HelmetMetaData";
import moment from "moment";

const Agency_company_projects_details = () => {
  const APi_URL = `${BACKEND_API_URL}community/open-sesame/`;
  const [isValueCopied, copy] = useCopyToClipboard();
  const [storyUrlVal, setStoryUrlVal] = useState("");
  const [scheduledTimeVal, setScheduledTimeVal] = useState("");
  const { communityId } = useParams();
  const dispatch = useDispatch();
  const [expandedAccordion, setExpandedAccordion] = useState(false);

  const { loading, agencyCompanyStoryDetails } = useSelector(
    (state) => state.AgencyCompanyStoryDetailReducer
  );
  const { agencyAudiencesData } = useSelector(
    (state) => state.AgencyAudiencesReducer
  );

  const [selectPostList, setPostList] = useState({
    facebook: {
      title: true,
      lede: true,
      image: true,
      publication: true,
      body: true,
      story_url: false,
    },
    opnsesame: {
      title: true,
      lede: true,
      image: true,
      publication: true,
      body: true,
      story_url: false,
    },
    "share-on-email": {
      title: true,
      lede: true,
      image: true,
      publication: true,
      body: true,
      story_url: false,
    },
  });

  useEffect(() => {
    dispatch(agencyCompanyStoryDetailsAction(communityId));
  }, [communityId]);

  // Audiences fetch list API call
  useEffect(() => {
    // console.log({ agencyCompanyStoryDetails, communityId, agencyAudiencesData });
    if (agencyCompanyStoryDetails?.community?.id) {
      dispatch(
        agencyAudiencesListAction(
          {},
          { community: agencyCompanyStoryDetails.community.id }
        )
      );
    }
  }, [agencyCompanyStoryDetails, communityId]);

  const handleCheckedData = (e, accordionId) => {
    const { checked, name } = e.target;

    setPostList((prevState) => {
      return {
        ...prevState,
        [accordionId]: {
          ...prevState?.[accordionId],
          [name]: checked,
        },
      };
    });
  };

  // Send data to facebook post
  const sendDataToFacebookPopup = async (storyId) => {
    // console.log("calling api...");

    // console.log(agencyCompanyStoryDetails);

    try {
      window.FB.ui(
        {
          display: "dialog",
          method: "share",
          // href: "https://www.youtube.com/watch?v=LyK2yWfQqcQ",
          // href: "https://blog.bit.ai/content-management-systems/",
          // href: `${BACKEND_API_URL}community/story-page/${storyId}/`,
          href: agencyCompanyStoryDetails?.story_url || storyUrlVal,
          // href:
          //   agencyCompanyStoryDetails?.image[0] ||
          //   "https://dev.adifect.com/company-projects", // The URL you want to share
          hashtag: `#${agencyCompanyStoryDetails.community.name
            .split(" ")
            .join("")
            .toLowerCase()}`, // The hashtag you want to include
          // quote: "Check out this awesome post!", // The text you want to share
        },
        function (response) {
          if (response && !response.error_message) {
            // The share was successful
            // console.log("Post shared successfully!", response);
          } else {
            // There was an error sharing the post
            // console.log("Error sharing post:", JSON.stringify(response));
          }
        }
      );

      // FB.ui({
      //   display: "popup",
      //   method: "share_open_graph",
      //   action_type: "og.shares",
      //   // action_properties: {
      //   //     object: {
      //   //         // type: 'matchadviceuk:quiz',
      //   //         url: "http://advice.uk.match.com/quizzes/which-european-are-you-destined-date",
      //   //         title: "I got " + companyProjectsStoryDetails.data.community.name + "! Which European are you destined to date?",
      //   //         description: companyProjectsStoryDetails.data.body,
      //   //         image: companyProjectsStoryDetails.data.image?.[0]
      //   //     }
      //   // },
      //   action_properties: {
      //     object: {
      //       'og:url': 'https://adifect-frontend.vercel.app/login',
      //       'og:title': agencyCompanyStoryDetails.community.name,
      //       'og:description': agencyCompanyStoryDetails.body,
      //       'og:image': agencyCompanyStoryDetails?.image?.[0],
      //     }
      //   },
      //   href: agencyCompanyStoryDetails?.image?.[0], // The URL you want to share
      //   hashtag: `#${agencyCompanyStoryDetails.community.name
      //     .split(" ")
      //     .join("")
      //     .toLowerCase()
      //     }`, // The hashtag you want to include
      //   // quote: "Check out this awesome post!", // The text you want to share
      // }, function (response) {
      //   if (response && !response.error_message) {
      //     // The share was successful
      //     console.log('Post shared successfully!', response);
      //   } else {
      //     // There was an error sharing the post
      //     console.log('Error sharing post:', JSON.stringify(response));
      //   }
      // });
    } catch (error) {
      console.log(error, "FB Err");
    }
  };

  //  Refresh the base Page to fetch
  const refreshTheBasePage = async (storyId) => {
    // console.log("call the base page api");

    api
      .get(`${BACKEND_API_URL}community/story-page/${storyId}/`)
      .then((res) => {
        sendDataToFacebookPopup(storyId);
      });
  };

  // Sharing
  const sharingHandle = async ({ name = "" }, selectedAudience) => {
    if (name.toLowerCase() === "facebook") {
      if (agencyCompanyStoryDetails?.story_url) {
        await refreshTheBasePage(agencyCompanyStoryDetails?.id);
      } else {
        try {
          const isUrlCorrect = new URL(storyUrlVal);
          if (isUrlCorrect) {
            await refreshTheBasePage(agencyCompanyStoryDetails?.id);
          }
        } catch (error) {
          Swal({
            title: "Error",
            text: "Invalid Story URL",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 3000,
          });
        }
      }

      // window.FB.getLoginStatus((response) => {
      //   console.log(response, "Login Details");
      // }, true);

      // window.FB.api(
      //   "/me",
      //   "get",
      //   { fields: "name,picture" },
      //   function (response) {
      //     if (response) {
      //       console.log(response, "Profile Details"); // The user's name
      //     }
      //   }
      // );

      // FB share_on_graph method
      // FB.ui({
      //     display: "popup",
      //     // @ts-ignore
      //     method: "share_open_graph",
      //     action_type: "og.shares",
      //     // action_properties: {
      //     //     object: {
      //     //         // type: 'matchadviceuk:quiz',
      //     //         url: "http://advice.uk.match.com/quizzes/which-european-are-you-destined-date",
      //     //         title: "I got " + companyProjectsStoryDetails.data.community.name + "! Which European are you destined to date?",
      //     //         description: companyProjectsStoryDetails.data.body,
      //     //         image: companyProjectsStoryDetails.data.image?.[0]
      //     //     }
      //     // },
      //     action_properties: {
      //         object: {
      //             'og:url': 'http://advice.uk.match.com/quizzes/which-european-are-you-destined-date',
      //             'og:title': companyProjectsStoryDetails.data.community.name,
      //             'og:description': companyProjectsStoryDetails.data.body,
      //             'og:image': companyProjectsStoryDetails.data.image?.[0],
      //         }
      //     },
      //     href: companyProjectsStoryDetails.data.image?.[0], // The URL you want to share
      //     // hashtag: `#${companyProjectsStoryDetails.data.community.name}`, // The hashtag you want to include
      //     // quote: "Check out this awesome post!", // The text you want to share
      // }, function (response) {
      //     if (response && !response.error_message) {
      //         // The share was successful
      //         console.log('Post shared successfully!', response);
      //     } else {
      //         // There was an error sharing the post
      //         console.log('Error sharing post:', JSON.stringify(response));
      //     }
      // });
    }

    if (name.toLowerCase() === "opnsesame") {
      // console.log("OpnSesame", selectPostList);
      const opnSeasameData = {
        data: Object.keys(selectPostList["opnsesame"])
          .filter((key) => selectPostList["opnsesame"][key] === true)
          .map((e) => {
            return { [e]: agencyCompanyStoryDetails[e] };
          })
          .reduce((result, currentObj) => {
            return { ...result, ...currentObj };
          }, {}),
        config: {
          key: agencyCompanyStoryDetails["community_channels"].find(
            (e) => e["channel_data"].name.toLowerCase() === "opnsesame"
          )?.["api_key"],
          client_id: agencyCompanyStoryDetails["community_channels"].find(
            (e) => e["channel_data"].name.toLowerCase() === "opnsesame"
          )?.["url"],
          audience_id: selectedAudience?.value,
        },
      };
      await sendDataToOpnSesame(opnSeasameData);
    }
  };

  // Approve campaign
  // const approveCreatedCampaign = async (campaignData, data) => {
  //   // console.log("campaignData", campaignData);

  //   Swal({
  //     title: `${campaignData?.name} Campaign Created`,
  //     text: `${campaignData?.message}`,
  //     buttons: {
  //       approve: {
  //         text: "Approve",
  //         value: "approve",
  //       },
  //       reject: {
  //         text: "Reject",
  //         value: "reject",
  //       },
  //     },
  //   }).then(async (value) => {
  //     switch (value) {
  //       case "approve":
  //         Swal({
  //           title: "Your campaign has been approved",
  //           icon: "/img/logonew.svg",
  //           className: "successAlert-login",
  //         });
  //         break;
  //       default:
  //         Swal({
  //           title: "Campaing has been rejected",
  //           icon: "/img/logonew-red.svg",
  //           className: "errorAlert",
  //         });
  //     }
  //     if (value === "approve") {
  //       const approveCampaignPayload = {
  //         url: `${data?.config?.client_id}/campaigns/${campaignData?.id}/approve`,
  //         method: "GET",
  //         token: data?.config?.key,
  //       };
  //       await api.post(APi_URL, approveCampaignPayload).then(async () => {
  //         Swal({
  //           title: "Message has been scheduled successfully",
  //           icon: "/img/logonew.svg",
  //           className: "successAlert-login",
  //         });
  //       });
  //     }
  //   });
  // };

  // Create campaign on opnSesame
  const createCampaignOnOpnSesame = async (audience, data) => {
    const campUniName = `CAMPAIGN_${data?.data?.title
      ?.split(" ")
      .slice(0, 2)
      .join("_")
      .toUpperCase()}`;

    const campaignPayload = {
      url: `${data?.config?.client_id}/campaigns`,
      method: "POST",
      token: data?.config?.key,
      name: campUniName,
      message: `${data?.data?.title}`,
      audience: audience?.id,
      scheduled_time: scheduledTimeVal ? scheduledTimeVal : moment().toDate(),
      opt_out_language: true,
    };

    if (data?.data?.image?.[0]) {
      campaignPayload.media_url = `${data?.data?.image?.[0]}`;
    }
    if (data?.data?.body) {
      campaignPayload.message = `${data?.data?.title} <br/> ${data?.data?.body}`;
    }

    if (data?.data?.story_url) {
      campaignPayload.long_url = `${data?.data?.story_url}`;
      campaignPayload.url_shorten = true;
      campaignPayload.url_shorten_service = "1to1";
      campaignPayload.domain = "i.mm-news.co";
    }

    await api.post(APi_URL, campaignPayload).then(async (res) => {
      Swal({
        title: `Campaign ${res?.data?.data?.id} has been posted successfully`,
        className: "successAlert-confirm-campaign",
        icon: "/img/logonew.svg",
        buttons: "Ok",
      });
      // await approveCreatedCampaign(campaignData, data);
    });
  };

  // Get audiences from list
  const getAudiencesFromOpnSesame = async (data) => {
    const audiencePayload = {
      url: `${data?.config?.client_id}/audiences`,
      method: "GET",
      token: data?.config?.key,
    };
    await api.post(APi_URL, audiencePayload).then((res) => {
      const audiences = (res?.data?.data?.results || res?.data?.data)
        ?.filter((item) => item.id === parseInt(data?.config?.audience_id))
        .map(async (audience) => {
          await createCampaignOnOpnSesame(audience, data);
        });

      if (!audiences?.length) {
        Swal({
          title: "Error",
          text:
            res?.data?.data?.detail ?? "Audience does not belong to this story",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 5000,
        });
      }
    });
  };

  // Send data to opnsesame
  const sendDataToOpnSesame = async (data) => {
    await getAudiencesFromOpnSesame(data);
  };

  const displayedAudienceOptions = useMemo(
    () =>
      agencyAudiencesData?.length
        ? agencyAudiencesData?.map((option) => {
          return {
            label: option.name,
            value: option.audience_id,
          };
        })
        : [],
    [agencyAudiencesData]
  );

  // Community channel list
  const communityChannelList = useMemo(
    () =>
      agencyCompanyStoryDetails?.community_channels
        ?.map((item) => item?.channel_data?.name)
        ?.concat("share-on-email"),
    [agencyCompanyStoryDetails?.community_channels]
  );

  // Code to initialize and setup the fb SDK.
  const fbSdkInit = (appIdKey) => {
    // const REACT_APP_FB_APP_ID="244045127997497" // Inx-Microsoft (OneEyed Jack)
    // const REACT_APP_FB_APP_ID="926907658370963" // Inx-Gmail (Inx)
    // const REACT_APP_FB_APP_ID = "985432012649664" // Mailinator (John Due)

    // console.log(appIdKey, 'FbAppId')

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appIdKey,
        cookie: true,
        status: true,
        xfbml: true,
        autoLogAppEvents: true,
        version: "v16.0",
      });

      // Now you can access the FB object
      // console.log(FB);
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };
  useEffect(() => {
    if (agencyCompanyStoryDetails?.["community_channels"]?.length) {
      fbSdkInit(
        agencyCompanyStoryDetails?.["community_channels"].find(
          (e) => e["channel_data"].name.toLowerCase() === "facebook"
        )?.["api_key"]
      );
    }
  }, [agencyCompanyStoryDetails]);

  const handleStoryUrl = (e) => {
    e.preventDefault();
    // const isUrlCorrect = new URL(e.target.value);
    // console.log({ inputVal: e.target.value }, "Url Validation");
    setStoryUrlVal(e.target.value);
  };

  const handleTimeChange = (value) => {
    setScheduledTimeVal(value);
  };

  return (
    <>
      <div className="Category_p">
        <div className="CategorylistName">
          <h1>Story Details</h1>
        </div>
      </div>

      <HelmetMetaData
        quote={agencyCompanyStoryDetails?.lede}
        title={agencyCompanyStoryDetails?.title}
        image={agencyCompanyStoryDetails?.image?.[0]}
        description={agencyCompanyStoryDetails?.body}
      />

      <HelmetMetaData
        quote={"Adifect Static Title"}
        title={"Adifect Static Title"}
        image={"https://dev.adifect.com/img/new.svg"}
        description={
          "This four-bed, two-bath home offers 2,350 square feet of living space and a wide open feeling from the formal living room to the kitchen and beyond. The living room is massive; it offers plenty of space to create multiple conversation zones or activity zones, or a kids’ living room space and a space for adults to converse and relax. There’s a wood-burning fireplace with bricks, French doors that lead to the patio, and tall ceilings that make the rooms feel even larger."
        }
      />

      {loading && (
        <Box className="w-full [&>.spinner-container-bg]:backdrop-blur-sm [&>.spinner-container-bg]:bg-white/30">
          <LoadingSpinner />
        </Box>
      )}
      <div className="Topallpage AllPageHight Custompage">
        <div className="ContentDiv">
          <Box
            sx={{ width: "100%", py: 2, pl: 2, pr: 3.125 }}
            key={agencyCompanyStoryDetails?.id}
          >
            {!loading && (
              <Grid container>
                <Grid item xs={8} p={2} pr={6}>
                  <Typography variant="h3">
                    {agencyCompanyStoryDetails?.title}
                  </Typography>
                  {agencyCompanyStoryDetails?.lede && (
                    <Typography
                      my={2}
                      sx={{ textAlign: "justify", color: "#71757B" }}
                    >
                      {agencyCompanyStoryDetails?.lede}
                    </Typography>
                  )}

                  {agencyCompanyStoryDetails?.image?.length > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        overflow: "hidden",
                        width: "100%",
                        borderRadius: "1rem",
                        maxHeight: "300px",
                        "& img": {
                          objectFit: "cover",
                        },
                      }}
                    >
                      <img
                        src={
                          agencyCompanyStoryDetails?.image?.length > 0
                            ? agencyCompanyStoryDetails?.image[0]
                            : null
                        }
                        width="100%"
                        height="100%"
                        alt="story image"
                      />
                    </Box>
                  )}
                  <Box
                    mt={3}
                    sx={{
                      "& p": {
                        marginBottom: "30px",
                      },
                      "& p br": {
                        display: "none",
                      },
                    }}
                  >
                    <ReadMoreButton
                      textContent={agencyCompanyStoryDetails?.body}
                    />
                  </Box>
                  <Box>
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontFamily: '"Figtree", sans-serif',
                          fontWeight: 500,
                          lineHeight: "22px",
                          marginBottom: "15px",
                        }}
                      >
                        Channels
                      </Typography>
                      {communityChannelList?.map((accordionId, index) => {
                        return (
                          <ChannelAccordion
                            key={index}
                            accordionId={accordionId}
                            displayedAudienceOptions={displayedAudienceOptions}
                            handleCheckedData={handleCheckedData}
                            selectPostList={selectPostList}
                            chanelPostHandle={sharingHandle}
                            handleStoryUrl={handleStoryUrl}
                            handleTimeChange={handleTimeChange}
                            storyUrlVal={storyUrlVal}
                            storyDetailsStoryUrl={
                              agencyCompanyStoryDetails?.story_url
                            }
                            setPostList={setPostList}
                            expandedAccordion={expandedAccordion}
                            setExpandedAccordion={setExpandedAccordion}
                          />
                        );
                      })}
                    </Grid>
                  </Box>
                </Grid>
                {/* RIght grid section  */}
                <Grid item xs={4}>
                  <Card
                    sx={{
                      maxWidth: "689px",
                      width: "100%",
                      position: "relative",
                      overflow: "unset",
                      display: "flex",
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
                            },
                          },
                        },
                      },
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography sx={{ color: "#71757B" }}>
                          Community
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"Figtree", sans-serif',
                            fontWeight: 500,
                            lineHeight: "22px",
                          }}
                        >
                          {agencyCompanyStoryDetails?.community?.name ?? ""}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} mt={2}>
                        <Typography sx={{ color: "#71757B" }}>
                          Published Date
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"Figtree", sans-serif',
                            fontWeight: 500,
                            lineHeight: "22px",
                          }}
                        >
                          {validations.formateISODateToLocaleString(
                            agencyCompanyStoryDetails?.published_at
                          ) ?? ""}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} mt={1}>
                        <Typography sx={{ color: "#71757B" }}>
                          Updated Date
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"Figtree", sans-serif',
                            fontWeight: 500,
                            lineHeight: "22px",
                          }}
                        >
                          {validations.formateISODateToLocaleString(
                            agencyCompanyStoryDetails?.updated_at
                          ) ?? ""}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                  {(agencyCompanyStoryDetails?.category?.length > 0 ||
                    agencyCompanyStoryDetails?.tag?.length > 0) && (
                      <Card
                        sx={{
                          maxWidth: "689px",
                          width: "100%",
                          position: "relative",
                          overflow: "unset",
                          display: "flex",
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
                                },
                              },
                            },
                          },
                        }}
                      >
                        <Grid container>
                          {agencyCompanyStoryDetails?.category?.length > 0 && (
                            <>
                              <Grid item xs={12}>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    fontFamily: '"Figtree", sans-serif',
                                    fontWeight: 500,
                                    lineHeight: "22px",
                                    marginBottom: "15px",
                                  }}
                                >
                                  Story Category
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Stack direction="row" spacing={1}>
                                  <Chip
                                    label="This obituary"
                                    color="primary"
                                    variant="outlined"
                                    sx={{
                                      background: "rgba(36, 114, 252, 0.08)",
                                      border: 0,
                                      borderRadius: "5px",
                                      textTransform: "capitalize",
                                      height: "28px",
                                      "& span.MuiChip-label.MuiChip-labelMedium":
                                      {
                                        fontSize: "12px",
                                      },
                                    }}
                                  />
                                </Stack>
                              </Grid>
                            </>
                          )}
                          {agencyCompanyStoryDetails?.category?.length > 0 &&
                            agencyCompanyStoryDetails?.tag?.length > 0 && (
                              <Divider
                                light
                                sx={{ marginY: "15px", width: "100%" }}
                              />
                            )}
                          {agencyCompanyStoryDetails?.tag?.length > 0 && (
                            <>
                              <Grid item xs={12}>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    fontFamily: '"Figtree", sans-serif',
                                    fontWeight: 500,
                                    lineHeight: "22px",
                                    marginBottom: "15px",
                                  }}
                                >
                                  Tags
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Stack
                                  direction="row"
                                  className="flex-wrap gap-2"
                                >
                                  {agencyCompanyStoryDetails?.tag?.map((tags) => {
                                    return (
                                      <Chip
                                        label={tags?.title}
                                        color="primary"
                                        variant="outlined"
                                        sx={{
                                          background: "rgba(36, 114, 252, 0.08)",
                                          border: 0,
                                          borderRadius: "5px",
                                          textTransform: "capitalize",
                                          height: "28px",
                                          "& span.MuiChip-label.MuiChip-labelMedium":
                                          {
                                            fontSize: "12px",
                                          },
                                        }}
                                      />
                                    );
                                  })}
                                </Stack>
                              </Grid>
                            </>
                          )}
                        </Grid>
                      </Card>
                    )}
                  {agencyCompanyStoryDetails?.p_url && (
                    <Card
                      sx={{
                        maxWidth: "689px",
                        width: "100%",
                        position: "relative",
                        overflow: "unset",
                        display: "flex",
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
                              },
                            },
                          },
                        },
                      }}
                    >
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontFamily: '"Figtree", sans-serif',
                              fontWeight: 500,
                              lineHeight: "22px",
                              marginBottom: "15px",
                            }}
                          >
                            pURL
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack
                            direction="row"
                            spacing={1}
                            className="items-center"
                          >
                            <Typography className="text-[#71757B]">
                              {agencyCompanyStoryDetails?.p_url}
                            </Typography>
                            <Tooltip
                              title={`${agencyCompanyStoryDetails?.p_url} copied`}
                              open={isValueCopied}
                              disableFocusListener
                              disableHoverListener
                              arrow
                            >
                              <IconButton
                                className="[&.MuiIconButton-root]:bg-[#71757B]/20 text-xs p-1"
                                onClick={() =>
                                  copy(agencyCompanyStoryDetails?.p_url)
                                }
                              >
                                <Link
                                  fontSize="inherit"
                                  className="[&.MuiSvgIcon-root]:w-4 [&.MuiSvgIcon-root]:h-4 -rotate-45"
                                />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Card>
                  )}
                </Grid>
              </Grid>
            )}
          </Box>
        </div>
      </div>
    </>
  );
};

export default Agency_company_projects_details;
