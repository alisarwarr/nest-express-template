import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

/* https://docs.nestjs.com/exception-filters */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status =
            // exception instanceof HttpException
            //     ? exception.getStatus()
            //     : HttpStatus.INTERNAL_SERVER_ERROR;
            this.getStatusCode(exception);
        const message =
            // if (exception instanceof HttpException) {
            // }
            // else if (exception instanceof Error) {
            // }
            this.getErrorMessage(exception);

        console.log("message - ", message);

        response
            .status(status)
            .json({
                success: false,
                statusCode: status,
                message: message['errorMessage'] || message,
                errors: message['errors']
            });

        this.logger.error('Exception thrown:', exception, exception?.['stack']);
    }

    private getStatusCode(exception: unknown): number {
        console.log("getStatusCode");
        if (exception instanceof HttpException) {
            console.log("getStatusCode - instanceof HttpException");
            return exception.getStatus();
        }
        else {
            console.log("getStatusCode - INTERNAL_SERVER_ERROR");
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    private getErrorMessage(exception: unknown): string {
        console.log("getErrorMessage");
        if (exception instanceof HttpException) {
            console.log("getErrorMessage - instanceof HttpException");
            const responseContent = exception.getResponse();
            return responseContent['message'] || responseContent || exception.message;
        }
        else if (exception instanceof Error) {
            console.log("getErrorMessage - instanceof Error");
            return exception.message;
        }
        else {
            console.log("getErrorMessage - Internal Server Error");
            return 'Internal Server Error';
        }
    }
}