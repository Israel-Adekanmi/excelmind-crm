import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1]; // Bearer <token>

    if (!token) {
      throw new UnauthorizedException('Access token is required');
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET') || 'secret';
      const payload = this.jwtService.verify(token, { secret }); // decode JWT
      request.user = payload; // attach decoded user to request
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
