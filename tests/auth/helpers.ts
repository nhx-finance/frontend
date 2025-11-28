const BASE_URL =
  process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000/kesy";

export const ROUTES = {
  LOGIN: `${BASE_URL}/login`,
  DASHBOARD: `${BASE_URL}/dashboard`,
  SIGNUP: `${BASE_URL}/signup`,
  OTP: `${BASE_URL}/otp`,
  DEPOSIT: `${BASE_URL}/deposit`,
};

export function generateRandomEmail(): string {
  return `testuser${Math.random().toString(36).substring(2, 6)}@gmail.com`;
}
