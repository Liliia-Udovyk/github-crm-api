import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';

import { UsersService } from '../users/users.service';
import { Project } from 'src/services/typeorm/entities/project.entity';
import { GithubService } from '../../services/github/github.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private usersService: UsersService,
    private githubService: GithubService,
  ) {}

  /**
   * Adds a new project to the database for a user by fetching GitHub repo data.
   *
   * @param repoPath - The GitHub repository path in the format "owner/repo".
   * @param userId - The ID of the user adding the project.
   * @throws BadRequestException if the project already exists for this user.
   * @returns The saved Project entity.
   */
  async addProject(repoPath: string, userId: number): Promise<Project> {
    const user = await this.usersService.findById(userId);
    const data = await this.githubService.fetchRepoData(repoPath);

    const owner = data.owner.login;
    const name = data.name;

    const existing = await this.projectsRepository.findOne({
      where: {
        owner,
        name,
        user: { id: userId },
      },
      relations: ['user'],
    });

    if (existing) {
      throw new BadRequestException(
        `Project "${owner}/${name}" already exists.`,
      );
    }

    const project = this.projectsRepository.create({
      owner,
      name,
      url: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
      githubCreatedAt: new Date(data.created_at).getTime(),
      user,
    });

    return this.projectsRepository.save(project);
  }

  /**
   * Retrieves all projects belonging to a user.
   *
   * @param userId - The ID of the user whose projects are fetched.
   * @returns An array of Project entities ordered by creation date descending.
   */
  async getAll(userId: number): Promise<Project[]> {
    return this.projectsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Synchronizes a project's stats (stars, forks, issues) with the latest GitHub data.
   *
   * @param id - The project ID.
   * @throws NotFoundException if the project does not exist.
   * @returns The updated Project entity.
   */
  async syncWithGithub(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const githubApiUrl = `https://api.github.com/repos/${project.owner}/${project.name}`;
    const response = await axios.get(githubApiUrl);
    const data = response.data;

    const updatedFields = {
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
    };

    const isChanged =
      project.stars !== updatedFields.stars ||
      project.forks !== updatedFields.forks ||
      project.issues !== updatedFields.issues;

    if (!isChanged) {
      return project;
    }

    project.stars = updatedFields.stars;
    project.forks = updatedFields.forks;
    project.issues = updatedFields.issues;

    return this.projectsRepository.save(project);
  }

  /**
   * Deletes a project by its ID.
   *
   * @param id - The project ID to delete.
   * @throws NotFoundException if the project does not exist.
   */
  async remove(id: number): Promise<void> {
    const result = await this.projectsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Project not found');
    }
  }
}
