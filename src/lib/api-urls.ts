export const AUTH_SERVICE_API_BASE_URL = process.env.AUTH_SERVICE_BASE_URL

export const LOGIN_URL = `${AUTH_SERVICE_API_BASE_URL}/login`
export const REGISTRATION_URL = `${AUTH_SERVICE_API_BASE_URL}/registration`
export const APPOINTMENT_URL = `${AUTH_SERVICE_API_BASE_URL}/appointments`
export const USER_APPOINTMENT_URL = `${AUTH_SERVICE_API_BASE_URL}/user/appointments`

export const REPORT_SERVICE_BASE_URL =
  process.env.NEXT_PUBLIC_REPORT_SERVICE_BASE_URL
