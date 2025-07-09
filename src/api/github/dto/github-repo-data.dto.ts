import { ApiProperty } from '@nestjs/swagger';

export class OwnerDto {
  @ApiProperty({ example: 'facebook' })
  login: string;
}

export class GithubRepoDataDto {
  @ApiProperty({ example: 'react' })
  name: string;

  @ApiProperty({ type: () => OwnerDto })
  owner: OwnerDto;

  @ApiProperty({ example: 'https://github.com/facebook/react' })
  html_url: string;

  @ApiProperty({ example: 200000 })
  stargazers_count: number;

  @ApiProperty({ example: 35000 })
  forks_count: number;

  @ApiProperty({ example: 100 })
  open_issues_count: number;

  @ApiProperty({ example: '2013-05-24T16:15:54Z' })
  created_at: string;
}
