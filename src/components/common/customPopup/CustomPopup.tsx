import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

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
      className="profileImgDialogagency popupclass logoutPopup"
      open={openPopup}
      onClose={closePopup}
    >
      <DialogTitle
        className="profileImgfolder imgsizefixer"
        sx={{
          fontFamily: "Figtree !important",
          fontSize: "20px !important",
          fontWeight: "500 !important",
          lineHeight: "24px",
          borderBottom: "1px solid #71757B33",
          padding: "20px 25px",
        }}
      >
        {dialogTitle}
        <span className="closebuttonsec" onClick={closePopup}>
          <i className="fa-solid fa-xmark  dialogcross"></i>
        </span>
      </DialogTitle>
      <div className="dialogcontent_and_actions_new pb-4">
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
