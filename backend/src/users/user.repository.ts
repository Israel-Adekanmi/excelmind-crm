import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from 'src/auth/enum/role.enum';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  create(user: Partial<User>) {
    return this.repo.create(user);
  }

  save(user: User) {
    return this.repo.save(user);
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findAll() {
    return this.repo.find();
  }

  findByRole(role: Role) {
    return this.repo.find({ where: { role } });
  }
}
