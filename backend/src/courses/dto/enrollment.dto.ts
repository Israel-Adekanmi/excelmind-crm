import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IsEnum } from 'class-validator';
import { EnrollmentStatus } from '../entity/enrollment.entity';

export class CreateEnrollmentDto {
  @ApiProperty()
  @IsUUID()
  courseId: string;
}

export class UpdateEnrollmentDto {
  @ApiProperty({ enum: EnrollmentStatus })
  @IsEnum(EnrollmentStatus)
  status: EnrollmentStatus;
}
