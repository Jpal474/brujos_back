import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTeamDto } from 'src/team/team/dto/create-team-dto';
import { CreateMatchDto } from './dto/create-match.dto';
import { MatchService } from './match.service';
import { Match } from './match.entity';
import { UpdateMatchDto } from './dto/update-match.dto';
import { updateScoreAndStatusDto } from './dto/update-score-status.dto';
import { updateScoreDto } from './dto/update-score.dto';

@Controller('match')
@ApiTags('Matches')
export class MatchController {

    constructor(
        private matchService: MatchService,
    ) {}

    @Get('get_matches/:id/:size/:page')
    @ApiParam({
        name: 'id',
        description: "id for the team to search it's matches"
    })
    @ApiParam({
        name: 'size',
        description: 'number of registers to show'
    })
    @ApiParam({
        name:'page',
        description: 'number of page to show'
    })
    @ApiResponse({
        status:200,
        description: 'matches of the team listed'
    })
    public async getMatchesByTeamID(
        @Param('id') id:string,
        @Param('size') size: number,
        @Param('page') page: number,
    ): Promise<{matches:Match[], pages: number}> {
        return this.matchService.getAllMatchesByTeamID(id, size, page);
    }

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

    @Put('edit_match/:id')
    @ApiParam({
        name:'id',
        description: 'id for the match to update'
    })
    @ApiBody({
        description: 'data for the match to update',
        type: UpdateMatchDto,
    })
    @ApiResponse({
        status:200,
        description: 'match updated',
    })
    public async updateMatchData(
      @Param('id') id: string,
      @Body() updateMatchDto: UpdateMatchDto
    ): Promise<boolean>
    {
        return this.matchService.updateMatchData(id, updateMatchDto);
    }

    @Put('edit_score_and_status/:id')
    @ApiParam({
        name: 'id',
        description: 'id of the match to update the score and the status'
    })
    @ApiBody({
        description: 'score and status of the match',
        type: updateScoreAndStatusDto
    })
    @ApiResponse({
        status: 200,
        description: 'match updated'
    })
    public async updateScoreAndStatus(
        @Param('id') id: string,
        @Body() updateScoreAndStatusDto: updateScoreAndStatusDto
    ): Promise<boolean> {
        return this.matchService.updateMatchScoreAndStatus(id, updateScoreAndStatusDto);
    }

    @Put('edit_score/:id')
    @ApiParam({
        name: 'id',
        description: 'id of the match to update de score',
    })
    @ApiBody({
        description: 'data of the match to update the score',
        type: updateScoreDto
    })
    @ApiResponse({
        status:200,
        description: 'match updated'
    })
    public async updateScore(
        id: string,
        updateScoreDto: updateScoreDto
    ): Promise<boolean> {
        return this.matchService.updateMatchScore(id, updateScoreDto);
    }




}
