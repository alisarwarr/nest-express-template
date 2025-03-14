import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhookService {
    consoleWebhook() {
        console.log('webhook consoled . .');
    }
}