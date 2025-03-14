import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ROLE, TYPE } from '../utils/constants';

@Schema()
export class Users extends Document {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ enum: ROLE, default: ROLE.USER })
    role: string;

    @Prop()
    otp: string;

    @Prop()
    otpExpiration: Date;

    @Prop()
    isVerified: boolean;

    @Prop()
    refreshToken?: string;

    @Prop({ enum: TYPE, default: TYPE.LOCAL })
    type: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

// email , password , role , otp , otpExpiration , isVerified , type
// email , password , role , isVerified , refreshToken , type

// email , role , type
// email , role , refreshToken , type