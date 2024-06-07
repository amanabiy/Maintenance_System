import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(email: string, token: string) {
    console.log('Sending email...');
    console.log('Template path:', await path.join(__dirname, 'templates'));
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Maintenance System! Confirm your Email',
      text: `Your confirmation token: ${token}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0056b3;">Welcome to Maintenance System!</h2>
          <p>We're excited to have you on board. Please click the button below to confirm your email address and get started:</p>
          <a href="http://localhost:5173/verify-email/${token}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #0056b3; border-radius: 5px; text-decoration: none;">Confirm Email</a>
          <p>If the button above doesn't work, copy and paste the following link into your web browser:</p>
          <a href="http://localhost:5173/verify-email/${token}" style="color: #0056b3;">http://localhost:5173/verify-email/${token}</a>
          <p>If you did not create an account, please ignore this email.</p>
          <p>Best regards,<br>The Maintenance System Team</p>
        </div>
      `,
    });
    console.log(`Email sent to ${email} with token ${token}`);
  }

  async sendOtp(email: string, otp: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0056b3;">Password Reset Request</h2>
          <p>We received a request to reset your password. Use the OTP below to proceed:</p>
          <div style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-size: 24px; text-align: center; margin: 10px 0;">
            ${otp}
          </div>
          <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
          <p>Best regards,<br>The Maintenance System Team</p>
        </div>
      `,
    });
    console.log(`OTP sent to ${email}`);
  }
}
