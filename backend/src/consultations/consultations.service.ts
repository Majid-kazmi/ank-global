import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { CreateConsultationDto, UpdateConsultationDto } from './consultations.dto';
import { MeetingType } from '@prisma/client';

@Injectable()
export class ConsultationsService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async create(dto: CreateConsultationDto) {
    const parsedDate = new Date(dto.preferredDate);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid preferred date provided.');
    }

    const meetingType = dto.meetingType === 'IN_PERSON' ? MeetingType.IN_PERSON : MeetingType.VIRTUAL;

    const consultation = await this.prisma.consultation.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        company: dto.company,
        serviceSlug: dto.serviceSlug,
        serviceName: dto.serviceName,
        preferredDate: parsedDate,
        preferredTime: dto.preferredTime,
        meetingType: meetingType,
        notes: dto.notes,
      },
    });

    this.emailService.sendConsultationNotification({
      name: consultation.name,
      email: consultation.email,
      phone: consultation.phone,
      serviceName: consultation.serviceName,
      preferredDate: consultation.preferredDate.toISOString().split('T')[0],
      preferredTime: consultation.preferredTime,
      meetingType: consultation.meetingType,
    }).catch(console.error);

    return {
      success: true,
      message: 'Consultation appointment request successfully registered. Our team will verify and send meeting coordinates.',
      consultationId: consultation.id,
    };
  }

  async findAll(params: { status?: any; search?: string; page?: number; limit?: number }) {
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (params.status) {
      where.status = params.status;
    }
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { email: { contains: params.search, mode: 'insensitive' } },
        { phone: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.consultation.findMany({
        where,
        orderBy: { preferredDate: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.consultation.count({ where }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const consultation = await this.prisma.consultation.findUnique({ where: { id } });
    if (!consultation) throw new BadRequestException('Consultation not found');
    return consultation;
  }

  async update(id: string, dto: UpdateConsultationDto) {
    return this.prisma.consultation.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.consultation.delete({ where: { id } });
  }
}
