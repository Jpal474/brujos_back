import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InfoDto } from './dto/create-info.dto';
import { InfoService } from './info.service';

@Controller('info')
@ApiTags('Information')
export class InfoController {
 constructor(private infoService: InfoService) {}


@Post('create_info')
@ApiOperation({
    summary: 'create info'
})
@ApiBody({
    description: 'data for crearing history, vision and mision',
    type: InfoDto
})
@ApiResponse({
    status:200,
    description: 'Info created successfully'
})
public async createInfo(
    @Body() createInfoDto: InfoDto
): Promise<boolean> {
    return this.infoService.createInfo(createInfoDto);
}

@Put('update_info/:id')
@ApiOperation({
    summary: 'update info'
})
@ApiBody({
    description: 'Info to update',
    type: InfoDto,
})
@ApiParam({
    name: 'id',
    description: 'id of the info'
})
@ApiResponse({
    status:200,
    description:'Info updated'

})
public async updateInfo(
    @Body() infoBody: InfoDto,
    @Param('id') id: string,
): Promise<boolean> {
    return this.infoService.updateInfo(id, infoBody);
}

}
