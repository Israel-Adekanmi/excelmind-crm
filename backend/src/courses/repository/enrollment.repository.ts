import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from '../entity/enrollment.entity';

@Injectable()
export class EnrollmentRepository {
  constructor(@InjectRepository(Enrollment) private readonly repo: Repository<Enrollment>) {}

  create(data: Partial<Enrollment>) {
    return this.repo.create(data);
  }

  save(enrollment: Enrollment) {
    return this.repo.save(enrollment);
  }

  findByStudent(studentId: string) {
    return this.repo.find({ where: { studentId }, relations: ['course'] });
  }

  findByCourse(courseId: string) {
    return this.repo.find({ where: { courseId }, relations: ['student'] });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['student', 'course'] });
  }
}
