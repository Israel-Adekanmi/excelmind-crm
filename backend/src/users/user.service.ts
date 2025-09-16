import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
// import { ResponseDto } from '../common/dto/response.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/enum/role.enum';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

async create(dto: CreateUserDto) {
  try {
    // 🔹 Check if email already exists
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      return { error: true, message: 'Email already exists', data: null };
    }

    // 🔹 Role-specific validation
    if (dto.role === Role.STUDENT) {
      if (!dto.department || !dto.faculty || !dto.level || !dto.matricNo) {
        return {
          error: true,
          message: 'Student must provide department, faculty, level, and matricNo',
          data: null,
        };
      }
    }

    if (dto.role === Role.LECTURER) {
      if (!dto.department || !dto.faculty || !dto.position) {
        return {
          error: true,
          message: 'Lecturer must provide department, faculty, and position',
          data: null,
        };
      }
    }

    if (dto.role === Role.ADMIN) {
      if (!dto.name) {
        return { error: true, message: 'Admin must have a name', data: null };
      }
    }

    // 🔹 Hash password
    const hash = await bcrypt.hash(dto.password, 10);

    // 🔹 Create and save
    const user = this.userRepo.create({ ...dto, password: hash });
    const saved = await this.userRepo.save(user);

    return {
      error: false,
      message: 'User created successfully',
      data: saved,
    };
  } catch (err) {
    return { error: true, message: err.message || 'Failed to create user', data: null };
  }
}


  async findAll() {
    try {
      const users = await this.userRepo.findAll();
      return { error: false, message: 'Fetched users', data: users };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async getAllStudents() {
    try {
      const students = await this.userRepo.findByRole(Role.STUDENT);
      return { error: false, message: 'Fetched all students', data: students };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async getAllAdmins() {
    try {
      const admins = await this.userRepo.findByRole(Role.ADMIN);
      return { error: false, message: 'Fetched all admins', data: admins };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async getAllLecturers() {
    try {
      const lecturers = await this.userRepo.findByRole(Role.LECTURER);
      return {
        error: false,
        message: 'Fetched all lecturers',
        data: lecturers,
      };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }
}
