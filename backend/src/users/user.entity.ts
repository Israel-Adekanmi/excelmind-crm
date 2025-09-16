import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

   @Column({ default: 'Unknown' })
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // not exposed in Swagger normally

  @ApiProperty({ enum: ['student', 'lecturer', 'admin'] })
  @Column({ default: 'student' })
  role: 'student' | 'lecturer' | 'admin';

  // ---- Student-specific fields ----
  @Column({ nullable: true })
  department?: string;

  @Column({ nullable: true })
  faculty?: string;

  @Column({ nullable: true })
  level?: string;

  @Column({ nullable: true, unique: true })
  matricNo?: string;

  // ---- Lecturer-specific fields ----
  @Column({ nullable: true })
  position?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
