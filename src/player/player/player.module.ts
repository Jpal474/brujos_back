import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { Team } from 'src/team/team/team.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Player, Team])],
    controllers: [PlayerController],
    providers: [PlayerService],
    // providers: [AdminService]
})
export class PlayerModule {}
