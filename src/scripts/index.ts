import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { updateUserScript } from './updateUserScript';

async function bootstrap() {
    //start app, without starting the HTTP server .
    const app = await NestFactory.createApplicationContext(AppModule);

    //application logic .
    await updateUserScript(app);
    // . . . . . . . . . . .

    //close app .
    await app.close();
}
bootstrap();