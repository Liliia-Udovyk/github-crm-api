import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '@nestjs/passport';
import { Project } from 'src/services/typeorm/entities/project.entity';

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Add GitHub repository by path (e.g. owner/repo)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        repo: {
          type: 'string',
          example: 'facebook/react',
        },
      },
      required: ['repo'],
    },
  })
  @ApiResponse({ status: 201, description: 'Repository added', type: Project })
  @ApiBadRequestResponse({
    description: 'Repository already exists or invalid',
  })
  add(@Body('repo') repo: string, @Request() req) {
    return this.projectsService.addProject(repo, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'List all user repositories' })
  @ApiResponse({
    status: 200,
    description: 'List of user repositories',
    type: [Project],
  })
  getAll(@Request() req) {
    return this.projectsService.getAll(req.user.userId);
  }

  @Post(':id/sync')
  @ApiOperation({ summary: 'Sync repository stats with GitHub' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'Project ID' })
  @ApiResponse({ status: 200, description: 'Repository synced', type: Project })
  @ApiNotFoundResponse({ description: 'Repository not found' })
  syncProject(@Param('id') id: string) {
    return this.projectsService.syncWithGithub(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete repository by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'Project ID' })
  @ApiResponse({ status: 200, description: 'Project deleted' })
  @ApiNotFoundResponse({ description: 'Project not found' })
  remove(@Param('id') id: number) {
    return this.projectsService.remove(id);
  }
}
