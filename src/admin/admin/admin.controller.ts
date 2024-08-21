import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminService } from './admin.service';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {

    constructor(private adminService: AdminService) {}


@Patch('update_admin/:id')
@ApiOperation({ summary: 'Update admin data'})
@ApiParam({ name: 'id', description: "admin's id"})
@ApiBody({description: 'Admin data', type: UpdateAdminDto})
@ApiResponse({
    status: 200,
    description: 'Admin succesfully updated',
    type: Boolean,
  })
async updateAdmin(@Param('id') id: string, @Body() updateAdminDTO: UpdateAdminDto): Promise<boolean> {
 return this.adminService.updateAdminData(id, updateAdminDTO);
}

@Delete('delete/:id')
@ApiOperation({ summary: 'Delete admin'})
@ApiParam({ name: 'id', description: "admin's id"})
@ApiResponse({
    status: 200,
    description: 'Admin succesfully deleted',
    type: Boolean,
})
async deleteAdmin(@Param('id') id: string): Promise<boolean>{
    return this.adminService.deleteAdmin(id);
}
}
