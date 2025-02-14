import { inject, injectable } from 'inversify';
import { Resend } from 'resend';
import { Dependency } from '../di';
import { Config } from '../config';

@injectable()
@Dependency()
export class ResendMailer {
  //   constructor(@inject(Config) private readonly config: Config) {}
  @inject(Config) private readonly config: Config;
  private readonly htmlHeader = `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                     
                        font-size: 16px;
                    }
                     a{
                            color: #3b28cc;
                            text-decoration: none;
                    }
                </style>
            </head>
            <body>
            {{content}}
            </body>
        </html>

    `;
  async sendEmail(email: string, subject: string, message: string) {
    const { RESEND_MAIL_KEY, RESEND_MAIL_FROM } = this.config.conf;

    try {
      const resend = new Resend(RESEND_MAIL_KEY);

      await resend.emails.send({
        to: [email],
        subject,
        from: RESEND_MAIL_FROM,
        headers: {},
        tags: [{ name: 'resend', value: 'resend' }],
        html: this.htmlHeader.replace('{{content}}', message)
      });
    } catch (error) {
      console.error('Error sending email', error);
    }
  }

  async sendVerificationEmail(email: string, token: string) {
    const subject = 'Email Verification';
    const message = `Click on the link to verify your email: ${token}`;

    await this.sendEmail(email, subject, message);
  }
}
