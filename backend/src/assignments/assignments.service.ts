import { Injectable } from '@nestjs/common';
import { AssignmentQuestionRepository } from './repository/assignment-question.repository';
import { AssignmentSubmissionRepository } from './repository/assignment-submission.repository';
import { CreateAssignmentQuestionDto, GradeAssignmentDto, SubmitAssignmentDto } from './dto/assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(
    private readonly questionRepo: AssignmentQuestionRepository,
    private readonly submissionRepo: AssignmentSubmissionRepository,
  ) {}

  async createQuestion(dto: CreateAssignmentQuestionDto, lecturerId: string, fileUrl?: string) {
    try {
      const question = this.questionRepo.create({ ...dto, lecturerId, fileUrl });
      const saved = await this.questionRepo.save(question);
      return { error: false, message: 'Assignment created', data: saved };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async getQuestionsByCourse(courseId: string){
    try {
      const questions = await this.questionRepo.findByCourse(courseId);
      return { error: false, message: 'Fetched assignments', data: questions };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async submit(dto: SubmitAssignmentDto, studentId: string, fileUrl?: string) {
    try {
      const submission = this.submissionRepo.create({ ...dto, studentId, fileUrl });
      const saved = await this.submissionRepo.save(submission);
      return { error: false, message: 'Assignment submitted', data: saved };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async getSubmissionsByQuestion(assignmentQuestionId: string) {
    try {
      const submissions = await this.submissionRepo.findByQuestion(assignmentQuestionId);
      return { error: false, message: 'Fetched submissions', data: submissions };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async gradeSubmission(id: string, dto: GradeAssignmentDto) {
    try {
      const submission = await this.submissionRepo.findById(id);
      if (!submission) return { error: true, message: 'Submission not found', data: null };

      submission.grade = dto.score;
      const updated = await this.submissionRepo.save(submission);
      return { error: false, message: 'Submission graded', data: updated };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }
}
