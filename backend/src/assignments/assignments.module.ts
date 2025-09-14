import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';
import { AssignmentQuestion } from './entity/assignment-question.entity';
import { AssignmentSubmission } from './entity/assignment-submission.entity';
import { AssignmentQuestionRepository } from './repository/assignment-question.repository';
import { AssignmentSubmissionRepository } from './repository/assignment-submission.repository';
import { CloudinaryService } from 'src/courses/cloudinary.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([AssignmentQuestion, AssignmentSubmission])],
  controllers: [AssignmentsController],
  providers: [
    AssignmentsService,
    JwtService,
    AssignmentQuestionRepository,
    AssignmentSubmissionRepository,
    CloudinaryService,
  ],
})
export class AssignmentsModule {}
