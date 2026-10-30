import { IsString, IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateInquiryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  phone: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  company?: string;

  @IsString()
  @IsOptional()
  serviceSlug?: string;

  @IsString()
  @IsOptional()
  serviceName?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(3000)
  message: string;

  @IsString()
  @IsOptional()
  turnstileToken?: string;

  @IsString()
  @IsOptional()
  sourceUrl?: string;
}

export class UpdateInquiryDto {
  @IsString()
  @IsOptional()
  status?: any;

  @IsString()
  @IsOptional()
  internalNotes?: string;
}
