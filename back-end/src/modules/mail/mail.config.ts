import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

export const mailConfig: MailerOptions = {
  transport: {
    host: 'live.smtp.mailtrap.io',
    port:  587,
    secure: true, // TLS is optional and can be used if secure: true
    auth: {
      user: process.env.MAIL_USERNAME || 'api',
      pass: process.env.MAIL_PASSWORD || 'cda687a3f54b95cc27315d2f29a4a580', // replace with the actual password
    },
  },
  defaults: {
    from: '"amanuelabiy.as@gmail.com',
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
