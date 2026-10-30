import { IsString, IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateConsultationDto {
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
  @IsNotEmpty()
  serviceSlug: string;

  @IsString()
  @IsNotEmpty()
  serviceName: string;

  @IsString()
  @IsNotEmpty()
  preferredDate: string; // ISO date string

  @IsString()
  @IsNotEmpty()
  preferredTime: string; // e.g. "10:00 AM - 11:00 AM"

  @IsString()
  @IsOptional()
  meetingType?: string; // VIRTUAL or IN_PERSON

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateConsultationDto {
  @IsString()
  @IsOptional()
  status?: any;

  @IsString()
  @IsOptional()
  meetingLink?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
