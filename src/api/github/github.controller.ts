// github.controller.ts

import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GithubService } from '../../services/github/github.service';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBearerAuth,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GithubRepoDataDto } from './dto/github-repo-data.dto';

@ApiTags('GitHub')
@ApiBearerAuth()
@Controller('github')
@UseGuards(AuthGuard('jwt'))
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  /**
   * Fetch GitHub repository data by repository path (format: owner/repo).
   * @param repo - GitHub repository path like "facebook/react"
   * @returns Detailed repository data from GitHub API.
   */
  @Get()
  @ApiOperation({
    summary: 'Fetch GitHub repository data by repo path (e.g. facebook/react)',
  })
  @ApiQuery({
    name: 'repo',
    required: true,
    description: 'GitHub repo path in the format "owner/repo"',
    example: 'vercel/next.js',
  })
  @ApiResponse({
    status: 200,
    description: 'GitHub repository data retrieved successfully',
    type: GithubRepoDataDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid repository path format',
  })
  @ApiNotFoundResponse({
    description: 'Repository not found on GitHub',
  })
  getRepo(@Query('repo') repo: string): Promise<GithubRepoDataDto> {
    return this.githubService.fetchRepoData(repo);
  }
}
