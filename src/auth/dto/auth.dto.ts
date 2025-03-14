import { IsEmail, IsIn, IsMongoId, IsNotEmpty, MaxLength, MinLength, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ROLE } from '../../utils/constants';
import * as jwt from 'jsonwebtoken';

export class SignupUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @IsIn(Object.values(ROLE))
    @IsNotEmpty()
    role: string;
}

export class SigninUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class VerifyUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(6)
    @MaxLength(6)
    @IsNotEmpty()
    otp: string;
}

@ValidatorConstraint()
export class RefreshTokenValidator implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments) {
        if (!jwt.decode(value)) throw new Error("Invalid refresh token.");                                     // for 'length'
        if (!jwt.verify(value, process.env.REFRESH_TOKEN_SECRET)) throw new Error("Invalid refresh token.");   // for 'correct' or 'fake'
        return true;
    }
}

export class RefreshTokenDto {
    @IsMongoId()
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    @Validate(RefreshTokenValidator)
    refreshToken: string;
}

export class LogoutDto {
    @IsMongoId()
    @IsNotEmpty()
    userId: string;
}