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
  textAlign = "center",
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
      <DialogTitle className="modalTitle">
        {dialogTitle}
        <CloseIcon cursor="pointer" onClick={closePopup} />
      </DialogTitle>
      <div className="modalContent">
        <DialogContent
          sx={{
            padding: "25px 24px",
          }}
        >
          <Typography component="div" sx={{ textAlign: textAlign }}>
            {dialogContent}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            "&.MuiDialogActions-root": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
            },
          }}
        >
          <Button onClick={mainActionHandler} className="shareNewPop">
            {mainActionTitle}
          </Button>
          <button className="canceButtonnewPop" onClick={closePopup}>
            Cancel
          </button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default CustomPopup;
