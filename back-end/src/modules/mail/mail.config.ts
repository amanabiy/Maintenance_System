import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

export const mailConfig: MailerOptions = {
  transport: {
    host: process.env.MAIL_HOST || 'localhost',
    port: parseInt(process.env.MAIL_PORT, 10) || 1025,
    secure: false,
    auth: {
      user: 'sdf',
      pass: 'sdf',
    },
  },
  defaults: {
    from: '"No Reply" <no-reply@example.com>',
  },
  template: {
    dir: path.join(__dirname, 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};

console.log(mailConfig)
