export const SYSTEM: Readonly<{ HOME: string }> = Object.freeze({
  HOME: "/",
});

// Authentication Route
export const AUTH_ROUTE: Readonly<{
  LOGIN: string;
  SIGNUP: string;
  THANK_YOU: string;
  FORGOT_PASSWORD: string;
}> = Object.freeze({
  LOGIN: `${SYSTEM.HOME}`,
  SIGNUP: `${SYSTEM.HOME}signup`,
  THANK_YOU: `${SYSTEM.HOME}/thank-you`,
  FORGOT_PASSWORD: `${SYSTEM.HOME}/forgot-password`,
});
