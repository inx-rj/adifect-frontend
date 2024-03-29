import { CloseRounded } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface Types {
  dialogTitle: string;
  dialogContent: any;
  openPopup: boolean;
  closePopup: () => void;
  mainActionHandler?: any;
  mainActionTitle?: string;
  textAlign?: string;
  maxWidth?: string;
  dialogAction?: boolean;
}

const MuiPopup = ({
  dialogTitle,
  dialogContent,
  openPopup,
  closePopup,
  mainActionHandler,
  mainActionTitle,
  textAlign = "center",
  maxWidth = "450px",
  dialogAction = true,
}: Types) => {
  return (
    <Dialog
      className="profileImgDialogagency popupclass logoutPopup"
      open={openPopup}
      onClose={closePopup}
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
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {dialogTitle}
        <CloseRounded
          className="closebuttonsec cursor-pointer"
          onClick={closePopup}
        />
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
        {dialogAction && (
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
        )}
      </div>
    </Dialog>
  );
};

export default MuiPopup;
