import sgMail from '@sendgrid/mail';

import config from '../../../../config';

export class EmailService {
  msg = {
    to: 'septi@uscentral.eu', // Change to your recipient
    from: 'ste01041985@gmail.com', // Change to your verified sender
    subject: 'Saluuut',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  };
  constructor() {
    sgMail.setApiKey(config.email.session_API);
  }
  public async sendMail() {
    try {
      await sgMail.send(this.msg);
      console.log('Email was send');
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  }
}
