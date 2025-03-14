import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from '../schemas/notification.schema';
import { paginate, paginateAggregation } from '../utils/paginate.js';
import { toMongoId } from '../utils/helpers.js';
import { UserService } from '../user/user.service';
import { SocketGateway } from '../events/socket.gateway';

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Notification.name) private readonly NotificationModel: Model<Notification>,
        private readonly userService: UserService,
        private readonly socketGateway: SocketGateway
    ) { }

    async checkNotificationExist(id: string) {
        const findNotification = await this.NotificationModel.findById(id);

        if (!findNotification) {
            throw new BadRequestException("Notification not exist.");
        }

        return findNotification;
    }

    async checkUserNotificationsExist(userId: string) {
        const findNotifications = await this.NotificationModel.find({ userId }).sort({ createdAt: -1 });

        if (!findNotifications) {
            throw new BadRequestException("User notifications not exist.");
        }

        return findNotifications;
    }

    async checkAllNotifications() {
        const allNotifications = await this.NotificationModel.find({});

        return allNotifications;
    }

    async checkAllNotificationsPaginate(page, limit) {
        const allNotifications = await paginate(this.NotificationModel, {}, page, limit);

        return allNotifications;
    }

    async checkAllNotificationsPaginateAggregation(page, limit, userId) {
        const allNotifications = await paginateAggregation(
            this.NotificationModel,
            [
                {
                    $match: {
                        userId: toMongoId(userId)
                    }
                }
            ],
            page,
            limit
        );

        return allNotifications;
    }

    async createNotification(body) {
        const allUserIds = await this.userService.checkAllUserIds();

        const notification = allUserIds.map((user) => ({
            userId: user._id,
            text: body.text
            //isRead - default "false"
        }));

        const newNotification = await this.NotificationModel.insertMany(notification);

        allUserIds.forEach((user) => {
            this.socketGateway.server.emit('new-notification', {
                userId: user._id,
                text: body.text
            });
        });

        return newNotification;
    }
}