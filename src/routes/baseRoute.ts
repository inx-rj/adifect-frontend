export const SYSTEM: Readonly<{LOGIN: string, HOME: string }> = Object.freeze({
  LOGIN: "/login",
  HOME: "/",
});

export const DASHBOARD_ROUTE: Readonly<{ HOME: string }> = Object.freeze({
  HOME: `${SYSTEM.HOME}`,
});

// Authentication Route
export const AUTH_ROUTE: Readonly<{
  LOGIN: string;
  SIGNUP: string;
  THANK_YOU: string;
  FORGOT_PASSWORD: string;
}> = Object.freeze({
  LOGIN: `${SYSTEM.LOGIN}`,
  SIGNUP: `${SYSTEM.HOME}signup`,
  THANK_YOU: `${SYSTEM.HOME}/thank-you`,
  FORGOT_PASSWORD: `${SYSTEM.HOME}/forgot-password`,
});

// Dashboard Route
export const DASH_CHILD: Readonly<{
  HOME: string;
}> = Object.freeze({
  HOME: `${DASHBOARD_ROUTE.HOME}`,
});