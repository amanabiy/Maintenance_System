import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

export const mailConfig: MailerOptions = {
  transport: {
    host: process.env.MAIL_HOST  || 'live.smtp.mailtrap.io',
    port:  process.env.MAIL_PORT || 587,
    secure: true, // TLS is optional and can be used if secure: true
    auth: {
      user: process.env.MAIL_USERNAME || 'api',
      pass: process.env.MAIL_PASSWORD || 'xs', // replace with the actual password
    },
  },
  defaults: {
    from: 'admin@maintains.live',
  },
  template: {
    dir: path.join(__dirname, 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};

console.log(mailConfig);
