import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from '../schemas/notification.schema';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { AdminMiddleware } from '../middlewares/admin.middleware';
import { SocketGateway } from '../events/socket.gateway';

@Module({
    imports: [UserModule, MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }])],
    controllers: [NotificationController],
    providers: [NotificationService, SocketGateway]
})
export class NotificationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(NotificationController)
            .apply(AdminMiddleware)
            .forRoutes({ path: 'notification', method: RequestMethod.POST });
    }
}