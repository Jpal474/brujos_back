import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail', // o el proveedor de correo que vayas a utilizar
      auth: {
        user: process.env.USER_MAIL, // tu dirección de correo
        pass: process.env.PASS_MAIL,
      },
    });
  }

  async sendVerificationMail(
    to: string,
    subject: string,
    htmlContent: string,
  ): Promise<void> {
    console.log('entra a sendmail');
    
    try {
      const mailOptions = {
        from: process.env.USER_MAIL, // tu dirección de correo
        to: to,
        subject: subject,
        html: htmlContent,
      };
      console.log('before being send');
      

      const send = await this.transporter.sendMail(mailOptions);
      console.log(send, 'send');
    } catch (error) {
        throw new HttpException(
            error+"",
            HttpStatus.BAD_REQUEST,
          );
            }
  }

}
