import { initialNotificationQueryInterface } from "helper/types/common/notification";
import { initialTableConfigInterface } from "helper/types/common/table";
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
