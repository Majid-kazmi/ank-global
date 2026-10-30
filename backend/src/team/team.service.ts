import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findAllAdmin() {
    return this.prisma.teamMember.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  async create(data: any) {
    return this.prisma.teamMember.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.teamMember.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.teamMember.delete({ where: { id } });
  }
}
