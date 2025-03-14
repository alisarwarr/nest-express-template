import { Body, Controller, Get, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { SignupUserDto, SigninUserDto, VerifyUserDto, RefreshTokenDto, LogoutDto } from './dto/auth.dto';
import { FacebookAuthGuard, GoogleAuthGuard } from '../strategies/auth-guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    @Post('signup')
    async signupUser(@Body(ValidationPipe) reqbody: SignupUserDto) {
        console.log(reqbody);

        await this.authService.checkUserDuplicate(reqbody.email);

        const user = await this.authService.createUser(reqbody);

        return { message: "user signedup successfully", user: this.userService.sanitizedUser(user) };
    }

    @Post('signin')
    async signinUser(@Body(ValidationPipe) reqbody: SigninUserDto) {
        console.log(reqbody);

        const user = await this.authService.checkUserExist(reqbody.email);

        this.authService.compareUserPassword(reqbody.password, user.password);

        await this.authService.checkUserVerified(reqbody.email);

        const { token, refreshToken } = await this.authService.generateTokens_Access_Refresh(user);

        return { message: "user signedin successfully", user: this.userService.sanitizedUser(user), token, refreshToken };
    }

    @Post('verify')
    async verifyUser(@Body(ValidationPipe) reqbody: VerifyUserDto) {
        console.log(reqbody);

        const user = await this.authService.checkUserVerification(reqbody.email, reqbody.otp);

        // clear OTP after verification
        user.otp = undefined;
        // clear OTP expiration time
        user.otpExpiration = undefined;
        // mark the user as verified
        user.isVerified = true;
        // save the updated user
        await user.save();

        const { token, refreshToken } = await this.authService.generateTokens_Access_Refresh(user);

        return { message: "user verified successfully", user: this.userService.sanitizedUser(user), token, refreshToken };
    }

    @Post('refresh-token')
    async refreshToken(@Body(ValidationPipe) reqbody: RefreshTokenDto) {
        console.log(reqbody);

        const user = await this.authService.checkUserRefreshToken(reqbody.userId, reqbody.refreshToken);

        const { token, refreshToken } = await this.authService.generateTokens_Access_Refresh(user, true);

        return { message: "token generated successfully", token, refreshToken };
    }

    @Post('logout')
    async logout(@Body(ValidationPipe) reqbody: LogoutDto) {
        console.log(reqbody);

        const user = await this.userService.checkUserExistById(reqbody.userId);

        // remove token
        user.refreshToken = undefined;
        // save the updated user
        await user.save();

        return { message: "user loggedout successfully" };
    }

    @UseGuards(GoogleAuthGuard)
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    googleAuth() {
        /* Guard redirects to Google login */
    }
    @Get('google/callback')
    async signinSocial_Google(@Req() req: any, @Res() res: Response) {
        if (!req.user) return res.redirect('/');                                               // user profile returned by Google/Facebook

        const user = await this.authService.checkUserExist(req.user.email);

        const { token, refreshToken } = await this.authService.generateTokens_Access_Refresh(user);

        return { message: "user social signedin successfully", user: this.userService.sanitizedUser(user), token, refreshToken };
    }

    @UseGuards(FacebookAuthGuard)
    @Get('facebook')
    facebookAuth() {
        /* Guard redirects to Facebook login */
    }
    @UseGuards(FacebookAuthGuard)
    @Get('facebook/callback')
    async signinSocial_Facebook(@Req() req: any, @Res() res: Response) {
        if (!req.user) return res.redirect('/');                                               // user profile returned by Google/Facebook

        const user = await this.authService.checkUserExist(req.user.email);

        const { token, refreshToken } = await this.authService.generateTokens_Access_Refresh(user);

        return { message: "user social signedin successfully", user: this.userService.sanitizedUser(user), token, refreshToken };
    }
}