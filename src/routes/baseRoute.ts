
export const SYSTEM: Readonly<{ HOME: string }> = Object.freeze({
  HOME: "/",
});

// Authentication Route
export const AUTH_ROUTE: Readonly<{
  LOGIN: string;
  SIGNUP: string;
}> = Object.freeze({
  LOGIN: `${SYSTEM.HOME}`,
  SIGNUP: `${SYSTEM.HOME}/signup`,
});
