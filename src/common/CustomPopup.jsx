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
      <DialogContent
        sx={{
          padding: "20px 25px",
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
            gap: "15px",
            padding: "10px 0 20px 0",
          },
        }}
      >
        <Button
          onClick={mainActionHandler}
          className="btn btn-primary max-h-[35px] !normal-case !font-semibold rounded-md !px-8 !py-2 hover:!bg-primary"
        >
          {mainActionTitle}
        </Button>
        <Button
          className="btn btn-outline max-h-[35px]"
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
