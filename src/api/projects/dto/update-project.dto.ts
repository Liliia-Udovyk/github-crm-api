import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  owner?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsNumber()
  stars?: number;

  @IsOptional()
  @IsNumber()
  forks?: number;

  @IsOptional()
  @IsNumber()
  issues?: number;

  @IsOptional()
  @IsNumber()
  createdAt?: number;
}
