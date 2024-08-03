import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {

    constructor(private adminService: AdminService) {}


@ApiOperation({ summary: 'Create admin for the page'})
@ApiBody({description: 'Admin data', type: CreateAdminDto})
@ApiResponse({
    status: 200,
    description: 'Admin succesfully created',
    type: Boolean,
    isArray: false,
  })
@Post('create_admin')
createAdministrator(@Body() body: CreateAdminDto): Promise<boolean> {
    return this.adminService.createAdministrator(body);
}
}
