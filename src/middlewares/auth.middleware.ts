import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const token = req.headers['authorization']?.split(' ')[1];   // Bearer TOKEN

        if (!token) {
            throw new UnauthorizedException("No token found");
        }

        jwt.verify(token, process.env.TOKEN_SECRET, ((error, decoded) => {
            if (error) throw new UnauthorizedException("Invalid token");
            req.user = decoded;   // attach decoded user data to the request object
            next();
        }));
    }
}