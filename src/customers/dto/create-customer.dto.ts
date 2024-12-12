import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsPostalCode,
} from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsEmail()
  cemail: string;

  @IsNotEmpty()
  @IsPhoneNumber(null) // You can specify a region code if needed
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsPostalCode(null) // You can specify a locale if needed
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  country: string;
}
