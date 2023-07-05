import { Accordion, AccordionDetails, AccordionSummary, Button, Stack } from "@mui/material";

const AccountAccordion = (props) => {
    const {accountId, accordionContent, title, info, expanded, setExpanded} = props;

    // Handle accordion
    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return <>
        <Accordion
        expanded={expanded === accountId}
        onChange={handleAccordionChange(accountId)}
        sx={{
          width: "100%",
          position: "relative",
          overflow: "unset",
          p: 0,
          borderRadius: "0",
          "&.MuiPaper-root": {
            "&.MuiPaper-elevation": {
              "&.MuiPaper-rounded": {
                "&.MuiPaper-elevation1": {
                  boxShadow: "none",
                  borderBottom: "1px solid rgba(113, 117, 123, 0.2);",
                  m: 0,
                  mb: 2,
                  borderRadius: "0",
                  pb: 1.875,
                  "&:before": {
                    display: "none",
                  },
                },
              },
            },
          },
        }}
      >
        <AccordionSummary
          id={accountId}
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
                margin: 0
              },
            },
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            className="items-center justify-between w-full"
          >
            <div className="text-sm font-normal" >
                <h6 className="text-black" >{title}</h6>
                <p className="text-disable" >{info}</p>
            </div>
            {expanded !== accountId && (<Button
                variant="contained"
                className="btn btn-primary"
                onClick={() => handleAccordionChange(accountId)}
              >
                Change
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
            {accordionContent}
        </AccordionDetails>
        </Accordion>
    </>
}

export default AccountAccordion;