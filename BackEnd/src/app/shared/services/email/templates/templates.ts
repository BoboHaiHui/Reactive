//activa_account email should also include a link to the activation page
export const activate_account = data => {
  return `Your activation code is :
          ${data}
  `;
};
