//activa_account email should also include a link to the activation page
import config from '../../../../../config';

const url = config.frontend.base_url + ':' + config.frontend.port + '/activate-account/';

export const activate_account = data => {
  return `Your activation code is :
          ${data[0]}

          Activation link: ${url + data[1]}
  `;
};
