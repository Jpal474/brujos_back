import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { AdminModule } from './admin/admin/admin.module';
import { CategoryModule } from './category/category/category.module';
import { InfoModule } from './info/info/info.module';
import { MatchModule } from './match/match/match.module';
import { PlayerModule } from './player/player/player.module';
import { TeamModule } from './team/team/team.module';
import { AuthModule } from './auth/auth/auth.module';
import { MailService } from './mail/mail/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    AdminModule,
    CategoryModule,
    InfoModule,
    MatchModule,
    PlayerModule,
    TeamModule,
    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
