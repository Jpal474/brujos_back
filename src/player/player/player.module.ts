import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { PlayerController } from './player.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Player])],
    controllers: [PlayerController],
    // providers: [AdminService]
})
export class PlayerModule {}
