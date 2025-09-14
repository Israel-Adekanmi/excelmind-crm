import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsIn } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: ['student', 'lecturer', 'admin'], default: 'student' })
  @IsIn(['student', 'lecturer', 'admin'])
  role: 'student' | 'lecturer' | 'admin';
}
