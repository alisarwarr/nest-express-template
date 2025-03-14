import { Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
    constructor(
        private readonly webhookService: WebhookService
    ) { }
    
    @Post()
    sampleWebhook() {
        this.webhookService.consoleWebhook();

        return { message: "received webhook successfully" };
    }
}