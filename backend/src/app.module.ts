import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { ServicesModule } from './services/services.module';
import { ArticlesModule } from './articles/articles.module';
import { TeamModule } from './team/team.module';
import { FaqsModule } from './faqs/faqs.module';
import { SettingsModule } from './settings/settings.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100, // 100 requests per minute per IP
      },
    ]),
    PrismaModule,
    EmailModule,
    AuthModule,
    InquiriesModule,
    ConsultationsModule,
    ServicesModule,
    ArticlesModule,
    TeamModule,
    FaqsModule,
    SettingsModule,
    SubscribersModule,
    AuditLogsModule,
  ],
})
export class AppModule {}
