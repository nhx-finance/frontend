const BASE_URL =
  process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000/kesy";
const BASE_URL_PROD = "https://devnhx-finance.vercel.app/kesy";
const ENV = process.env.NODE_ENV || "production";

function getBaseUrl(): string {
  if (ENV === "production") {
    return BASE_URL_PROD;
  }
  return BASE_URL;
}

export const ROUTES = {
  LOGIN: `${getBaseUrl()}/login`,
  DASHBOARD: `${getBaseUrl()}/dashboard`,
  SIGNUP: `${getBaseUrl()}/signup`,
  OTP: `${getBaseUrl()}/otp`,
  DEPOSIT: `${getBaseUrl()}/deposit`,
};

export function generateRandomEmail(): string {
  return `testuser${Math.random().toString(36).substring(2, 6)}@gmail.com`;
}
