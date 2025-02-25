import { inject, injectable } from 'inversify';
import { Dependency } from '../di';
import type { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';
import { Config } from '../config';
@injectable()
@Dependency()
export class NodeMailer {
  @inject(Config) private readonly config: Config;
  private readonly htmlHeader = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              margin: 0;
              padding: 0;
              line-height: 1.5;
              color: #333;
              background-color: #f4f4f4;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              text-align: center;
              padding: 20px 0;
              background-color: #3b28cc;
              color: #ffffff;
              font-size: 20px;
              font-weight: bold;
              border-radius: 8px 8px 0 0;
          }
          .content {
              padding: 20px;
              text-align: left;
          }
          .footer {
              text-align: center;
              padding: 15px;
              font-size: 14px;
              color: #666;
              background-color: #f4f4f4;
              border-radius: 0 0 8px 8px;
          }
          a {
              color: #3b28cc;
              text-decoration: none;
              font-weight: bold;
          }
          .footer a {
              color: #666;
              text-decoration: none;
              font-size: 14px;
          }
          .footer a:hover {
              text-decoration: underline;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              Welcome to Our Service
          </div>
          <div class="content">
              {{content}}
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
              <p>
                  <a href="https://yourcompany.com">Visit our website</a> |
                  <a href="mailto:support@yourcompany.com">Contact Support</a>
              </p>
          </div>
      </div>
  </body>
  </html>
`;

  private _transport: Transporter;

  constructor() {}

  get transport() {
    return this._transport;
  }

  async sendEmail(email: string[], subject: string, message: string) {
    const trp = nodemailer.createTransport(
      {
        port: this.config.conf.SMTP_PORT,
        host: this.config.conf.SMTP_HOST,
        auth: {
          user: this.config.conf.SMTP_USER,
          pass: this.config.conf.SMTP_PASS
        }
      },
      {}
    );

    this._transport = trp;
    const { RESEND_MAIL_FROM } = this.config.conf;

    try {
      await this.transport.sendMail({
        to: email,
        subject,
        from: RESEND_MAIL_FROM,
        headers: {},
        html: this.htmlHeader.replace('{{content}}', message)
      });
    } catch (error) {
      console.error('Error sending email', error);
    }
  }
  async sendOrganizationInviteEmail(
    emails: string[],
    organization_name: string
  ) {
    await this.sendEmail(
      emails,
      `You have been invited to join ${organization_name}`,
      `Hello, you have been invited to join ${organization_name}.
       Navigate to the dashboard to accept the invite.
      `
    );
  }
}
