import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto } from './dto/create-course.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard, Roles } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/enum/role.enum';
import { CoursesService } from './courses.service';
import { CloudinaryService } from './cloudinary.service';
import { CreateEnrollmentDto, UpdateEnrollmentDto } from './dto/enrollment.dto';

@ApiTags('Courses')
@Controller('courses')
@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('/create')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.LECTURER) // restrict strictly to lecturers
  @ApiOperation({ description: 'Create a course (lecturer only)' })
  create(@Body() dto: CreateCourseDto, @Request() req: any) {
    const lecturerId = req.user.sub; // userId from JWT payload
    return this.coursesService.create(dto, lecturerId);
  }

  @Get('/all')
  @ApiOperation({ description: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'List courses' })
  findAll() {
    return this.coursesService.findAll();
  }

  @Patch('/:id')
  @Roles(Role.LECTURER, Role.ADMIN)
  @ApiOperation({ description: 'Update course details' })
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.coursesService.update(id, dto);
  }

  @Patch('/:id/upload-syllabus')
  @Roles(Role.LECTURER)
  @ApiOperation({ description: 'Upload syllabus (PDF or DOCX, max 5MB)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype === 'application/pdf' ||
          file.mimetype ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException('Only PDF and DOCX files are allowed!'),
            false,
          );
        }
      },
    }),
  )
  async uploadSyllabus(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded or invalid file type.');
    }

    const uploadedUrl = await this.cloudinaryService.uploadFile(file);
    return this.coursesService.uploadSyllabus(id, uploadedUrl);
  }

  @Get('/all-lecturer-courses')
  @ApiOperation({ description: 'Get all courses by a lecturer' })
  @ApiResponse({ status: 200, description: 'Courses by lecturer' })
  findByLecturer(@Request() req: any) {
    const lecturerId = req.user.sub;
    return this.coursesService.findByLecturer(lecturerId);
  }

  @Get('/:id')
  @ApiOperation({ description: 'Get course by ID' })
  @ApiResponse({ status: 200, description: 'Course by ID' })
  findById(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @Post('/enroll')
  @Roles(Role.STUDENT)
  @ApiOperation({ description: 'Student requests enrollment into a course' })
  requestEnrollment(@Body() dto: CreateEnrollmentDto, @Request() req: any) {
    return this.coursesService.requestEnrollment(dto, req.user.userId);
  }

  @Get('/enrollments')
  @Roles(Role.ADMIN, Role.LECTURER)
  @ApiOperation({
    description: 'Get all enrollment requests (Admin/Lecturer only)',
  })
  getAllEnrollments() {
    return this.coursesService.getAllEnrollments();
  }

  @Patch('/:id/status')
  @Roles(Role.LECTURER, Role.ADMIN)
  @ApiOperation({ description: 'Approve or reject enrollment request' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateEnrollmentDto) {
    return this.coursesService.updateStatus(id, dto);
  }

  @Get('/student')
  @Roles(Role.STUDENT)
  @ApiOperation({ description: 'Get all courses a student is enrolled in' })
  getByStudent(@Request() req: any) {
    const studentId = req.user.sub;
    return this.coursesService.getByStudent(studentId);
  }

  @Get('/student-enrolled/:courseId')
  @Roles(Role.LECTURER, Role.ADMIN)
  @ApiOperation({ description: 'Get all students enrolled in a course' })
  getByCourse(@Param('courseId') courseId: string) {
    return this.coursesService.getByCourse(courseId);
  }
}
