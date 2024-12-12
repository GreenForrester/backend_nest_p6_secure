import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsUUID()
  productId?: string; //? for optional ID

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  productvendor: string;

  @IsString()
  productDescription: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantityInStock: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  buyPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  msrp: number;
}
