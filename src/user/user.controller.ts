import { Controller, Get, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get('profile')
    async profileUser(@Req() req: any) {
        console.log(req.user);

        const user = await this.userService.checkUserExistById(req.user.id);

        return { message: "user profile successfully", user: this.userService.sanitizedUser(user) };
    }

    @Get()
    async getAllUsers() {
        const users = await this.userService.checkAllUsers();

        return { message: "users list successfully", users: users.map((user) => this.userService.sanitizedUser(user)) };
    }

    @Get('paginate')
    async getAllUsersPaginate(@Req() req: Request) {
        const users = await this.userService.checkAllUsersPaginate(req.query.page, req.query.limit);

        return { message: "users list successfully", users: { ...users, list: users.list.map((user) => this.userService.sanitizedUser(user)) } };
    }

    @Get('paginate/role')
    async getAllUsersPaginateAggregation(@Req() req: Request) {
        const users = await this.userService.checkAllUsersPaginateAggregation(req.query.page, req.query.limit, req.query.role);

        return { message: "users list successfully", users: { ...users, list: users.list.map((user) => this.userService.sanitizedUser(user)) } };
    }
}