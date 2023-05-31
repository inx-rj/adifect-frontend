import { initialNotificationQueryInterface } from "helper/types/common/commonType";
import { initialTableConfigInterface } from "helper/types/common/tableType";
import { intersection } from "lodash";

// SET API URL Query params
export const setQueryParams = (config: initialTableConfigInterface) => {
  let queryParams = `?page=${config.page}&page_size=${
    config.rowsPerPage
  }&from_date=${config.from_date ?? ""}&to_date=${
    config.to_date ?? ""
  }&community=${config.community ?? ""}&status=${config.status ?? ""}&tag=${
    config.tag ?? ""
  }&search=${config.search ?? ""}`;
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
