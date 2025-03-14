import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // return next.handle();
        // 'Hello World'

        // return next.handle().pipe(map((data) => ({ data })));
        // {
        //   "data": 'Hello World'
        // }

        console.log(context.getClass().name, 'Before...');
        const now = Date.now();
        return next.handle().pipe(
            map((response) => {
                console.log(context.getClass().name, `After... ${Date.now() - now}ms`);
                console.log("response - ", response);
                return {
                    success: true,
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    message: response ? 'Request successful' : 'Error occurred',
                    ...(response && { data: response })
                };
            })
        );
        // Before...
        // After... 2ms
        // {
        //   "success": true,
        //   "statusCode": 200,
        //   "message": 'Request successful',
        //   "data": 'Hello World'
        // }
    }
}