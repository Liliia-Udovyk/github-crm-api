import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'facebook/react',
    description: 'GitHub repo path in "owner/repo" format',
  })
  @IsString()
  @Matches(/^[^/]+\/[^/]+$/, {
    message: 'Repo must be in the format "owner/repo"',
  })
  repo: string;
}
