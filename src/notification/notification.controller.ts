import { Body, Controller, Get, Patch, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { UserService } from '../user/user.service';
import { NotificationDto } from './dto/notification.dto';
import { Request } from 'express';

@Controller('notification')
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService,
        private readonly userService: UserService
    ) { }

    @Post()
    async sendNotificationToAllUsers(@Body(ValidationPipe) reqbody: NotificationDto) {
        console.log(reqbody);

        const notification = await this.notificationService.createNotification(reqbody);

        return { message: "notification sent successfully", notification };
    }

    @Patch('read/:id')
    async readNotification(@Req() req: Request) {
        console.log(req.params);

        const notification = await this.notificationService.checkNotificationExist(req.params.id);

        // mark the notification as read
        notification.isRead = true;
        // save the updated notification
        await notification.save();

        return { message: "notification marked as read", notification };
    }

    @Get('user/:userId')
    async getNotificationsByUserId(@Req() req: Request) {
        console.log(req.params);

        await this.userService.checkUserExistById(req.params.userId);

        const notifications = await this.notificationService.checkUserNotificationsExist(req.params.userId);

        return { message: "notifications list successfully", notifications };
    }

    @Get()
    async getAllNotifications() {
        const notifications = await this.notificationService.checkAllNotifications();

        return { message: "notifications list successfully", notifications };
    }

    @Get('paginate')
    async getAllNotificationsPaginate(@Req() req: Request) {
        const notifications = await this.notificationService.checkAllNotificationsPaginate(req.query.page, req.query.limit);

        return { message: "notifications list successfully", notifications };
    }

    @Get('paginate/userId')
    async getAllNotificationsPaginateAggregation(@Req() req: Request) {
        const notifications = await this.notificationService.checkAllNotificationsPaginateAggregation(req.query.page, req.query.limit, req.query.userId);

        return { message: "notifications list successfully", notifications };
    }
}