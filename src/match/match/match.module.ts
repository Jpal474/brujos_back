import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { Team } from 'src/team/team/team.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Match, Team])],
    controllers: [MatchController],
    providers: [MatchService],
    // providers: [AdminService]
})
export class MatchModule {}
