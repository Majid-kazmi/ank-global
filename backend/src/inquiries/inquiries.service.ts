import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { CreateInquiryDto, UpdateInquiryDto } from './inquiries.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InquiriesService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  private async verifyTurnstile(token?: string, ip?: string): Promise<boolean> {
    const secretKey = this.configService.get<string>('TURNSTILE_SECRET_KEY');
    if (!secretKey || !token) {
      // In dev or when secret not configured, allow pass-through
      return true;
    }

    try {
      const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
          remoteip: ip || '',
        }),
      });
      const data = await response.json();
      return !!data.success;
    } catch {
      return true;
    }
  }

  async create(dto: CreateInquiryDto, ip?: string, userAgent?: string) {
    const isValid = await this.verifyTurnstile(dto.turnstileToken, ip);
    if (!isValid) {
      throw new BadRequestException('Spam protection verification failed. Please try again.');
    }

    const inquiry = await this.prisma.inquiry.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        company: dto.company,
        serviceSlug: dto.serviceSlug,
        serviceName: dto.serviceName,
        message: dto.message,
        sourceUrl: dto.sourceUrl,
        ipAddress: ip,
        userAgent: userAgent,
      },
    });

    // Asynchronously dispatch notification
    this.emailService.sendInquiryNotification({
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      serviceName: inquiry.serviceName || undefined,
      message: inquiry.message,
    }).catch(console.error);

    return {
      success: true,
      message: 'Your inquiry has been successfully received. An ANK Global advisor will contact you shortly.',
      inquiryId: inquiry.id,
    };
  }

  async findAll(params: {
    status?: any;
    search?: string;
    page?: number;
    limit?: number;
  }) {
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
        { company: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.inquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.inquiry.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const inquiry = await this.prisma.inquiry.findUnique({ where: { id } });
    if (!inquiry) throw new BadRequestException('Inquiry not found');
    return inquiry;
  }

  async update(id: string, dto: UpdateInquiryDto) {
    return this.prisma.inquiry.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.inquiry.delete({ where: { id } });
  }
}
