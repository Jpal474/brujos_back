import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('player')
@ApiTags('Player')
export class PlayerController {
    constructor(
    private playerService: PlayerService
    ){}

    @Post('create_player')
    @ApiConsumes('multipart/form-data')
    @ApiOperation({
        summary: 'create player'
    })
    @ApiBody({
        description: 'player data to be created',
        type: CreatePlayerDto
    })
    @ApiResponse({
        status: 200,
        description: 'player created'
    })
    @UseInterceptors(FileInterceptor('file'))
    public async createPlayer(
        @UploadedFile() image: Express.Multer.File,
        @Body() createPlayerDto: CreatePlayerDto
    ): Promise<void> {
        
    }
}
