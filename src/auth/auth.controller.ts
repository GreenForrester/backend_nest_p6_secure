import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //local will allow to use local strategy
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //@Post('refresh')
  //async refresh(@Body() { refreshToken }) { // Expect refreshToken in request body
  // TODO: Retrieve stored refreshToken from database based on the provided refreshToken
  //if (/* storedRefreshToken matches provided refreshToken */)
  //  {
  //   const user = // TODO: Fetch user from redis database based on the stored refreshToken;

  //   const payload = { username: user.username, sub: user.id };
  //   const accessToken = this.jwtService.sign(payload);
  //   return { access_token: accessToken };
  // } else {
  //   throw new UnauthorizedException('Invalid refresh token'); // Handle invalid token
  // }
  //}
}
