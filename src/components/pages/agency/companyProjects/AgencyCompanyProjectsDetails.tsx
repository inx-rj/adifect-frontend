import React from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { formateISODateToLocaleString } from 'helper/utility/customFunctions';
import { useAppSelector } from 'redux/store';
import { COMPANY_PROJECTS } from 'redux/reducers/companies/companies.slice';


const AgencyCompanyProjectsDetails = () => {

    const { communityId } = useParams();

    // const { agencyCompanyProjectsList } = useSelector((state) => state.AgencyCompanyProjectsReducer);
    const { companyProjectsList, companyProjectsFilters } = useAppSelector(COMPANY_PROJECTS);

    // useEffect(() => {
    //     const details = agencyCompanyProjectsList.filter((e) => e.id == communityId);

    //     console.log({ agencyCompanyProjectsList, communityId, details }, 'Details');

    //     setSelectedComunityDetails(details);
    // }, [agencyCompanyProjectsList, communityId]);

    // // const selectedComunityDetails = useCallback(() => agencyCompanyProjectsList.find((e) => e.id === communityId), [communityId, agencyCompanyProjectsList]);

    // console.log(selectedComunityDetails);


    return (
        <>
            <div className="Category_p">
                <div className="CategorylistName">
                    <h1>Story Details</h1>
                </div>
            </div>

            <div className="Topallpage AllPageHight Custompage">
                <div className="ContentDiv">
                    {(companyProjectsList.data.results?.filter((e) => e.id == communityId)?.length > 0) &&
                        companyProjectsList.data.results?.filter((e) => e.id == communityId)?.map((item) => (
                            <Box sx={{ width: '100%', py: 2, pl: 2, pr: 3.125 }} key={item.id}>
                                <Grid container>
                                    <Grid xs={8} p={2} pr={6}>
                                        <Typography variant='h3'>
                                            {item.title}
                                        </Typography>

                                        <Typography my={2} sx={{ textAlign: 'justify' }}>
                                            {item.lede}
                                        </Typography>
                                        {item.image &&
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    overflow: 'hidden',
                                                    width: '100%',
                                                    borderRadius: '1rem',
                                                    "& img": {
                                                        objectFit: 'cover',
                                                    }
                                                }}>
                                                <img src={item.image} width="100%" height="100%" />
                                            </Box>}
                                        <Box mt={3} sx={{
                                            "& p": {
                                                marginBottom: '30px',
                                            }
                                        }}>
                                            <Typography sx={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: item.body }} />
                                        </Box>
                                    </Grid>
                                    <Grid xs={4}>
                                        <Card
                                            sx={{
                                                maxWidth: '689px',
                                                width: '100%',
                                                position: 'relative',
                                                overflow: 'unset',
                                                display: 'flex',
                                                p: 1.875,
                                                borderRadius: 0.5,
                                                "&.MuiPaper-root": {
                                                    "&.MuiPaper-elevation": {
                                                        "&.MuiPaper-rounded": {
                                                            "&.MuiPaper-elevation1": {
                                                                // boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
                                                                boxShadow: 'none',
                                                                border: '1px solid rgba(113, 117, 123, 0.2);',
                                                                // filter: 'drop-shadow(rgba(0, 0, 0, 0.25) 0px 0px 4px)',
                                                                m: 0,
                                                                mb: 2,
                                                            }
                                                        }
                                                    }
                                                },
                                            }}>
                                            <Grid container>
                                                <Grid xs={12}>
                                                    <Typography
                                                        sx={{ color: '#71757B' }}
                                                    >
                                                        Community
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontFamily: '"Figtree", sans-serif',
                                                            fontWeight: 500,
                                                            lineHeight: '22px',
                                                        }}
                                                    >
                                                        {item.community.name ?? ''}
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={12} mt={2}>
                                                    <Typography
                                                        sx={{ color: '#71757B' }}
                                                    >
                                                        Published Date
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontFamily: '"Figtree", sans-serif',
                                                            fontWeight: 500,
                                                            lineHeight: '22px',
                                                        }}
                                                    >
                                                        {formateISODateToLocaleString(item.story_metadata.published_at) ?? ''}
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={12} mt={1}>
                                                    <Typography
                                                        sx={{ color: '#71757B' }}
                                                    >
                                                        Updated Date
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontFamily: '"Figtree", sans-serif',
                                                            fontWeight: 500,
                                                            lineHeight: '22px',
                                                        }}
                                                    >
                                                        {formateISODateToLocaleString(item.story_metadata.updated_at) ?? ''}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                        {/* <Card
                                            sx={{
                                                maxWidth: '689px',
                                                width: '100%',
                                                position: 'relative',
                                                overflow: 'unset',
                                                display: 'flex',
                                                p: 1,
                                                borderRadius: 0,
                                                "&.MuiPaper-root": {
                                                    "&.MuiPaper-elevation": {
                                                        "&.MuiPaper-rounded": {
                                                            "&.MuiPaper-elevation1": {
                                                                // boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
                                                                boxShadow: 'none',
                                                                filter: 'drop-shadow(rgba(0, 0, 0, 0.25) 0px 0px 4px)',
                                                                m: 0,
                                                            }
                                                        }
                                                    }
                                                },
                                            }}>
                                            <Grid container>
                                                <Grid xs={12}>
                                                    <Typography
                                                        variant='h2'
                                                        sx={{
                                                            fontFamily: '"Figtree", sans-serif',
                                                            fontWeight: 500,
                                                            lineHeight: '22px'
                                                        }}
                                                    >
                                                        Story Category
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={12}>
                                                    <Button
                                                        variant="contained"
                                                        disableRipple
                                                        disableFocusRipple
                                                        disableElevation
                                                        sx={{
                                                            width: "80px",
                                                            height: "28px",
                                                            padding: "7px 5px",
                                                            background: "rgba(36, 114, 252, 0.08)",
                                                            color: "#2472FC",
                                                            fontSize: "12px",
                                                            textTransform: "capitalize",
                                                            "&[type=button]:not(:disabled)": {
                                                                cursor: 'text',
                                                                userSelect: 'text'
                                                            },
                                                            "&:hover": {
                                                                background: "rgba(36, 114, 252, 0.08)",
                                                            },
                                                        }}
                                                    >
                                                        Pending
                                                    </Button>
                                                </Grid>
                                                <Grid xs={12}>
                                                    <p>Updated Date</p>
                                                    2023/03/20, 06:00 pm
                                                </Grid>
                                            </Grid>
                                        </Card> */}
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                </div>
            </div >
        </>
    )
}

export default AgencyCompanyProjectsDetails;