import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './admin/admin/admin.controller';
import { PlayerController } from './player/player/player.controller';
import { CategoryController } from './category/category/category.controller';
import { InfoController } from './info/info/info.controller';
import { MatchController } from './match/match/match.controller';
import { TeamController } from './team/team/team.controller';
import { AdminService } from './admin/admin/admin.service';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { AdminModule } from './admin/admin/admin.module';
import { CategoryModule } from './category/category/category.module';
import { InfoModule } from './info/info/info.module';
import { MatchModule } from './match/match/match.module';
import { PlayerModule } from './player/player/player.module';
import { TeamModule } from './team/team/team.module';

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
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
