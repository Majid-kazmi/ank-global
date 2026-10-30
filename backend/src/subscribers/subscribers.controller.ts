import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post()
  async subscribe(@Body('email') email: string, @Body('source') source?: string) {
    return this.subscribersService.subscribe(email, source);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.subscribersService.findAll();
  }
}
