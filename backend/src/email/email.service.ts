import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor(private configService: ConfigService) {
    const host = this.configService.get<string>('SMTP_HOST');
    const port = this.configService.get<number>('SMTP_PORT', 587);
    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASS');

    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
      this.logger.log(`Email service initialized with SMTP host: ${host}`);
    } else {
      this.logger.warn('SMTP credentials not provided. Emails will be logged to console in development mode.');
    }
  }

  async sendInquiryNotification(inquiry: {
    name: string;
    email: string;
    phone: string;
    serviceName?: string;
    message: string;
  }) {
    const adminEmail = this.configService.get<string>('ADMIN_ALERT_EMAIL', 'info@ankglobal.co');
    const subject = `[New Lead] Inquiry from ${inquiry.name} - ${inquiry.serviceName || 'General'}`;
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
        <h2 style="color: #0b1b3d;">New Website Inquiry - ANK Global</h2>
        <p><strong>Name:</strong> ${inquiry.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${inquiry.phone}">${inquiry.phone}</a></p>
        <p><strong>Service of Interest:</strong> ${inquiry.serviceName || 'General Inquiry'}</p>
        <hr style="border: 1px solid #e2e8f0; margin: 15px 0;" />
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f8fafc; padding: 12px; border-left: 4px solid #c5a880; margin: 0;">
          ${inquiry.message.replace(/\n/g, '<br>')}
        </blockquote>
      </div>
    `;

    await this.sendMail(adminEmail, subject, html);
    await this.sendCustomerAcknowledgement(inquiry.email, inquiry.name, inquiry.serviceName);
  }

  async sendConsultationNotification(consultation: {
    name: string;
    email: string;
    phone: string;
    serviceName: string;
    preferredDate: string;
    preferredTime: string;
    meetingType: string;
  }) {
    const adminEmail = this.configService.get<string>('ADMIN_ALERT_EMAIL', 'info@ankglobal.co');
    const subject = `[Consultation Request] ${consultation.name} - ${consultation.preferredDate} at ${consultation.preferredTime}`;
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
        <h2 style="color: #0b1b3d;">New Consultation Booking - ANK Global</h2>
        <p><strong>Client Name:</strong> ${consultation.name}</p>
        <p><strong>Email:</strong> ${consultation.email}</p>
        <p><strong>Phone:</strong> ${consultation.phone}</p>
        <p><strong>Service:</strong> ${consultation.serviceName}</p>
        <p><strong>Preferred Date:</strong> ${consultation.preferredDate}</p>
        <p><strong>Preferred Time Slot:</strong> ${consultation.preferredTime}</p>
        <p><strong>Meeting Format:</strong> ${consultation.meetingType}</p>
      </div>
    `;

    await this.sendMail(adminEmail, subject, html);
  }

  private async sendCustomerAcknowledgement(to: string, name: string, serviceName?: string) {
    const subject = 'Thank You for Contacting ANK Global Chartered Accountants & Advisors';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #0b1b3d; margin: 0; font-size: 24px;">ANK GLOBAL</h1>
          <p style="color: #c5a880; margin: 4px 0 0; font-weight: bold; font-size: 14px;">CHARTERED ACCOUNTANTS & ADVISORS (DUBAI, UAE)</p>
        </div>
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to ANK Global regarding <strong>${serviceName || 'our professional services'}</strong>.</p>
        <p>We have successfully received your inquiry. One of our senior Chartered Accountants or Tax Advisors will review your details and contact you within one business day.</p>
        <p>If your matter is urgent, please feel free to reach us directly via WhatsApp or telephone at <strong>+971 55 213 8281</strong>.</p>
        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b;">
          <p><strong>ANK Global Chartered Accountants and Advisors</strong><br>
          Office No. 402, Sheikh Saud Al Qasimi Building, Salah Al Din St, Deira, Dubai, UAE<br>
          Website: <a href="https://ankglobal.co" style="color: #0b1b3d;">ankglobal.co</a></p>
        </div>
      </div>
    `;

    await this.sendMail(to, subject, html);
  }

  private async sendMail(to: string, subject: string, html: string) {
    if (this.transporter) {
      try {
        const from = this.configService.get<string>('SMTP_FROM', '"ANK Global" <no-reply@ankglobal.co>');
        await this.transporter.sendMail({ from, to, subject, html });
        this.logger.log(`Email dispatched to ${to} with subject "${subject}"`);
      } catch (error) {
        this.logger.error(`Failed to send email to ${to}: ${error.message}`);
      }
    } else {
      this.logger.log(`[DEV EMAIL MOCK] To: ${to} | Subject: "${subject}"`);
    }
  }
}
