import { useMemo, useState } from "react";
import {
  Autocomplete,
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { formateISODateToLocaleString } from "helper/utility/customFunctions";
import { useAppDispatch, useAppSelector } from "redux/store";
import { COMPANY_PROJECTS_STORY_DETAILS_DATA } from "redux/reducers/companies/companies.slice";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import { GET_STORY_DETAILS_LIST } from "redux/actions/companies/companies.actions";
import ReadMoreButton from "./channelAccordion/ReadMoreButton";
import ChannelAccordion from "./channelAccordion/ChannelAccordion";
import {
  DELETE_STORY_TAG,
  POST_EXISTING_COMPANY_PROJECTS_STORY_TAG,
} from "redux/actions/companies/companiesTags.actions";
import useCopyToClipboard from "./CopyToClipBoard";
import HelmetMetaData from "components/common/HelmetMetaData";
import { Images } from "helper/images";
import { Link } from "@mui/icons-material";
import { COMPANY_PROJECTS_STORY_TAGS_RESPONSE } from "redux/reducers/companies/companiesTags.slice";
import CreateTag from "./CreateTag";
import { GET_COMMUNITY_AUDIENCE_LIST } from "redux/actions/audience/audience.actions";
import { COMMUNITY_AUDIENCE_DATA } from "redux/reducers/companies/audience.slice";
import 'helper/utility/fb/fbSDKInit';
import swal from "sweetalert";
import { POST_COMPANY_PROJECTS_STORY_TAG } from "redux/actions/companies/companiesTags.actions";

const AgencyCompanyProjectsDetails = () => {
  const { storyId } = useParams();
  const dispatch = useAppDispatch();
  const [isValueCopied, copy] = useCopyToClipboard();

  const companyProjectsStoryDetails = useAppSelector(
    COMPANY_PROJECTS_STORY_DETAILS_DATA
  );

  const success = useAppSelector(COMPANY_PROJECTS_STORY_TAGS_RESPONSE);
  const communityAudienceList = useAppSelector(COMMUNITY_AUDIENCE_DATA);
  console.log("communityAudienceList", communityAudienceList);

  const [tags, setTags] = useState([{ title: "", label: "", value: "" }]);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [selectPostList, setPostList] = useState({
    Facebook: {
      title: true,
      lede: true,
      image: true,
      publication: true,
      body: true,
    },
    OpnSesame: {
      title: true,
      lede: true,
      image: true,
      publication: true,
      body: true,
    },
    "share-on-email": {
      title: true,
      lede: true,
      image: true,
      publication: true,
      body: true,
    },
  });

  const selectChannel = useMemo(
    () =>
      companyProjectsStoryDetails?.data?.community_channels
        ?.map((ii) => ii?.channel_data?.name)
        ?.concat("share-on-email"),
    [companyProjectsStoryDetails?.data?.community_channels]
  );
  // Sharing
  const sharingHandle = ({ name = "" }) => {
    console.log(
      companyProjectsStoryDetails,
      "companyProjectsListOnSharingHandle"
    );

    if (name.toLowerCase() === "facebook") {
      FB.getLoginStatus((response) => {
        console.log(response, "Login Details");
      }, true);

      FB.api("/me", "get", { fields: "name,picture" }, function (response) {
        if (response) {
          console.log(response, "Profile Details"); // The user's name
        }
      });

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

      FB.ui(
        {
          display: "popup",
          method: "share",
          href:
            companyProjectsStoryDetails.data.image?.[0] ||
            "https://dev.adifect.com/company-projects", // The URL you want to share
          hashtag: `#${companyProjectsStoryDetails.data.community.name
            .split(" ")
            .join("")
            .toLowerCase()}`, // The hashtag you want to include
          quote: "Check out this awesome post!", // The text you want to share
        },
        function (response) {
          if (response && !response.error_message) {
            // The share was successful
            console.log("Post shared successfully!", response);
          } else {
            // There was an error sharing the post
            console.log("Error sharing post:", JSON.stringify(response));
          }
        }
      );
    }
  };

  const handleOpenTagModal = () => {
    setOpenTagModal(true);
  };

  const handleOnKeyChange = (value) => {
    if (value.key !== "Enter") return;
    const values = value.target.value;
    if (!values.trim()) return;

    const filteredTags = tags?.filter(
      (str) => str?.title?.toLowerCase() === values?.toLowerCase()
    );

    if (filteredTags?.length > 0) {
      swal({
        title: "Notice",
        text: "Tag already added",
        className: "errorAlert-login",
        icon: Images.ErrorLogo,
        buttons: {
          OK: false,
        },
        timer: 3000,
      });
      return;
    }
    // e.target.value = "";

    const tagData: any = {
      story: storyId,
      title: value.target.value,
      description: "this is description",
    };
    dispatch(POST_COMPANY_PROJECTS_STORY_TAG(tagData));
    value.target.value = "";
  };

  useSingleEffect(() => {
    dispatch(GET_STORY_DETAILS_LIST(storyId));
    dispatch(GET_COMMUNITY_AUDIENCE_LIST(storyId));
    setTags(
      companyProjectsStoryDetails?.data?.tag?.map((option) => {
        return {
          title: option?.title,
          label: option?.title,
          value: option?.id,
        };
      })
    );
  });

  useUpdateEffect(() => {
    dispatch(GET_STORY_DETAILS_LIST(storyId));
    setTags(
      companyProjectsStoryDetails?.data?.tag?.map((option) => {
        return {
          title: option?.title,
          label: option?.title,
          value: option?.id,
        };
      })
    );
  }, [storyId, success]);

  useUpdateEffect(() => {
    dispatch(GET_COMMUNITY_AUDIENCE_LIST(storyId));
    // .then((res) => {
    //   console.log("res", res);
    //   // setAudienceData(res.data.data.results);
    //   return res;
    // })
    // .catch((error) => {
    //   return console.log("agencyaudience Error", error);
    // });
  }, [storyId, success]);

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

  const displayedAudienceOptions = useMemo(
    () =>
      communityAudienceList?.data?.results?.map((option) => {
        return {
          name: option?.title,
          id: option?.id,
        };
      }),
    [communityAudienceList?.data?.results]
  );

  const storyTagsList = useMemo(() => {
    return companyProjectsStoryDetails?.data?.community_tags
      ?.filter(
        (item) =>
          !tags?.some(
            (filterItem) =>
              filterItem.label?.toLowerCase() === item?.title?.toLowerCase()
          )
      )
      ?.map((option) => {
        return {
          label: option?.title,
          value: option?.id,
        };
      });
  }, [companyProjectsStoryDetails?.data?.community_tags, tags]);

  return (
    <div className="page-container">
      <h1 className="page-title">Story Details</h1>

      {companyProjectsStoryDetails?.loading && <LoadingSpinner />}

      {!companyProjectsStoryDetails?.loading &&
        Object.keys(companyProjectsStoryDetails?.data).length && (
          <div className="page-card card p-0">
            <Box
              sx={{ width: "100%", py: 2, pl: 2, pr: 3.125 }}
              key={companyProjectsStoryDetails?.data?.id}
            >
              <Grid container>
                <Grid item xs={8} p={2} pr={6}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {companyProjectsStoryDetails?.data?.title}
                  </Typography>

                  {companyProjectsStoryDetails?.data?.lede && (
                    <Typography
                      my={2}
                      sx={{ textAlign: "justify", color: "#71757B" }}
                    >
                      {companyProjectsStoryDetails?.data?.lede}
                    </Typography>
                  )}
                  {companyProjectsStoryDetails?.data?.image?.length > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        overflow: "hidden",
                        width: "100%",
                        borderRadius: "1rem",
                        maxHeight: "400px",
                        minHeight: "400px",
                      }}
                      className="bg-[#e9e9e9]"
                    >
                      {companyProjectsStoryDetails?.data?.image?.length > 0 ? (
                        <img
                          src={companyProjectsStoryDetails?.data?.image[0]}
                          width="100%"
                          height="100%"
                          alt="story"
                          className="object-cover"
                        />
                      ) : (
                        <img
                          src={Images?.PlaceholderImage}
                          alt="story"
                          className="mx-auto object-contain"
                        />
                      )}
                    </Box>
                  )}
                  <Box
                    mt={3}
                    sx={{
                      "& p": {
                        marginBottom: "30px",
                      },
                    }}
                  >
                    <ReadMoreButton
                      textContent={companyProjectsStoryDetails?.data?.body}
                    />
                  </Box>
                  <Box sx={{ marginTop: 2 }}>
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
                      {selectChannel?.map((accordionId, index) => {
                        return (
                          <ChannelAccordion
                            key={index}
                            accordionId={accordionId}
                            displayedAudienceOptions={displayedAudienceOptions}
                            handleCheckedData={handleCheckedData}
                            selectPostList={selectPostList}
                            chanelPostHandle={sharingHandle}
                          />
                        );
                      })}
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Card
                    sx={{
                      maxWidth: "689px",
                      width: "100%",
                      position: "relative",
                      overflow: "unset",
                      display: "flex",
                      p: 1.875,
                      borderRadius: 1,
                      "&.MuiPaper-root": {
                        "&.MuiPaper-elevation": {
                          "&.MuiPaper-rounded": {
                            "&.MuiPaper-elevation1": {
                              // boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
                              boxShadow: "none",
                              border: "1px solid rgba(113, 117, 123, 0.2);",
                              // filter: 'drop-shadow(rgba(0, 0, 0, 0.25) 0px 0px 4px)',
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
                          {companyProjectsStoryDetails.data.community.name ??
                            ""}
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
                          {formateISODateToLocaleString(
                            companyProjectsStoryDetails.data
                              .published_at
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
                          {formateISODateToLocaleString(
                            companyProjectsStoryDetails.data
                              .updated_at
                          ) ?? ""}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                  {/* Story Category */}
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
                              "& span.MuiChip-label.MuiChip-labelMedium": {
                                fontSize: "12px",
                              },
                            }}
                          />
                        </Stack>
                      </Grid>
                      {companyProjectsStoryDetails?.data?.tag?.length > 0 && (
                        <>
                          <Divider
                            light
                            sx={{ marginY: "15px", width: "100%" }}
                          />
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
                            <Stack direction="row" spacing={1}>
                              {companyProjectsStoryDetails?.data?.tag?.map(
                                (tags) => {
                                  return (
                                    <Chip
                                      label={tags?.name}
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
                                }
                              )}
                            </Stack>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Card>
                  <HelmetMetaData
                    quote={companyProjectsStoryDetails.data.lede}
                    title={companyProjectsStoryDetails.data.title}
                    image={companyProjectsStoryDetails.data.image?.[0]}
                    description={companyProjectsStoryDetails.data.body}
                  />
                  <meta
                    property="og:url"
                    content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html"
                  />
                  <meta property="og:type" content="article" />
                  <meta
                    property="og:title"
                    content="When Great Minds Don’t Think Alike"
                  />
                  <meta
                    property="og:description"
                    content="How much does culture influence creative thinking?"
                  />
                  <meta
                    property="og:image"
                    content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg"
                  />

                  {/* Tags */}
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
                      <Grid item xs={8}>
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
                      <Grid item xs={4}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontFamily: '"Figtree", sans-serif',
                            fontWeight: 500,
                            lineHeight: "22px",
                            marginBottom: "15px",
                            textAlign: "end",
                            color: "#2472fc",
                            cursor: "pointer",
                          }}
                          onClick={() => handleOpenTagModal()}
                        >
                          + Add
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" spacing={1}>
                          <div className="Marketing- mt-2- w-full">
                            <div className="">
                              <Autocomplete
                                // value={tags ?? []}
                                multiple
                                id="tags-outlined"
                                options={storyTagsList}
                                getOptionLabel={(option: any) => {
                                  return option?.label;
                                }}
                                onChange={(e, v, a, b) => {
                                  // console.log("first", e, v, a, b);
                                  if (a === "removeOption") {
                                    dispatch(
                                      DELETE_STORY_TAG(
                                        b?.option?.value,
                                        storyId
                                      )
                                    );
                                  }
                                  setTags(v);
                                  if (a === "selectOption") {
                                    // console.log("first", e, v, a, b);
                                    dispatch(
                                      POST_EXISTING_COMPANY_PROJECTS_STORY_TAG(
                                        b?.option?.value,
                                        storyId
                                      )
                                    );
                                  }
                                }}
                                defaultValue={companyProjectsStoryDetails?.data?.tag?.map(
                                  (tag) => {
                                    return {
                                      label: tag?.title,
                                      value: tag?.id,
                                    };
                                  }
                                )}
                                onKeyDown={handleOnKeyChange}
                                disableClearable
                                filterSelectedOptions
                                noOptionsText={
                                  "Press enter to add story tags and select again"
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    fullWidth
                                    placeholder="Type something"
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Card>
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
                            {companyProjectsStoryDetails?.data?.p_url}
                          </Typography>
                          <Tooltip
                            title={`${companyProjectsStoryDetails?.data?.p_url} copied`}
                            open={isValueCopied}
                            disableFocusListener
                            disableHoverListener
                            arrow
                          >
                            <IconButton
                              className="[&.MuiIconButton-root]:bg-[#71757B]/20 text-xs [&.MuiIconButton-root]:p-1"
                              onClick={() =>
                                copy(companyProjectsStoryDetails?.data?.p_url)
                              }
                            >
                              <Link // Material Ui icon
                                fontSize="inherit"
                                className="[&.MuiSvgIcon-root]:w-4 [&.MuiSvgIcon-root]:h-4 -rotate-45"
                              />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </div>
        )}
      {openTagModal && (
        <>
          <CreateTag
            storyId={storyId}
            openTagModal={openTagModal}
            setOpenTagModal={setOpenTagModal}
          />
        </>
      )}
    </div>
  );
};

export default AgencyCompanyProjectsDetails;
