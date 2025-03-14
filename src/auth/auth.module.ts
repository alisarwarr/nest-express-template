import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from '../schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy, FacebookStrategy } from '../strategies/strategy';
import { MailModule } from '../mail/mail.module';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
    imports: [UserModule, MailModule, MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]), PassportModule.register({ session: false })],
    controllers: [AuthController],
    providers: [AuthService, GoogleStrategy, FacebookStrategy]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'auth/refresh-token', method: RequestMethod.POST },
                { path: 'auth/logout', method: RequestMethod.POST }
            );
    }
}