import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../schemas/user.schema';
import { paginate, paginateAggregation } from '../utils/paginate.js';
import { ROLE } from '../utils/constants';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(Users.name) private readonly usersModel: Model<Users>
    ) { }

    async checkAllUserIds() {
        const findUserIds = await this.usersModel.find({}, '_id');                 // fetch only the `_id` field

        if (!findUserIds || findUserIds.length === 0) {
            throw new BadRequestException("No users found.");
        }

        return findUserIds;
    }

    async checkUserExistById(id: string) {
        const findUser = await this.usersModel.findById(id);

        if (!findUser) {
            throw new BadRequestException("User not exist.");
        }

        return findUser;
    }

    async checkAllUsers() {
        const allUsers = await this.usersModel.find({});

        return allUsers;
    }

    async checkAllUsersPaginate(page, limit) {
        const allUsers = await paginate(this.usersModel, {}, page, limit);

        return allUsers;
    }

    async checkAllUsersPaginateAggregation(page, limit, role) {
        const allUsers = await paginateAggregation(
            this.usersModel,
            [
                {
                    $match: {
                        role
                    }
                }
            ],
            page,
            limit
        );

        return allUsers;
    }

    async getUserStats() {
        const users = await this.usersModel.countDocuments();
        const admins = await this.usersModel.countDocuments({ role: ROLE.ADMIN });
        const unverifiedUsers = await this.usersModel.countDocuments({ isVerified: false });
        return { users: Number(users - admins), admins: Number(admins), verifiedUsers: Number(users - unverifiedUsers), unverifiedUsers: Number(unverifiedUsers) };
    }

    sanitizedUser(user) {
        const sanitized = user.toObject ? user.toObject() : user;
        delete sanitized.password;
        delete sanitized.otp;
        delete sanitized.otpExpiration;
        delete sanitized.isVerified;
        delete sanitized.refreshToken;
        return sanitized;
    }
}