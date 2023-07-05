import axiosPrivate from "../api/axios";
import { useLayoutEffect } from "react";

const useAxiosPrivate = () => {
  // const refresh = useRefreshToken();
  const access_token = () => localStorage.getItem("access_token");

  useLayoutEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${access_token()}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // const responseIntercept = axiosPrivate.interceptors.response.use(
    //   (response) => response,
    //   async (error) => {
    //     const prevRequest = error.config;
    //     if (error.response.status === 401) {
    //       console.log("Hook error", { prevRequest, error, canReTry });

    //       if (!canReTry) {
    //         canReTry = true;
    //         const refreshToken = await refresh();
    //         console.log("if canReTry", { canReTry, refreshToken });
    //         prevRequest.headers[
    //           "Authorization"
    //         ] = `Bearer ${refreshToken.access}`;
    //         return await axiosPrivate(prevRequest);
    //       } else {
    //         console.log("else  canReTry", canReTry);
    //         canReTry = false;
    //         dispatch(TRIGGER_PERSIST_MODE(false)).then((r) => r);
    //         dispatch(CLEAR_AUTH());
    //         localStorage.removeItem("access_token");
    //         localStorage.removeItem("refresh_token");
    //         navigate("/auth", { replace: true, state: true });
    //       }
    //     }

    //     if (error.response.status === 403) {
    //       prevRequest.sent = false;
    //       navigate("/unauthorized", { replace: true, state: true });
    //     }
    //     return Promise.reject(error);
    //   }
    // );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      // axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
