import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { query } from 'express';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ){}

    public async getAllCategories(pageSize: number, pageNumber: number): Promise<{categories: Category[], pages: number}> {
        try{
        const query = await this.categoryRepository.createQueryBuilder('categories');
        const all_categories = await query.getMany();
        if(!all_categories){
            throw new HttpException(
                'This category does not exist',
                HttpStatus.NOT_FOUND,
              );
        }        
      const pages = Math.ceil(all_categories.length / pageSize);
      const categories = all_categories.slice(
        (pageNumber - 1) * pageSize,
        pageNumber * pageSize,
      );      
      return { categories, pages };
    }
    catch(error) {
        throw new HttpException(error, error.status ? error.status : 500);
    }

    }

    public async createCategory(body: CreateCategoryDTO): Promise<boolean> {
        try {            
            const category = this.categoryRepository.create(body);
            await this.categoryRepository.save(category);
            return true;
        } catch (error) {            
            throw new HttpException(error, error.status ? error.status : 500);
        }
    }

    public async deleteCategory(id: string): Promise<true> {
        try{
        const result = await this.categoryRepository.delete(id); //finds the category by id and deletes the register
        if (result.affected === 0) {
            throw new HttpException(
                'This category does not exist',
                HttpStatus.NOT_FOUND,
              );
        }
        return true;
        }
    catch(error) {
        throw new HttpException(error, error.status ? error.status : 500);
    }

    }
}
