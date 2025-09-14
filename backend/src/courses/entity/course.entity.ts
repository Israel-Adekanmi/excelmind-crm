import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

@Entity()
export class Course {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column('int')
  credits: number;

  // Foreign key for lecturer
  @ApiProperty()
  @Column({ nullable: true })
  lecturerId: string;

  @ManyToOne(() => User, { nullable: true })
  lecturer: User;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  syllabus?: string; // file path

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
