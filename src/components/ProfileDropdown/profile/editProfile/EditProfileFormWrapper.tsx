import CustomPopup from "components/common/customPopup/CustomPopup";
import EditProfileForm from "./EditProfileForm";

const EditProfileFormWrapper = ({ openPopup, handlePopup }) => {
  return (
    <CustomPopup
      dialogTitle="Edit Profile"
      textAlign="left"
      dialogContent={<EditProfileForm />}
      openPopup={openPopup}
      closePopup={handlePopup}
      mainActionHandler={() => console.log("Profile edit")}
      mainActionTitle="Create"
      maxWidth="950px"
    />
  );
};

export default EditProfileFormWrapper;
