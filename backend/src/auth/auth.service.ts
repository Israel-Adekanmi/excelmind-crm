import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    try {
      const user = await this.userRepo.findOne({ where: { email: dto.email } });
      if (!user) {
        return { error: true, message: 'Invalid credentials', data: null };
      }

      const isMatch = await bcrypt.compare(dto.password, user.password);
      if (!isMatch) {
        return { error: true, message: 'Invalid credentials', data: null };
      }

      const payload = { sub: user.id, email: user.email, role: user.role };
      const token = this.jwtService.sign(payload);

      return {
        error: false,
        message: 'Login successful',
        data: { access_token: token, user: { id: user.id, email: user.email, role: user.role } },
      };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { id: userId } });
  }
}
