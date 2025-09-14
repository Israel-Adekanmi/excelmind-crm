import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsDateString, IsOptional } from 'class-validator';
import { IsInt, Min, Max } from 'class-validator';

export class CreateAssignmentQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsUUID()
  courseId: string;

  @ApiProperty()
  @IsDateString()
  deadline: Date;
}


export class SubmitAssignmentDto {
  @ApiProperty()
  @IsUUID()
  assignmentQuestionId: string;

  @ApiProperty()
  @IsUUID()
  courseId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  textAnswer?: string;
}


export class GradeAssignmentDto {
  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(100)
  score: number;
}

