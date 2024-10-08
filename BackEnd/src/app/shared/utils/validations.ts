function passwordValidator(password: string): boolean {
  const hasNumber = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const noWhiteSpace = /\s/.test(password);
  const hasLength = password.length >= 8 && password.length < 20;
  const valid = hasNumber && hasUpper && hasLower && hasLength && !noWhiteSpace;
  return valid;
}
function emailValidator(email: string): boolean {
  if (!email) {
    return false;
  }
  try {
    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,}(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    const noWhiteSpace = /\s/.test(email);
    const emailLength = email.length > 5 && email.length <= 254;
    const valid = emailFormat && !noWhiteSpace && emailLength;
    return valid;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function isCodeExpired(expiresAt) {
  const expirationDate = new Date(expiresAt);
  const now = new Date();

  return now > expirationDate;
}

export const utils = {
  passwordValidator: passwordValidator,
  emailValidator: emailValidator,
  isCodeExpired: isCodeExpired
};
