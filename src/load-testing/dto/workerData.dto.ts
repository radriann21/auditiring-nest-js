import { IsUrl, IsInt, Min, Max, IsOptional, IsString } from 'class-validator';

export class RunLoadTestDto {
  @IsUrl({}, { message: 'URL inválida para la auditoría' })
  url: string;

  @IsInt()
  @Min(1)
  @Max(250)
  @IsOptional()
  connections?: number = 10;

  @IsInt()
  @Min(1)
  @Max(60)
  @IsOptional()
  duration?: number = 5;

  @IsString()
  @IsOptional()
  method?: string = 'GET';
}
