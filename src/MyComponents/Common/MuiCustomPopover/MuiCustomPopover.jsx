import React from 'react'

const MuiCustomPopover = ({}) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleChange = (event) => {
        const { value, name } = event.target;
        setFilterData((prevState) => {
            return { ...prevState, [name]: value };
        });
    };

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                sx={{
                    "&.MuiTypography-root": {
                        display: 'inline-block',
                        cursor: 'pointer',
                        color: 'rgba(39, 90, 208, 1)',
                        fontSize: '14px',
                        fontWeight: 400,
                        p: 0,
                        fontFamily: '"Figtree", sans-serif',
                    }
                }}
            >
                
            </Typography>
            <PopoverTooltip
                id="mouse-over-popover"
                anchorEl={anchorEl}
                openPopover={open}
                handlePopoverClose={handlePopoverClose}
            >
                <Card
                    sx={{
                        maxWidth: '689px',
                        width: '100%',
                        position: 'relative',
                        overflow: 'unset',
                        display: 'flex',
                        p: 2,
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
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '-18px',
                            width: '25px',
                            height: '33px',
                            background: "#EDEDED linear-gradient(white, white)",
                            clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
                        }}
                    />
                    <Grid container>
                        <Grid xs={1.5} display="flex" justifyContent="start" alignItems="center">
                            <Avatar src="/img/circle-image.png" sx={{ height: '65px', width: '65px' }} />
                        </Grid>
                        <Grid xs={10.5}>
                            <Typography
                                sx={{
                                    fontFamily: '"Figtree", sans-serif',
                                    fontWeight: 500,
                                    lineHeight: '22px'
                                }}
                            >
                                Coding Region
                            </Typography>
                            <Box mt={1.25}>
                                {['Coding', 'Designing', 'Development', 'Marketing', 'Content - Writing'].map((item) => (
                                    <Button
                                        variant="contained"
                                        disableRipple
                                        disableFocusRipple
                                        disableElevation
                                        sx={{
                                            height: "28px",
                                            padding: "7px 10px",
                                            marginRight: '10px',
                                            background: "rgba(36, 114, 252,0.08)",
                                            color: "#2472FC",
                                            fontSize: "12px",
                                            textTransform: "capitalize",
                                            borderRadius: '4px',
                                            "&[type=button]:not(:disabled)": {
                                                cursor: 'text',
                                                userSelect: 'text'
                                            },
                                            "&:hover": {
                                                background: "rgba(36, 114, 252,0.08)",
                                            },
                                        }}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </Box>
                        </Grid>
                        <Grid item xs={12} mt={2.5}>
                            <Typography sx={{ textAlign: 'justify' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </PopoverTooltip>
        </>
    )
}

export default MuiCustomPopover
