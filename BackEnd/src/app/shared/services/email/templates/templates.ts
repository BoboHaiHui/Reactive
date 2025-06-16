//activa_account email should also include a link to the activation page
import config from '../../../../../config';

const url = config.frontend.base_url + ':' + config.frontend.port;

export const activate_account = data => {
  return `Your activation code is :
          ${data[0]}

          Activation link: ${url + '/activate-account/' + data[1]}
  `;
};

export const request_password_reset = data => {
  return `We received a request to reset your account password!

          Please access this link and follow the instructions :

          Reset Password link: ${url}/reset-password/?email=${encodeURIComponent(data[0])}&resetCode=${encodeURIComponent(data[1])}
  `;
};

export const user_account_update_info = data => {
  return `Your account data was updated!

If you didn't request ${data} update, please contact our support team!

Thanks a lot!

  `;
};

export const unblock_account = data => {
  return `Your account was blocked due to multiple failed attempts to login!

          Please follow this link and follow the instrutions to unlock it:

          Activation link: ${url + '/MFA/' + data[1]}

          Your activation code is :
          ${data[0]}
  `;
};

export const block_account_info = () => {
  return `Your account was blocked due to multiple failed attempts to login!

In order to unlock it, please try to login and follow the instructions!

Thanks a lot!

  `;
};
