import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from '../schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
    imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]   //so that other modules that import "UserModule" and can also use the "UserService"
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(UserController);
    }
}