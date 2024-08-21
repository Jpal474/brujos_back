import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CategoryService } from './category.service';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService,
    ){}
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
}
