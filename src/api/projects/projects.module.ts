import { Module } from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { GithubModule } from '../github/github.module';
import { Project } from 'src/services/typeorm/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), UsersModule, GithubModule],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
