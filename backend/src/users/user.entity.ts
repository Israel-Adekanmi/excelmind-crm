import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // not exposed in Swagger normally

  @ApiProperty({ enum: ['student', 'lecturer', 'admin'] })
  @Column({ default: 'student' })
  role: 'student' | 'lecturer' | 'admin';

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
