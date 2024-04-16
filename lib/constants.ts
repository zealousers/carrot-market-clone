export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_MAX_LENGTH =10;
export const PASSWORD_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/);

export const USERNAME_ERROR="Username cannot contain the word 'admin'";
export const USERNAME_INVALID_TYPE_ERROR="Username must be a string!";
export const USERNAME_REQUIRED_ERROR="Where is my username???";

export const PASSWORD_REQUIRED_ERROR="Password is required";
export const PASSWORD_REGEX_ERROR ="A password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.";
export const PASSWORD_MATCH_ERROR ="Passwords do not match";
