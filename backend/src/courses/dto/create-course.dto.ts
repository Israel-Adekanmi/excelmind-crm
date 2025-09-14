import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, Min, IsUUID, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  credits: number;
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
