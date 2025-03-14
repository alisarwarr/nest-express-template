import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { ROLE } from '../utils/constants';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        if (req.user.role !== ROLE.ADMIN) {
            throw new ForbiddenException("Access Denied: Admins Only.");
        }
    
        next();
    }
}