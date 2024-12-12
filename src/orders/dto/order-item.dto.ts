import { IsNotEmpty, IsNumber, IsUUID, IsString, Min } from 'class-validator';

export class OrderItemDto {
  @IsUUID()
  @IsNotEmpty()
  orderItemId: string;

  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number;
}
