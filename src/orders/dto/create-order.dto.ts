import { OrderItemDto } from '../dto/order-item.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsUUID,
  IsString,
  Min,
  IsDate,
  IsBoolean,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  orderDate: Date;

  @IsNotEmpty()
  @IsUUID()
  customerId: string;

  @IsNotEmpty()
  @IsDate()
  shippingDate: Date;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsString()
  comments: string;

  @IsNumber()
  @Min(0)
  total: number;

  @IsBoolean()
  paid: boolean;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}
