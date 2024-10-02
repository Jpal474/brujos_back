import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team-dto';
import { Team } from './team.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateTeamDto } from './dto/update-team.dto';
import { UpdateStatsDto } from './dto/update-stats.dto';

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
    public async getAllTeams(
        @Param('size') size: number, 
        @Param('page') page: number, 
        @Param('id') id: string
    ): Promise <{teams: Team[], pages: number}>{
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
    @ApiConsumes('multipart/form-data')
    @ApiParam({name: 'id', description: 'id for the team to upload the image'})
    @ApiBody({
        schema:{
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }

    })    
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

    @Put('edit_team/:id')
    @ApiOperation({summary: "Edit team's data"})
    @ApiParam({name: 'id', description:'id for the team to edit the data'})
    @ApiBody({
        description: 'data for the team to update',
        type: UpdateTeamDto
    })
    @ApiResponse({ 
        status: 200,
        description: 'Team updated'
    })
    public async editTeamName(
        @Param('id') id: string, 
        @Body() updateTeamDto: UpdateTeamDto
    ): Promise<boolean> 
    {
        return this.teamService.updateName(updateTeamDto, id);
    }

    @Put('edit_stats/:id')
    @ApiOperation({summary: 'Edit team stats'})
    @ApiParam({ name: 'id',
                description: 'id for the team to edit the stats'
            })
    @ApiBody({
        description: 'stats to update for the team',
        type: UpdateStatsDto,
    })
    @ApiResponse({ 
        status: 200,
        description: 'Stats updated'
    })
    public async editTeamStats(
        @Param('id') id: string, 
        updateStatsDto: UpdateStatsDto): Promise<boolean> {
        return this.teamService.updateTeamStats(id, updateStatsDto)
    }
    

    @Delete('/:id')
    @ApiOperation({summary: 'Delete team by id'})
    @ApiParam({
        name:'id',
        description: 'id for the team to be deleted'
    })
    @ApiResponse({ 
        status: 200,
        description: 'Stats updated'
    })
    public async deleteTeam(@Param('id') id: string): Promise<boolean> {
        return this.teamService.deleteTeam(id);
    }
    
}
