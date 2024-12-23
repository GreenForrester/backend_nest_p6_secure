import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Options,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Options() // Handle OPTIONS requests for CORS preflight. nestjs mostly handles what to return
  handleOptions() {
    return {}; // Just return an empty object - NestJS will add the necessary headers
  }

  //local will allow to use local strategy
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //end point will have slash counts at the end
  @Get('counts')
  async getCounts() {
    return this.authService.getCounts();
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
