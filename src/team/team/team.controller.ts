import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team-dto';
import { Team } from './team.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('team')
@ApiTags('Team')
export class TeamController {
    constructor(
        private teamService: TeamService,
    ){}
    
    @Get('get_all_teams/:size/:page/:id')
    @ApiOperation({ summary: 'Get all teams'})
    @ApiParam({ name: 'size', description: 'number of registers to show'})
    @ApiParam({ name: 'page', description: 'number of page to show'})
    @ApiParam({ name: 'id', description:'id of category'})
    @ApiResponse({
        status: 200,
        description: 'All teams listed by category.',
    })
    public async getAllTeams(@Param('size') size: number, @Param('page') page: number, @Param('id') id: string): Promise <{teams: Team[], pages: number}>{
        return this.teamService.getAllTeamsByCategory(size, page, id);
    } 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    @Post('create_team')
    @ApiOperation({ summary: 'Create Team'})
    @ApiBody({
        description: 'Data for the team to be registered',
        type: CreateTeamDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Team created',
    })
    public async createTeam(
        @Body() creatTeamDto: CreateTeamDto,
        
    ): Promise<boolean> {
        return this.teamService.createTeam(creatTeamDto);
    }
    
    @Post('uploadImage/:id')
    @ApiOperation({summary: 'Upload logo for the team'})
    @ApiParam({name: 'id', description: 'id for the team to upload the image'})
    @ApiResponse({ 
        status: 200,
        description: 'Image uploaded'
    })
    @UseInterceptors(FileInterceptor('file'))
    public async uploadImage(
        @Param('id') id: string,
        @UploadedFile() image: Express.Multer.File,

    ): Promise<boolean> {
        return this.teamService.uploadImage(image.buffer,100,id,);
    }
}
