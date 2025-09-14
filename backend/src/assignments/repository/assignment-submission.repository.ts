import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignmentSubmission } from '../entity/assignment-submission.entity';

@Injectable()
export class AssignmentSubmissionRepository {
  constructor(
    @InjectRepository(AssignmentSubmission) private readonly repo: Repository<AssignmentSubmission>,
  ) {}

  create(data: Partial<AssignmentSubmission>) {
    return this.repo.create(data);
  }

  save(submission: AssignmentSubmission) {
    return this.repo.save(submission);
  }

  findByStudent(studentId: string) {
    return this.repo.find({ where: { studentId }, relations: ['assignmentQuestion'] });
  }

  findByQuestion(assignmentQuestionId: string) {
    return this.repo.find({ where: { assignmentQuestionId }, relations: ['student'] });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['student', 'assignmentQuestion'] });
  }
}
