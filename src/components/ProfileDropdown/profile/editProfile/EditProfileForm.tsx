import {
  Crop,
  DeleteForeverOutlined,
  DriveFileRenameOutlineOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { useAppSelector } from "redux/store";
import swal from "sweetalert";

const EditProfileForm = () => {
  // Profile image state start
  const rotation = 0;
  const maxImageFileSize = 2097152;
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [selectedFile, setSelectedFile] = useState(null);
  const [doCrop, setDoCrop] = useState(false);
  const [currentCroppedImage, setCurrentCroppedImage] = useState(null);
  const [profile_img, setProfileImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [removeProfileImage, setRemoveProfileImage] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [profile_title, setProfileTitle] = useState("");
  const [sub_title, setsub_title] = useState("");
  const [website, setWebsite] = useState("");
  const [profile_description, setProfileDescription] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const [profileVideo, setProfileVideo] = useState("");
  // Profile image state end

  // Redux State
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  const removeSelectedImage = () => {
    setSelectedFile(null);
    setProfileImage(userProfile?.data?.profile_img);
  };
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const removeDatabaseImage = () => {
    setRemoveProfileImage(true);
  };

  function rotateSize(width, height, rotation) {
    const rotRad = getRadianAngle(rotation);

    return {
      width:
        Math.abs(Math.cos(rotRad) * width) +
        Math.abs(Math.sin(rotRad) * height),
      height:
        Math.abs(Math.sin(rotRad) * width) +
        Math.abs(Math.cos(rotRad) * height),
    };
  }

  function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
  }

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });
  async function getCroppedImg(
    imageSrc,
    pixelCrop,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
  ) {
    const image: any = await createImage(imageSrc);
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
  const handleClose3 = () => {
    // Video, title and description
    // setOpen3(false);
    setProfileTitle(userProfile?.data?.profile_title);
    setsub_title(userProfile?.data?.sub_title);
    setWebsite(userProfile?.data?.website);
    setProfileDescription(userProfile?.data?.profile_description);
    setPortfolio(userProfile?.data?.portfolio);
    setProfileVideo(userProfile?.data?.video);
    // setSelectedVideo();
    // setErrors({ firstname: null, lastname: null });
  };
  const showCroppedImage = useCallback(() => {
    try {
      const croppedImage: any = getCroppedImg(
        currentCroppedImage,
        croppedAreaPixels,
        rotation
      );
      console.log("croppedImage", croppedImage);
      // console.log("donee", croppedImage);
      // setCroppedImage(URL.createObjectURL(croppedImage));
      // setCroppedImage(croppedImage);
      setImageChanged(true);
      setProfileImage(croppedImage);
      setSelectedFile(URL.createObjectURL(croppedImage));
      setDoCrop(false);
      handleClose3();
      setsub_title("");
      // validateSubmit();
      // setUpdateButtonClick(true);
    } catch (e) {
      // console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onChangePicture = (e) => {
    const file = e.target.files[0];
    // CHECK FILE TYPE
    if (!file.type.match(imageMimeType)) {
      swal({
        title: "",
        text: "Image type is not valid",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: { visible: false },
        timer: 5000,
      });
      return;
    }
    // MAX FILE SIZE == 2mb
    if (file?.size > maxImageFileSize) {
      swal({
        title: "",
        text: "Max file size allowed is 2mb",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: { visible: false },
        timer: 5000,
      });
      return;
    }
    if (e.target.files[0]) {
      setImageChanged(true);
      setSelectedFile(URL.createObjectURL(e.target.files[0]));
      setCurrentCroppedImage(URL.createObjectURL(e.target.files[0]));
      setProfileImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        // setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="img-profile_wrapper relative">
        <div className="relative max-w-[160px] w-full mx-auto [&>.delete-icon]:text-[36px]">
          {selectedFile ? (
            <>
              <i className="img img-cover rounded-full w-40 h-40 mx-auto overflow-hidden block drop-shadow-md border-2 border-white">
                <img
                  src={selectedFile}
                  alt="Thumb"
                  hidden={doCrop}
                  className="profileimgchange"
                />
              </i>
              <DeleteForeverOutlined
                fontSize="inherit"
                className="delete-icon p-1 text-danger bg-white rounded-full absolute right-0 bottom-[10px] border-2 border-white drop-shadow-md"
                onClick={removeSelectedImage}
              />
              <div className="Cropbtn">
                <button
                  className="Cropbtnnew p-1 text-theme bg-white rounded-full absolute -right-3 top-[70px] border-2 border-white drop-shadow-md"
                  type="button"
                  // hidden={doCrop}
                  onClick={(e) => setDoCrop(true)}
                >
                  <Crop fontSize="small" />
                </button>
              </div>
            </>
          ) : userProfile?.data?.profile_img ? (
            <>
              {!removeProfileImage && (
                <>
                  <img
                    // value={userProfile?.data?.profile_img}
                    src={userProfile?.data?.profile_img}
                    alt="ProfileImgCurrent"
                    id="ProfileImgCurrent"
                    className="profileimgchange"
                  />
                  <label className="upload-profileImg" htmlFor="upload"></label>
                  {/* <img
                className="profilepic-dialog-delPopup"
                src="/img/delet.png"
                alt=""
                onClick={removeDatabaseImage}
              /> */}
                  <DeleteForeverOutlined
                    className="profilepic-dialog-delPopup"
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
                          <div className="controls-profile-image relative">
                            <label> Zoom </label>
                            <input
                              type="range"
                              value={zoom}
                              min={1}
                              max={3}
                              step={0.1}
                              aria-labelledby="Zoom"
                              onChange={(e) => {
                                // @ts-ignore
                                setZoom(e.target.value);
                              }}
                              className="zoom-range-profile-image border-t-2 border-b-2 h-[2px] bg-theme"
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
                            setSelectedFile(null);
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
                <div className="mb-5 text-zinc-500">
                  <span>No image</span>
                </div>
              )}
              <label
                className="upload-profileImg text-zinc-500"
                htmlFor="upload"
              >
                {" "}
                <DriveFileRenameOutlineOutlined className="cursor-pointer" />
              </label>
            </>
          ) : (
            <div className="flex-center text-zinc-500 gap-2">
              <span>No image</span>
              <label className="upload-profileImg" htmlFor="upload">
                {" "}
                <DriveFileRenameOutlineOutlined
                  fontSize="small"
                  className="cursor-pointer"
                />
              </label>
            </div>
          )}
          <input
            type="file"
            onChange={(e) => {
              onChangePicture(e);
            }}
            hidden
            alt="ProfileImg"
            id="upload"
          />
        </div>
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
              <div className="controls-profile-image relative">
                <label> Zoom </label>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => {
                    // @ts-ignore
                    setZoom(e.target.value);
                  }}
                  className="zoom-range-profile-image border-t-2 border-b-2 h-[2px] bg-theme"
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
                setSelectedFile(null);
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default EditProfileForm;
