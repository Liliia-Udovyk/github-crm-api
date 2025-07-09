import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Project extends BaseEntity {
  @ApiProperty({
    example: 'facebook',
    description: 'GitHub organization or user who owns the repository',
  })
  @Column()
  owner: string;

  @ApiProperty({
    example: 'react',
    description: 'Name of the GitHub repository',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'https://github.com/facebook/react',
    description: 'Full URL to the GitHub repository',
  })
  @Column()
  url: string;

  @ApiProperty({
    example: 210000,
    description: 'Number of stars the repository has on GitHub',
  })
  @Column({ type: 'int' })
  stars: number;

  @ApiProperty({
    example: 44000,
    description: 'Number of forks the repository has on GitHub',
  })
  @Column({ type: 'int' })
  forks: number;

  @ApiProperty({
    example: 1200,
    description: 'Number of open issues on the repository',
  })
  @Column({ type: 'int' })
  issues: number;

  @ApiProperty({
    example: 1589395200000,
    description:
      'Unix timestamp (UTC) when the repository was originally created on GitHub',
  })
  @Column({ type: 'bigint' })
  githubCreatedAt: number;

  @ApiProperty({
    description: 'User who added the project',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
  user: User;
}
