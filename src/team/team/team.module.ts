import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { Category } from 'src/category/category/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Team, Category])],
    controllers: [TeamController],
    providers: [TeamService],
    // providers: [AdminService]
})
export class TeamModule {}
