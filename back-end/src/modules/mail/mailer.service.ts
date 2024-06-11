import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class MailService {
  frontendUrl: string;

  constructor(private readonly mailerService: MailerService) {
    this.frontendUrl = 'https://maintainancesystem.netlify.app';
  }

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
          <a href="${this.frontendUrl}/verify-email/${token}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #0056b3; border-radius: 5px; text-decoration: none;">Confirm Email</a>
          <p>If the button above doesn't work, copy and paste the following link into your web browser:</p>
          <a href="${this.frontendUrl}/verify-email/${token}" style="color: #0056b3;">${this.frontendUrl}/verify-email/${token}</a>
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

  async sendPaymentRequest(email: string, requestId: number) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Payment Request for Maintenance Task',
      text: `Please pay and attach the receipt for the maintenance task with ID: ${requestId}.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0056b3;">Payment Request</h2>
          <p>Please complete the payment for the maintenance task with the following details:</p>
          <p>Request ID: ${requestId}</p>
          <p>After completing the payment, attach the receipt and send it back for review and confirmation.</p>
          <p>Best regards,<br>The Maintenance System Team</p>
        </div>
      `,
    });
    console.log(`Payment request sent to ${email} for request ID ${requestId}`);
  }

  async sendStatusChangeNotification(email: string, requestId: number, oldStatus: string, newStatus: string) {
    const link = '';
    await this.mailerService.sendMail({
      to: email,
      subject: `Status Change Notification: ${oldStatus} to ${newStatus}`,
      text: `The status of your request with ID: ${requestId} has changed from ${oldStatus} to ${newStatus}. Please check the following link for more details: ${link}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0056b3;">Status Change Notification</h2>
          <p>The status of your request with ID: <strong>${requestId}</strong> has changed from <strong>${oldStatus}</strong> to <strong>${newStatus}</strong>.</p>
          <p>Please click the link below for more details:</p>
          <a href="${link}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #0056b3; border-radius: 5px; text-decoration: none;">View Details</a>
          <p>If the button above doesn't work, copy and paste the following link into your web browser:</p>
          <a href="${link}" style="color: #0056b3;">${link}</a>
          <p>Best regards,<br>The Maintenance System Team</p>
        </div>
      `,
    });
    console.log(`Status change notification sent to ${email} for request ID ${requestId} from ${oldStatus} to ${newStatus}`);
  }
}
