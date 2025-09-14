import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Course } from './course.entity';

export enum EnrollmentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity()
export class Enrollment {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  student: User;

  @ApiProperty()
  @Column()
  studentId: string;

  @ManyToOne(() => Course)
  course: Course;

  @ApiProperty()
  @Column()
  courseId: string;

  @ApiProperty({ enum: EnrollmentStatus })
  @Column({
    type: 'enum',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.PENDING,
  })
  status: EnrollmentStatus;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
