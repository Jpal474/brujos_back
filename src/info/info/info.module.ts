import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Information } from './info.entity';
import { InfoController } from './info.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Information])],
    controllers: [InfoController],
    // providers: [AdminService]
})
export class InfoModule {}
