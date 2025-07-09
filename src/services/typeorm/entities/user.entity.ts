import { Column, Entity, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Project } from './project.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Unique email address of the user',
  })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ApiProperty({
    type: () => [Project],
    description: 'List of GitHub projects associated with this user',
  })
  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}
