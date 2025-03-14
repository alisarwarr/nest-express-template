import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService = app.get(ConfigService);
    const port = configService.get("PORT") || 2000;

    app.setViewEngine("ejs");
    app.setBaseViewsDir(join(__dirname, "../", "src", "views"));

    //allows apps to use api
    app.enableCors();

    //to handle any errors
    app.useGlobalFilters(new AllExceptionsFilter());

    //to handle json response
    app.useGlobalInterceptors(new TransformInterceptor());

    await app.listen(port);
    console.log(`Server running at http://localhost:${port}`);
}
bootstrap();