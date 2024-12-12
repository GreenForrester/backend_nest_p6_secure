// src/auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// the link between JwtAuthGuard and JwtStrategy happens implicitly through
// the passport-jwt library and NestJS's dependency injection system.

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {} //jwt implicitly uses jwtstrategy.ts we created
