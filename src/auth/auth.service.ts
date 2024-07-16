import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(email: string, password: string): string {
    if (email === 'test@test.com' && password === 'test') {
      const payload: Payload = { email, sub: '0' };
      return this.jwtService.sign(payload);
    }
    throw new UnauthorizedException('인증되지 않은 사용자입니다.');
  }
}
