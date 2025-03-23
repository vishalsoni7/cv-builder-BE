const ENV_VARIABLE_NOT_AVAILABLE = `Environment variable not defined!`;

const MONGODB_SUCCESS = `Successfully connected to MongoDB`;

const MONGODB_ERROR = `Error connecting to MongoDB: `;

const USER_ID_MISSING = `User ID is required`;

const USER_NOT_FOUND = `User not found`;

const RESUME_CREATED_SUCCESS = `Resume created successfully`;

const RESUME_NOT_FOUND = `Resume not found`;

const RESUME_UPDATE_SUCCESS = `Resume updated successfully`;

const RESUME_DELETED_SUCCESS = `Resume deleted successfully`;

const EMAIL_PASSWORD_REQUIRED = `Email and password are required`;

const INVALID_CREDENTIALS = `Invalid credentials`;

const TOKEN_EXPIRE_TIME = "24h";

const requiredFields = ["firstName", "lastName", "email", "password"];

const MISSING_DETAILS = `Missing required user details`;

const AUTH_MIDDLEWARE_HEADER = `Authorization`;

const AUTH_TOKEN_DENIED = `No token, authorization denied`;

const INVALID_TOKEN_ERROR = `Invalid or expired token`;

const INVALID_PHONE = `Invalid phone number`;

const INVALID_EMAIL = `Invalid email format`;

module.exports = {
  ENV_VARIABLE_NOT_AVAILABLE,
  MONGODB_SUCCESS,
  MONGODB_ERROR,
  USER_ID_MISSING,
  USER_NOT_FOUND,
  RESUME_CREATED_SUCCESS,
  RESUME_NOT_FOUND,
  RESUME_UPDATE_SUCCESS,
  RESUME_DELETED_SUCCESS,
  EMAIL_PASSWORD_REQUIRED,
  INVALID_CREDENTIALS,
  TOKEN_EXPIRE_TIME,
  requiredFields,
  MISSING_DETAILS,
  AUTH_MIDDLEWARE_HEADER,
  AUTH_TOKEN_DENIED,
  INVALID_TOKEN_ERROR,
  INVALID_PHONE,
  INVALID_EMAIL,
};
