import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { WebhookModule } from './webhook/webhook.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PhotoModule } from './photo/photo.module';
import { NotificationModule } from './notification/notification.module';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { MailService } from './mail/mail.service';
import { JobsService } from './jobs/jobs.service';
import { PaymentModule } from './payment/payment.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        ScheduleModule.forRoot(),
        WebhookModule,
        AuthModule,
        UserModule,
        PhotoModule,
        NotificationModule,
        PaymentModule
    ],
    controllers: [
        AppController
    ],
    providers: [
        MailService,
        JobsService
    ]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*');
    }
}