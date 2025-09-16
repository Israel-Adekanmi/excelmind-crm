import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsIn, ValidateIf } from 'class-validator';
import { Role } from 'src/auth/enum/role.enum';

export class CreateUserDto {
   @ApiProperty()
  @MinLength(2)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: ['student', 'lecturer', 'admin'], default: 'student' })
  @IsIn(['student', 'lecturer', 'admin'])
  role: 'student' | 'lecturer' | 'admin';

  // ---- Shared for student & lecturer ----
  @ApiProperty({ required: false })
  @ValidateIf(o => o.role === Role.STUDENT || o.role === Role.LECTURER)
  department?: string;

  @ApiProperty({ required: false })
  @ValidateIf(o => o.role === Role.STUDENT || o.role === Role.LECTURER)
  faculty?: string;

  // ---- Student-only fields ----
  @ApiProperty({ required: false })
  @ValidateIf(o => o.role === Role.STUDENT)
  level?: string;

  @ApiProperty({ required: false })
  @ValidateIf(o => o.role === Role.STUDENT)
  matricNo?: string;

  // ---- Lecturer-only field ----
  @ApiProperty({ required: false })
  @ValidateIf(o => o.role === Role.LECTURER)
  position?: string;
}
