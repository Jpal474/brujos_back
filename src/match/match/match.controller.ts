import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTeamDto } from 'src/team/team/dto/create-team-dto';
import { CreateMatchDto } from './dto/create-match.dto';
import { MatchService } from './match.service';
import { Match } from './match.entity';

@Controller('match')
@ApiTags('Matches')
export class MatchController {

    constructor(
        private matchService: MatchService,
    ) {}

    @Get('get_match/:id')
    @ApiParam({
        name: 'id',
        description: 'id for the match to search'
    })
    @ApiResponse({
        status:200,
        description: 'team gotten'
    })
    public async getTeamByID(
        @Param('id') id:string
    ): Promise<Match> {
        return this.matchService.getMatchByID(id);
    }


    @Post('create_match')
    @ApiBody({
        description: 'data for the match to be created',
        type: CreateMatchDto
    })
    @ApiResponse({
        status: 201,
        description: 'match created'
    })
    public async createMatch(@Body() createMatchDto: CreateMatchDto)
    :Promise<boolean>
    {
        return this.matchService.createMatch(createMatchDto);
    }


}
