import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryController } from './category.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    // providers: [AdminService]
})
export class CategoryModule {}
