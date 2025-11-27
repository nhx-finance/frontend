const BASE_URL =
  process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000/kesy";

export const ROUTES = {
  LOGIN: `${BASE_URL}/login`,
  DASHBOARD: `${BASE_URL}/dashboard`,
};
