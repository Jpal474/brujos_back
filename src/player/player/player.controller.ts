import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './player.entity';

@Controller('player')
@ApiTags('Player')
export class PlayerController {
    constructor(
    private playerService: PlayerService
    ){}

    @Get('get_player/:id')
    @ApiOperation({
        summary: 'get player by id'
    })
    @ApiParam({
        name: 'id',
        description: 'id for the player to search',
    })
    @ApiResponse({
        status: 200,
        description: 'Player gotten succesfully',
        type: Player,
    })
    public async getPlayerByID(@Param('id') id: string): Promise<Player> {
        return this.playerService.getPlayerByID(id);
    }

    @Get('get_all_players/:id')
    @ApiOperation({
        summary: 'list all the players'
    })
    @ApiParam({
        name: 'id',
        description: 'id for the team to bring the players',
    })
    @ApiResponse({
        status: 200,
        description: 'all players listed',
        type: Player,
        isArray: true,
    })
    public async get_all_players(@Param('id') id: string){
        return this.playerService.getAllPlayers(id);
    } 


    @Post('create_player')
    @ApiConsumes('multipart/form-data')
    @ApiOperation({
        summary: 'create player'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string'},
                lastName: { type: 'string'},
                phone: { type: 'string'},
                teamID: { type: 'string'},
                position: { type: 'string'},
                image : {
                    type: 'string',
                    format: 'binary',
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'player created'
    })
    @UseInterceptors(FileInterceptor('image'))
    public async createPlayer(
        @UploadedFile() image: Express.Multer.File,
        @Body() createPlayerDto: CreatePlayerDto
    ): Promise<boolean> {
        return this.playerService.createPlayer(createPlayerDto, image.buffer, 100)
        
    }

    @Put('edit_player/:id')
    @ApiOperation({
        summary: 'edit the player data'
    })
    @ApiParam({
        description: 'id of the player to be updated',
        name: 'id'
    })
    @ApiBody({
        description: 'Data to update for the player',
        type: UpdatePlayerDto
    })
    @ApiResponse({
        status: 200,
        description: 'player data updated'
    })
    public async updatePlayer(
        @Param('id') id: string,
        @Body() updatePlayerDto: UpdatePlayerDto
    ): Promise<boolean> {
        return this.playerService.updatePlayer(id, updatePlayerDto);
    }

    @Put('change_player_picture/:id')
    @ApiParam({
        name: 'id',
        description: 'id of the player to change the image'
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    @ApiResponse({
        status:200,
        description:'player image updated'
    })
    @UseInterceptors(FileInterceptor('image'))
    public async updatePlayerImage(
        @Param('id') id:string,
        @UploadedFile() image: Express.Multer.File,
    ): Promise<boolean>
    {
        return this.playerService.updatePlayerImage(id, image.buffer, 100)
    }

    @Delete('delete_player/:id')
    @ApiParam({
        name: 'id',
        description: 'id for the player to delete'
    })
    @ApiResponse({
        status: 200,
        description: 'player deleted'
    })
    public async deletePlayer(@Param('id') id:string): Promise<boolean>
    {
        return this.playerService.deletePlayer(id);
    }


}
