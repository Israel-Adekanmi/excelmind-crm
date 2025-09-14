import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AssignmentQuestion } from './assignment-question.entity';
import { Course } from '../../courses/entity/course.entity';
import { User } from '../../users/user.entity';

@Entity()
export class AssignmentSubmission {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  assignmentQuestionId: string;

  @ManyToOne(() => AssignmentQuestion)
  assignmentQuestion: AssignmentQuestion;

  @ApiProperty()
  @Column()
  courseId: string;

  @ManyToOne(() => Course)
  course: Course;

  @ApiProperty()
  @Column()
  studentId: string;

  @ManyToOne(() => User)
  student: User;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  fileUrl?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  textAnswer?: string;

  @ApiProperty({ nullable: true })
  @Column({ type: 'int', nullable: true })
  grade?: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
