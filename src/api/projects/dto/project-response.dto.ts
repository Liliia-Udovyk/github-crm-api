import { ApiProperty } from '@nestjs/swagger';

export class ProjectResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'vercel' })
  owner: string;

  @ApiProperty({ example: 'next.js' })
  name: string;

  @ApiProperty({ example: 'https://github.com/vercel/next.js' })
  url: string;

  @ApiProperty({ example: 120000 })
  stars: number;

  @ApiProperty({ example: 25000 })
  forks: number;

  @ApiProperty({ example: 321 })
  issues: number;

  @ApiProperty({
    example: 1585699200000,
    description: 'GitHub createdAt in UTC timestamp',
  })
  githubCreatedAt: number;

  @ApiProperty({
    example: '2024-07-09T14:00:00.000Z',
    description: 'Record created at (ISO)',
  })
  createdAt: string;

  @ApiProperty({
    example: '2024-07-09T14:00:00.000Z',
    description: 'Record updated at (ISO)',
  })
  updatedAt: string;
}
