import sgMail from '@sendgrid/mail';

import config from '../../../../config';
import { activate_account, block_account_info, unblock_account } from './templates/templates';

export class EmailService {
  constructor() {
    sgMail.setApiKey(config.email.session_API);
  }

  public async sendMail(user_email: string, email_subject: string, template: string, data?: any) {
    let msg = this.emailData(user_email, email_subject, template, data);
    try {
      await sgMail.send(msg);
      console.log('Email was send');
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  }

  public emailData(user_email: string, email_subject: string, template: string, data?: any) {
    let text_data: string;
    // let html_data: string;
    if (template === 'activate_account') {
      text_data = activate_account(data);
    }
    if (template === 'unblock_account') {
      text_data = unblock_account(data);
    }
    if (template === 'block_account_info') {
      text_data = block_account_info();
    }
    let msg = {
      to: user_email,
      from: config.email.from_email_address,
      subject: email_subject,
      text: text_data
    };
    return msg;
  }
}
