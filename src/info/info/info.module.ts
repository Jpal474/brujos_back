import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Information } from './info.entity';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';

@Module({
    imports: [TypeOrmModule.forFeature([Information])],
    controllers: [InfoController],
    providers: [InfoService],
    // providers: [AdminService]
})
export class InfoModule {}
