import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

// PaginationQueryDto FROM ADDING PAGINATION
export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}
