import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CloudinaryService } from './cloudinary.service';
import { JwtService } from '@nestjs/jwt';
import { Course } from './entity/course.entity';
import { CourseRepository } from './repository/course.repository';
import { Enrollment } from './entity/enrollment.entity';
import { EnrollmentRepository } from './repository/enrollment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Enrollment])],
  controllers: [CoursesController],
  providers: [CoursesService, JwtService, EnrollmentRepository, CloudinaryService, CourseRepository],
  exports: [CoursesService],
})
export class CoursesModule {}
