import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscribersService {
  constructor(private prisma: PrismaService) {}

  async subscribe(email: string, source: string = 'website_footer') {
    if (!email || !email.includes('@')) {
      throw new BadRequestException('Please provide a valid email address.');
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await this.prisma.subscriber.findUnique({ where: { email: cleanEmail } });
    if (existing) {
      if (!existing.isActive) {
        return this.prisma.subscriber.update({
          where: { id: existing.id },
          data: { isActive: true },
        });
      }
      return { success: true, message: 'You are already subscribed to ANK Global updates.' };
    }

    await this.prisma.subscriber.create({
      data: {
        email: cleanEmail,
        source,
      },
    });

    return {
      success: true,
      message: 'Thank you for subscribing to ANK Global tax & regulatory insights.',
    };
  }

  async findAll() {
    return this.prisma.subscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
