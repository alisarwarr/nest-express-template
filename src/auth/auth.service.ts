import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../schemas/user.schema';
import { MailService } from '../mail/mail.service';
import { comparePassword, hashPassword } from '../utils/bcrypt';
import { generateRefreshToken, generateToken } from '../utils/jwt';
import { generateOtp } from '../utils/helpers';
import { otpTemplate } from '../utils/emailTemplate';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Users.name) private readonly usersModel: Model<Users>,
        private readonly mailService: MailService
    ) { }

    async checkUserDuplicate(email: string) {
        const findUser = await this.usersModel.findOne({ email });

        if (findUser) {
            throw new BadRequestException("User already exist.");
        }
    }

    async checkUserExist(email: string) {
        const findUser = await this.usersModel.findOne({ email });

        if (!findUser) {
            throw new BadRequestException("User not exist.");
        }

        return findUser;
    }

    async compareUserPassword(plain: string, hashed: string) {
        const password = comparePassword(plain, hashed);

        if (!password) {
            throw new BadRequestException("Invalid credentials.");
        }
    }

    async checkUserVerified(email: string) {
        const findUser = await this.usersModel.findOne({ email });

        if (!findUser) {
            throw new BadRequestException("User not exist.");
        }
        if (!findUser.isVerified) {
            throw new BadRequestException("User is not verified.");
        }

        return findUser;
    }

    async checkUserVerification(email: string, otp: string) {
        const findUser = await this.usersModel.findOne({ email });

        if (!findUser) {
            throw new BadRequestException("User not exist.");
        }
        if (findUser.isVerified) {
            throw new BadRequestException("User is already verified.");
        }
        if (findUser.otpExpiration < new Date()) {
            throw new BadRequestException("OTP has expired.");
        }
        if (findUser.otp !== otp) {
            throw new BadRequestException("Invalid OTP.");
        }

        return findUser;
    }

    async checkUserRefreshToken(userId: string, refreshToken: string) {
        const findUser = await this.usersModel.findById(userId);

        if (!findUser) {
            throw new BadRequestException("User not exist.");
        }
        if (findUser.refreshToken !== refreshToken) {
            throw new BadRequestException("Refresh token already used.");            // because it passed 'custom' of refreshTokenValidation
        }

        return findUser;
    }

    async socialUser(type, email, done) {
        try {
            let user = await this.usersModel.findOne({ email });

            if (!user) {
                const data = {                                                      // picked only required properties
                    email,
                    type
                }

                user = await new this.usersModel(data).save();
            }

            return done(null, user);
        }
        catch (error) {
            return done(error, false);
        }
    }

    async createUser(body) {
        const { otp, otpExpiration } = generateOtp();

        await this.mailService.sendMail(body.email, "Verify your Account", "Please, verify below using OTP", otpTemplate(otp));

        const data = {
            ...body,
            password: hashPassword(body.password),
            otp, otpExpiration, isVerified: false
        }

        const newUser = await new this.usersModel(data).save();

        return newUser;
    }

    async generateTokens_Access_Refresh(user, force?: boolean) {
        //let token = generateToken(user._id);
        let token = generateToken({ id: user._id, role: user.role });
        let refreshToken = user.refreshToken;
        if (!refreshToken || force) {                                               // if not exist on mongodb after signup or logout
            //refreshToken = generateRefreshToken(user._id);
            refreshToken = generateRefreshToken({ id: user._id, role: user.role });
            user.refreshToken = refreshToken;
            // save the updated user
            await user.save();
        }
        return { token, refreshToken };
    }
}