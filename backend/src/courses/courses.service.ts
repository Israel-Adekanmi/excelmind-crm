import { Injectable } from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto } from './dto/create-course.dto';
import { EnrollmentRepository } from './repository/enrollment.repository';
import { CourseRepository } from './repository/course.repository';
import { CreateEnrollmentDto, UpdateEnrollmentDto } from './dto/enrollment.dto';

@Injectable()
export class CoursesService {
  constructor(
    private readonly courseRepo: CourseRepository,
    private readonly enrollmentRepo: EnrollmentRepository,
  ) {}

  async create(dto: CreateCourseDto, lecturerId: string) {
    try {
      const course = this.courseRepo.create({ ...dto, lecturerId });

      const saved = await this.courseRepo.save(course);
      return { error: false, message: 'Course created', data: saved };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async findAll() {
    try {
      const courses = await this.courseRepo.findAll();
      return { error: false, message: 'Fetched courses', data: courses };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async update(id: string, dto: UpdateCourseDto) {
    try {
      const course = await this.courseRepo.findById(id);
      if (!course)
        return { error: true, message: 'Course not found', data: null };

      Object.assign(course, dto);
      const updated = await this.courseRepo.save(course);
      return { error: false, message: 'Course updated', data: updated };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async uploadSyllabus(id: string, fileUrl: string) {
    try {
      const course = await this.courseRepo.findById(id);
      if (!course)
        return { error: true, message: 'Course not found', data: null };

      course.syllabus = fileUrl;
      const updated = await this.courseRepo.save(course);
      return { error: false, message: 'Syllabus uploaded', data: updated };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async findByLecturer(lecturerId: string) {
    try {
      const courses = await this.courseRepo.findByLecturerId(lecturerId);
      return {
        error: false,
        message: 'Courses fetched successfully',
        data: courses,
      };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async findById(id: string) {
    try {
      const course = await this.courseRepo.findById(id);
      if (!course)
        return { error: true, message: 'Course not found', data: null };
      return {
        error: false,
        message: 'Course fetched successfully',
        data: course,
      };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async getAllEnrollments() {
    try {
      const enrollments = await this.enrollmentRepo.findAll();
      return {
        error: false,
        message: 'Fetched all enrollments',
        data: enrollments,
      };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async requestEnrollment(dto: CreateEnrollmentDto, studentId: string) {
    try {
      const enrollment = this.enrollmentRepo.create({ ...dto, studentId });
      const saved = await this.enrollmentRepo.save(enrollment);
      return {
        error: false,
        message: 'Enrollment request submitted',
        data: saved,
      };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async updateStatus(id: string, dto: UpdateEnrollmentDto) {
    try {
      const enrollment = await this.enrollmentRepo.findById(id);
      if (!enrollment)
        return { error: true, message: 'Enrollment not found', data: null };

      enrollment.status = dto.status;
      const updated = await this.enrollmentRepo.save(enrollment);
      return {
        error: false,
        message: 'Enrollment status updated',
        data: updated,
      };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async getByStudent(studentId: string) {
    try {
      const enrollments = await this.enrollmentRepo.findByStudent(studentId);
      return {
        error: false,
        message: 'Fetched student enrollments',
        data: enrollments,
      };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }

  async getByCourse(courseId: string) {
    try {
      const enrollments = await this.enrollmentRepo.findByCourse(courseId);
      return {
        error: false,
        message: 'Fetched course enrollments',
        data: enrollments,
      };
    } catch (err) {
      return { error: true, message: err.message, data: null };
    }
  }
}
