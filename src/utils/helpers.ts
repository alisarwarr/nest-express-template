import { Types } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';

export const generateOtp = () => {
    return {
        otp: Math.floor(100000 + Math.random() * 900000).toString(),         // generate 6-digit OTP
        otpExpiration: Date.now() + 10 * 60 * 1000                           // otp valid for 10 mins
    }
}

export const toMongoId = (id: string): Types.ObjectId => {
    if (!Types.ObjectId.isValid(id)) {
        throw new HttpException('Invalid MongoId', HttpStatus.BAD_REQUEST);
    }
    return new Types.ObjectId(id);
}