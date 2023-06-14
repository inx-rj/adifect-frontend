import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomPopup = ({
  dialogTitle,
  dialogContent,
  openPopup,
  closePopup,
  mainActionHandler,
  mainActionTitle,
  contentSX = { textAlign: "center" }
}) => {
  return (
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          "&.MuiDialog-paper": {
            width: "575px",
          },
        },
      }}
      open={openPopup}
      onClose={closePopup}
    >
      <DialogTitle
        className="modalTitle"
        sx={{
          "&.MuiTypography-root": {
            fontFamily: "Figtree, sans-serif",
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "24px",
          },
        }}
      >
        {dialogTitle}
        <CloseIcon cursor="pointer" onClick={closePopup} />
      </DialogTitle>
      <DialogContent
        sx={{
          padding: "20px 25px",
        }}
      >
        <Typography component="div" sx={contentSX}>
          {dialogContent}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          "&.MuiDialogActions-root": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            padding: "10px 0 20px 0",
          },
        }}
      >
        <Button onClick={mainActionHandler} className="btn btn-primary">
          {mainActionTitle}
        </Button>
        <Button
          className="btn btn-outline"
          onClick={closePopup}
          variant="outlined"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomPopup;
