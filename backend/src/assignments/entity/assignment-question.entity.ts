import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../../courses/entity/course.entity';
import { User } from '../../users/user.entity';

@Entity()
export class AssignmentQuestion {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @Column()
  courseId: string;

  @ManyToOne(() => Course)
  course: Course;

  @ApiProperty()
  @Column()
  lecturerId: string;

  @ManyToOne(() => User)
  lecturer: User;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  fileUrl?: string; // Optional upload

  @ApiProperty()
  @Column({ type: 'timestamptz' })
  deadline: Date;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
