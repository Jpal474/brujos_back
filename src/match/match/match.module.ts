import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { MatchController } from './match.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Match])],
    controllers: [MatchController],
    // providers: [AdminService]
})
export class MatchModule {}