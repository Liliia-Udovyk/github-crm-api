// github.service.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

/**
 * Interface describing the shape of GitHub repository data
 * fetched from GitHub API.
 */
export interface GithubRepoData {
  name: string;
  owner: {
    login: string;
  };
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
}

@Injectable()
export class GithubService {
  private readonly BASE_URL = 'https://api.github.com/repos';

  /**
   * Fetch repository data from GitHub API by repo path.
   * @param repoPath - Repository path in "owner/repo" format.
   * @throws BadRequestException if repoPath format is invalid.
   * @throws NotFoundException if repository is not found on GitHub.
   * @returns Promise resolving to repository data.
   */
  async fetchRepoData(repoPath: string): Promise<GithubRepoData> {
    const parts = repoPath.split('/');
    if (parts.length !== 2 || !parts[0].trim() || !parts[1].trim()) {
      throw new BadRequestException(
        'Invalid repository path. Expected format: owner/repo',
      );
    }
    const [owner, repo] = parts;

    try {
      const response: AxiosResponse<GithubRepoData> = await axios.get(
        `${this.BASE_URL}/${owner}/${repo}`,
      );
      return response.data;
    } catch (error) {
      throw new NotFoundException('Repository not found on GitHub');
    }
  }
}
