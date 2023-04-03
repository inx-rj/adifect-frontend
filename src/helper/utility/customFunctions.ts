import { RouteType } from "helper/types";
import { intersection } from "lodash";

export function isLoggedIn() {
	/*
		* Note:
		*  This app assume if local storage have roles it means
		*  user is authenticated you can update this logic as per your app.
	*/
	return !!localStorage.getItem('roles')
}

export function isArrayWithLength(arr) {
	return (Array.isArray(arr) && arr.length)
}

export function getAllowedRoutes(routes: RouteType[]) {
	const roles = JSON.parse(localStorage.getItem('roles'));
	return routes.filter(({ permission }) => {
		if (!permission) return true;
		else if (!isArrayWithLength(permission)) return true;
		else return intersection(permission, roles).length;
	});
}
