export function passwordValidator(password: string): boolean {
  const hasNumber = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasLength = (password.length >= 8 && password.length < 20);
  const valid = hasNumber && hasUpper && hasLower && hasLength;
  return valid;
}
export function emailValidator (email: string): boolean {
  const emailChar = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
  const emailLenght = email.length < 320;
  const valid = emailChar && emailLenght;
  return valid;
}