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
  maxWidth = "450px",
}) => {
  return (
    <Dialog
      className="profileImgDialogagency popupclass logoutPopup"
      open={openPopup}
      onClose={closePopup}
      // maxWidth="xs"
      sx={{
        "& .MuiDialog-container .MuiDialog-paper": {
          width: "100%",
          maxWidth: maxWidth,
        },
      }}
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
              gap: "15px",
            },
          }}
        >
          <Button onClick={mainActionHandler} className="btn btn-primary">
            {mainActionTitle}
          </Button>
          <button className="btn btn-outline" onClick={closePopup}>
            Cancel
          </button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default CustomPopup;
