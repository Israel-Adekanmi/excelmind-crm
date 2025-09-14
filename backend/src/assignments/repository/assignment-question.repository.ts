import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignmentQuestion } from '../entity/assignment-question.entity';

@Injectable()
export class AssignmentQuestionRepository {
  constructor(
    @InjectRepository(AssignmentQuestion) private readonly repo: Repository<AssignmentQuestion>,
  ) {}

  create(data: Partial<AssignmentQuestion>) {
    return this.repo.create(data);
  }

  save(question: AssignmentQuestion) {
    return this.repo.save(question);
  }

  findByCourse(courseId: string) {
    return this.repo.find({ where: { courseId } });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }
}
