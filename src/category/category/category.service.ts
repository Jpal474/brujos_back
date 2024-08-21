import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ){}

    public async createCategory(body: CreateCategoryDTO): Promise<boolean> {
        try {            
            const category = this.categoryRepository.create(body);
            await this.categoryRepository.save(category);
            return true;
        } catch (error) {
            console.log(error);
            
            throw new HttpException(error, error.status ? error.status : 500);
        }
    }
}
