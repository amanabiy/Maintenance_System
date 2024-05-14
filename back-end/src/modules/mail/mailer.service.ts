import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(email: string, token: string) {
    console.log(`sending email`)
    console.log(`path`, await path.join(__dirname, 'templates'))
    await this.mailerService.sendMail({
      // to: email,
      // subject: 'Welcome to Maintenance System! Confirm your Email',
      // template: 'verification',
      // context: {
      //   token,
      // },
        to: email, // list of receivers
        subject: 'Welcome to Maintenance System! Confirm your Email', // Subject line
        text: `${token}`, // plaintext body
        html: '<b>check the plain text for the token</b>', // HTML body content
    });
    console.log(`sent email to ${email} with token ${token}`)
    console.log()
  }

  async sendOtp(email: string, otp: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Your OTP for Password Reset',
      // template: './otp',
      // context: {
      //   otp,
      // },
      text: `${otp}`, // plaintext body
      html: '<b>check the plain text for the otp</b>',
    });
  }
}

