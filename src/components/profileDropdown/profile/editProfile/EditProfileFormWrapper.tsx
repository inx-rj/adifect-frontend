import MuiPopup from "components/common/muiPopup/MuiPopup";
import EditProfileForm from "./EditProfileForm";

const EditProfileFormWrapper = ({ openPopup, handlePopup }) => {
  return (
    <MuiPopup
      dialogTitle="Edit Profile"
      textAlign="left"
      dialogContent={<p></p>}
      openPopup={openPopup}
      closePopup={handlePopup}
      mainActionHandler={() => console.log("Profile edit")}
      mainActionTitle="Create"
      maxWidth="950px"
    />
  );
};

export default EditProfileFormWrapper;
