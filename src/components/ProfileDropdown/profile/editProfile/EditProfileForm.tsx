import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { useAppSelector } from "redux/store";

const EditProfileForm = () => {
  // Profile image state start
  const [selectedFile, setSelectedFile] = useState();
  const [doCrop, setDoCrop] = useState(false);
  const [currentCroppedImage, setCurrentCroppedImage] = useState(null);
  const [profile_img, setProfileImage] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [removeProfileImage, setRemoveProfileImage] = useState(false);
  // Profile image state end

  // Redux State
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  const removeSelectedImage = () => {
    setSelectedFile();
    setProfileImage(userProfile?.data?.profile_img);
  };
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const removeDatabaseImage = () => {
    setRemoveProfileImage(true);
  };
  async function getCroppedImg(
    imageSrc,
    pixelCrop,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
  ) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    const rotRad = getRadianAngle(rotation);

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation
    );

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    // croppedAreaPixels values are bounding box relative
    // extract the cropped image using these values
    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height
    );

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image at the top left corner
    ctx.putImageData(data, 0, 0);

    // As Base64 string
    // return canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => {
        resolve(file);
      }, "image/jpeg");
    });
  }
  const showCroppedImage = useCallback(() => {
    try {
      const croppedImage = getCroppedImg(
        currentCroppedImage,
        croppedAreaPixels,
        rotation
      );
      // console.log("donee", croppedImage);
      setCroppedImage(URL.createObjectURL(croppedImage));
      // setCroppedImage(croppedImage);
      setImageChanged(true);
      setProfileImage(croppedImage);
      setSelectedFile(URL.createObjectURL(croppedImage));
      setDoCrop(false);
      handleClose3();
      setsub_title();
      validateSubmit();
      setUpdateButtonClick(true);
    } catch (e) {
      // console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  return (
    <>
      {selectedFile ? (
        <>
          <img
            src={selectedFile}
            alt="Thumb"
            hidden={doCrop}
            className="profileimgchange"
          />
          <img
            className="editicon profilepic-dialog-button "
            src="/img/delet.png"
            hidden={doCrop}
            alt=""
            onClick={removeSelectedImage}
          />
          <div className="Cropbtn">
            <button
              className="Cropbtnnew"
              type="button"
              // hidden={doCrop}
              onClick={(e) => setDoCrop(true)}
            >
              Crop Image
            </button>
            {doCrop && (
              <>
                <div className="App-profile-image">
                  <div className="crop-container-profile-image">
                    <Cropper
                      image={currentCroppedImage}
                      crop={crop}
                      zoom={zoom}
                      aspect={4 / 3}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>
                  <div className="controls-profile-image">
                    <label> Zoom </label>
                    <input
                      type="range"
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e) => {
                        setZoom(e.target.value);
                      }}
                      className="zoom-range-profile-image"
                    />
                    <Button
                      onClick={showCroppedImage}
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </Button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    setDoCrop(false);
                    setSelectedFile();
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </>
      ) : userProfile?.data?.profile_img ? (
        <>
          {!removeProfileImage && (
            <>
              <img
                value={userProfile?.data?.profile_img}
                src={userProfile?.data?.profile_img}
                alt="ProfileImgCurrent"
                id="ProfileImgCurrent"
                className="profileimgchange"
              />
              <label className="upload-profileImg" htmlFor="upload"></label>
              <img
                className="profilepic-dialog-delPopup"
                src="/img/delet.png"
                alt=""
                onClick={removeDatabaseImage}
              />
              <div>
                <button
                  type="button"
                  // hidden={doCrop}
                  onClick={(e) => setDoCrop(true)}
                >
                  Crop Image
                </button>
                {doCrop && (
                  <>
                    <div className="App-profile-image">
                      <div className="crop-container-profile-image">
                        <Cropper
                          image={currentCroppedImage}
                          crop={crop}
                          zoom={zoom}
                          aspect={4 / 3}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                        />
                      </div>
                      <div className="controls-profile-image">
                        <label> Zoom </label>
                        <input
                          type="range"
                          value={zoom}
                          min={1}
                          max={3}
                          step={0.1}
                          aria-labelledby="Zoom"
                          onChange={(e) => {
                            setZoom(e.target.value);
                          }}
                          className="zoom-range-profile-image"
                        />
                        <Button
                          onClick={showCroppedImage}
                          variant="contained"
                          color="primary"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        setDoCrop(false);
                        setSelectedFile();
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </>
          )}
          {removeProfileImage && (
            <div style={{ marginBottom: "30px" }}>
              <span>No image</span>
            </div>
          )}
          <label className="upload-profileImg" htmlFor="upload">
            {" "}
            <img
              src="/img/editicon.png"
              style={{ cursor: "pointer" }}
              className="editicon profilepic-dialog-buttonEditPop"
              alt=""
            />
          </label>
        </>
      ) : (
        <>
          <div style={{ marginBottom: "30px" }}>
            <span>No image</span>
          </div>
          <label className="upload-profileImg" htmlFor="upload">
            {" "}
            <img
              src="/img/editicon.png"
              style={{ cursor: "pointer" }}
              className="editicon profilepic-dialog-button"
              alt=""
            />
          </label>
        </>
      )}
    </>
  );
};

export default EditProfileForm;
