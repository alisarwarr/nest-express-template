import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Photos, PhotosSchema } from '../schemas/photo.schema';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
    imports: [MongooseModule.forFeature([{ name: Photos.name, schema: PhotosSchema }])],
    controllers: [PhotoController],
    providers: [PhotoService]
})
export class PhotoModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
           .apply(AuthMiddleware)
           .forRoutes(PhotoController);
    }
}