import { Controller, Post, Get, Body, Param, Patch, UseGuards, Request, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/courses/cloudinary.service';
import { CreateAssignmentQuestionDto, GradeAssignmentDto, SubmitAssignmentDto } from './dto/assignment.dto';
import { RoleGuard, Roles } from 'src/auth/guards/role.guard';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/auth/enum/role.enum';

@ApiTags('Assignments')
@Controller('assignments')
@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
export class AssignmentsController {
  constructor(
    private readonly assignmentsService: AssignmentsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('/questions')
  @Roles(Role.LECTURER)
  @ApiOperation({ description: 'Lecturer creates an assignment (file optional)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async createQuestion(
    @Body() dto: CreateAssignmentQuestionDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
  ) {
    let fileUrl: string | undefined;
    if (file) {
      fileUrl = await this.cloudinaryService.uploadFile(file);
    }
    const lecturerId = req.user.userId;
    return this.assignmentsService.createQuestion(dto, lecturerId, fileUrl);
  }

  @Get('/questions/:courseId')
  @Roles(Role.STUDENT, Role.LECTURER)
  @ApiOperation({ description: 'Get all assignments for a course' })
  getQuestionsByCourse(@Param('courseId') courseId: string) {
    return this.assignmentsService.getQuestionsByCourse(courseId);
  }

  @Post('/submissions')
  @Roles(Role.STUDENT)
  @ApiOperation({ description: 'Student submits an assignment (file or text)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async submit(
    @Body() dto: SubmitAssignmentDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
  ) {
    let fileUrl: string | undefined;
    if (file) {
      fileUrl = await this.cloudinaryService.uploadFile(file);
    }
    const studentId = req.user.userId;
    return this.assignmentsService.submit(dto, studentId, fileUrl);
  }

  @Get('/submissions/:questionId')
  @Roles(Role.LECTURER)
  @ApiOperation({ description: 'Lecturer fetches all submissions for an assignment question' })
  getSubmissionsByQuestion(@Param('questionId') questionId: string) {
    return this.assignmentsService.getSubmissionsByQuestion(questionId);
  }

  @Patch('/submissions/:id/grade')
  @Roles(Role.LECTURER)
  @ApiOperation({ description: 'Lecturer grades a submission' })
  gradeSubmission(@Param('id') id: string, @Body() dto: GradeAssignmentDto) {
    return this.assignmentsService.gradeSubmission(id, dto);
  }
}
