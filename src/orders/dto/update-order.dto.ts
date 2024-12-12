import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

// PartialType: The PartialType utility from NestJS automatically
// creates a new DTO where all properties of the provided DTO (CreateOrderDto in this case) become optional.

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
