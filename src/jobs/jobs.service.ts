import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { MailService } from '../mail/mail.service';
import { Cron } from '@nestjs/schedule';
import { usersStatsTemplate } from '../utils/emailTemplate';

@Injectable()
export class JobsService {
    constructor(
        private readonly userService: UserService,
        private readonly mailService: MailService
    ) { }

    /* schedule to run at 8:00 AM every day */
    @Cron('00 08 * * *')
    async userStatsEmail() {
        const { users, admins, verifiedUsers, unverifiedUsers } = await this.userService.getUserStats();
        await this.mailService.sendMail('alisarwar9211@gmail.com', "Users Stats", "Numbers of Users", usersStatsTemplate(users, admins, verifiedUsers, unverifiedUsers));
    }
}