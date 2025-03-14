import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                service: "gmail",
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                    user: process.env.NODEMAILER_EMAIL_USER,
                    pass: process.env.NODEMAILER_EMAIL_PASS
                }
            },
            defaults: {
                from: process.env.NODEMAILER_EMAIL_USER   // sender address
            }
        })
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule { }
