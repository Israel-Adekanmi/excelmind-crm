import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard, Roles } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/enum/role.enum';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/user-sign-up')
  @ApiOperation({
    description: 'Sign up a new user',
  })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get('/get-all-users')
  @ApiOperation({ description: 'List all users (admin only)' })
  @ApiResponse({ status: 200, description: 'List users' })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/all-students')
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Get all students (Admin only)' })
  getAllStudents() {
    return this.usersService.getAllStudents();
  }

  @Get('/all-admins')
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Get all admins (Admin only)' })
  getAllAdmins() {
    return this.usersService.getAllAdmins();
  }

  @Get('/all-lecturers')
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Get all lecturers (Admin only)' })
  getAllLecturers() {
    return this.usersService.getAllLecturers();
  }
}
