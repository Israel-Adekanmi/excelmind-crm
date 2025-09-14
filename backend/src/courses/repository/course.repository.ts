import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entity/course.entity';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(Course) private readonly repo: Repository<Course>,
  ) {}

  create(data: Partial<Course>) {
    return this.repo.create(data);
  }

  save(course: Course) {
    return this.repo.save(course);
  }

  findAll() {
    return this.repo.find({ relations: ['lecturer'] });
  }

  findByLecturerId(lecturerId: string) {
    return this.repo.find({
      where: { lecturerId },
      relations: ['lecturer'],
    });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['lecturer'] });
  }
}
