import { ROLES, UserLevel } from "helper/config";
import { UserDataType } from "helper/types/auth/authType";
import { initialNotificationQueryInterface } from "helper/types/common/commonType";
import { initialTableConfigInterface } from "helper/types/common/tableType";
import { ImageSizeTypes } from "helper/types/profile/profileTypes";
import { intersection } from "lodash";

// SET API URL Query params
export const setQueryParams = (config: initialTableConfigInterface) => {
  // let queryParams = '?';
  // for (const key of Object.keys(config)) {
  //   queryParams += config[key] && `${key}=${config[key]}&`
  // }
  let queryParams = `?company=${config?.company ?? ""}&page=${
    config.page
  }&page_size=${config.rowsPerPage}&from_date=${
    config.from_date ?? ""
  }&to_date=${config.to_date ?? ""}&community=${
    config.community ?? ""
  }&status=${config.status ?? ""}&tag=${config.tag ?? ""}&search=${
    config.search ?? ""
  }&ordering=${
    config.ordering ?? ""
  }`;
  // console.log("queryParams", queryParams);
  return queryParams;
};

// To Formate ISO date into Locale string
export const formateISODateToLocaleString = (value: Date) => {
  return new Date(value ?? "").toLocaleString();
};

export function isLoggedIn() {
  /*
   * Note:
   *  This app assume if local storage have roles it means
   *  user is authenticated you can update this logic as per your app.
   */
  return !!localStorage.getItem("roles");
}

export function isArrayWithLength(arr) {
  return Array.isArray(arr) && arr.length;
}

export const findTwoArrintersection = (array1: any[], array2: any[]) =>
  array1.filter((value) => array2.includes(value));

export function getAllowedRoutes(routes: any[], roles: number[]) {
  // const roles = JSON.parse(localStorage.getItem("roles"));
  return routes.filter(({ permission }) => {
    if (!permission) return true;
    else if (!isArrayWithLength(permission)) return true;
    else return intersection(permission, roles).length;
  });
}

// Notification query parameter
export const setNotificationQueryParams = (
  queryParams: initialNotificationQueryInterface
) => {
  let notifiQueryParams: any;

  if (queryParams?.companyId) {
    notifiQueryParams = `?user=${queryParams?.id ?? 0}&company=${
      queryParams?.companyId ?? 0
    }&ordering=-created&offset=${queryParams?.offsetid ?? 0}`;
  } else {
    notifiQueryParams = `?user=${
      queryParams?.id ?? 0
    }&ordering=-created&offset=${queryParams?.offsetid ?? 0}`;
  }
  return notifiQueryParams;
};

/**
 * to verify the argument value/string is null, undefined, empty or length is 0 then true else false.
 * @param {any} checkValue multiple parameters which are string variables.
 * @returns boolean value.
 */
export const isEmpty = (checkValue: any) => {
  if (checkValue === false) return !checkValue;
  if (checkValue === true) return !checkValue;
  return (
    checkValue === null ||
    checkValue === "undefined" ||
    checkValue === "null" ||
    checkValue === undefined ||
    checkValue === "" ||
    checkValue.length === 0
    // Object.keys(checkValue).length === 0 || (Please uncomment while needed)
    // checkValue === 0
  );
};

// Get the user type based on the user level
export const getUserLevel = (level) => {
  if (level === 1) {
    return "Admin";
  }
  if (level === 2) {
    return "Marketer";
  }
  if (level === 3) {
    return "Approver";
  }
  if (level === 4) {
    return "In-house Designer";
  }
  return "";
};

// Truncate any string using JS
export const truncate = (words: string, maxlength: number) => {
  return `${words.slice(0, maxlength)} …`;
};

// Get obj key 'name' by it's respective value (without nested obj)
export function getKeyByValue(
  object: object,
  value: string | number | boolean
) {
  return Object.keys(object).find((key) => object[key] === value);
}

// Retrun user role based on  user level
export const getUserRole = (Role: number, User_Level: number) => {
  if (
    (Role === ROLES.MEMBER && User_Level === UserLevel.ADMIN) || // Agency Member(3) - ADMIN(1) Sidebar
    (Role === ROLES.MEMBER && User_Level === UserLevel.MARKETER) || // Agency Member(3) - MARKETER(2) Sidebar
    // || (Role === ROLES.MEMBER && User_Level === UserLevel.APPROVER) // Agency Member(3) - APPROVER(3) Sidebar
    (Role === ROLES.MEMBER && User_Level === UserLevel.IN_HOUSE_DESIGNER) // Agency Member(3) - IN-HOUSE DESIGNER(4) Sidebar
  )
    return ROLES.MEMBER;

  return null;
};

export const getMemberApprover = (Role: number, User_Level: number) => {
  if (
    (Role === ROLES.MEMBER && User_Level === UserLevel.APPROVER) || // Agency Member(3) - IN-HOUSE DESIGNER(4) Sidebar
    (Role === ROLES.MEMBER && User_Level === UserLevel.MARKETER) // Agency Member(3) - MARKETER(2) Sidebar
  )
    return ROLES.MEMBER;

  return null;
};

export const isDividerAfterTab = (userData: UserDataType, tabName: string) =>
  [
    "Media",
    "Templates",
    userData?.role === ROLES.CREATOR && "My Projects",
    userData?.role === ROLES.CREATOR && "Available Jobs",
    userData?.role === ROLES.ADMIN && "Users",
  ].includes(tabName);

export const createImage = (url): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image: HTMLImageElement = new Image();
    image.addEventListener("load", (solved) => {
      console.log(solved);
      resolve(image);
    });
    image.addEventListener("error", (error) => {
      console.log("error in image ", error);
      reject(error);
    });
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * This function for image cropped
 */
export async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {
  const image: HTMLImageElement = await createImage(imageSrc);
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
  return new Promise<string>((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
      // resolve(file));
    }, "image/jpeg");
  });
}
//get image url to extension
export const getImgUrlExtension = (url) => {
  return url.split(/[#?]/)[0].split(".").pop().trim();
};

// url to file format
export const ChangeImgIntoFile = async (ImageUrl: string) => {
  // const imgExt = getImgUrlExtension(ImageUrl);
  const response = await fetch(ImageUrl);
  const blob = await response.blob();
  const file: File = new File([blob], `${ImageUrl}.jpeg`, {
    type: blob.type,
  });
  return file;
};

// To find a 'results' key inside any of the response/object
export const hasResultsKey = (obj: any) => {
  if (typeof obj === "object" && obj !== null) {
    if (obj.hasOwnProperty("results")) return true;
    else {
      for (let key in obj) {
        if (hasResultsKey(obj[key])) {
          return true;
        }
      }
    }
  }
  return false;
};
