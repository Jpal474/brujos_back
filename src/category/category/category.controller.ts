import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService,
    ){}

    @Get('get_all_categories/:size/:page')
    @ApiOperation({ summary: 'Get all categories'})
    @ApiResponse({
        status:200,
        description: 'All categories listed',
        type: Category,
        isArray: true,
    })
    @ApiParam({name: 'size', description: 'number of registers to return'})
    @ApiParam({name: 'page', description: 'number of page to show'})
    async getAllCategories(@Param('size') size: number, @Param('page') page: number): Promise<{ categories : Category[], pages: number}> {
        return this.categoryService.getAllCategories(size, page);
    }


    @Post('create_category')
    @ApiOperation({ summary: 'Create category'})
    @ApiResponse({
        status: 200,
        description: 'Category created succesfully',
        type: Boolean
    })
    @ApiBody({
        description: 'Data for register a category',
        type: CreateCategoryDTO,
    })
    async createCategory(@Body() createCategory: CreateCategoryDTO): Promise<boolean> {
        return this.categoryService.createCategory(createCategory);
    }

    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete category'})
    @ApiParam({ name: 'id', description: 'id for the category to delete'})
    @ApiResponse({
        status: 200,
        description: 'Category deleted',
        type: Boolean
    })
    async deleteCategory(@Param('id') id: string): Promise<boolean> {
        return this.categoryService.deleteCategory(id);
    }
}
