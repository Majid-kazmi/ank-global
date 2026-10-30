import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FaqsService {
  constructor(private prisma: PrismaService) {}

  async findAllPublic(category?: string) {
    const where: any = { isPublished: true };
    if (category) where.category = category;
    return this.prisma.fAQ.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findAllAdmin() {
    return this.prisma.fAQ.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  async create(data: any) {
    return this.prisma.fAQ.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.fAQ.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.fAQ.delete({ where: { id } });
  }
}
