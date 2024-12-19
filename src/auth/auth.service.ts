import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs'; //bcrypt does not work with containers but bcryptjs works
import * as crypto from 'crypto';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  fullname: string = null;

  //DataSource provider is globally available due to app.module.ts
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private dataSource: DataSource,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username); //username is acutally email
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      this.fullname = user.fullname;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '300s' }); // 240 sec just for testing
    const refreshToken = crypto.randomUUID();
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      fullname: this.fullname,
    };
  }

  async getCounts(): Promise<any> {
    //user and order are reserved words, they should be inside qoutes
    try {
      const result = await this.dataSource.query(`
        SELECT
          (SELECT COUNT(*) FROM "user") AS userCount,
          (SELECT COUNT(*) FROM product) AS productCount,
          (SELECT COUNT(*) FROM customer) AS customerCount,
          (SELECT COUNT(*) FROM "order") AS orderCount;
      `);

      if (result && result[0]) {
        return JSON.stringify(result[0]);
      } else {
        return JSON.stringify({}); // Or return null, or an appropriate error response
      }
    } catch (error) {
      // Handle potential errors
      console.error('Error getting counts:', error);
      throw error; // Or return an appropriate error response
    }
  }

  //implment a log out function that accepts refresh token and remove it from redis
}
