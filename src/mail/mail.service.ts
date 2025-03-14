import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMail(to: string, subject: string, text: string, html: string) {
        const mailOptions = {
            to,                                        // list of receivers
            subject,                                   // Subject line
            text,                                      // Text line
            html                                       // html body
        }

        try {
            const info = await this.mailerService.sendMail(mailOptions);
            console.log("info", info.messageId);
            console.log("info", info.accepted);        // array of successful emails
            console.log("info", info.rejected);        // array of unsuccessful emails
        }
        catch (error) {
            console.error("Error sending email:", error);
            throw new BadRequestException('Error sending email');
        }
    }
}