import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Team } from 'src/team/team/team.entity';
import * as sharp from 'sharp';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private playerRepository: Repository<Player>,
        @InjectRepository(Team)
        private teamRepository: Repository<Team>,
    ){}


public async getPlayerByID(playerID: string): Promise<Player> {
    try {
        const found_player = await this.playerRepository.findOneBy({playerID: playerID});
        if(!found_player) {
            throw new HttpException(
                'Player not found',
                HttpStatus.NOT_FOUND
            )
        }
        return found_player;
    } catch (error) {
        throw new HttpException(error.message, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
}   

public async getAllPlayers(teamID: string, size: number, page: number): Promise<{ players:Player[], pages:number}> {
    try {
        const found_team = await this.teamRepository.findOneBy({teamID: teamID});
        if(!found_team) {
            throw new HttpException(
                'Teams not found',
                HttpStatus.NOT_FOUND
            );
        }
        const all_players = await this.playerRepository.find({
            where: {
                team: {
                    teamID: teamID
                }
            }
        })
        if(!all_players){
            throw new HttpException(
                'Players not foun for the team',
                HttpStatus.NOT_FOUND
            )
        }
        const pages = Math.ceil(all_players.length / size);
        const players = all_players.slice(
          (page - 1) * size,
          page * size,
        );  
        return { players, pages };
    } catch (error) {
        throw new HttpException(error.message, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

public async createPlayer(createPlayerDto: CreatePlayerDto, inputBuffer: Buffer,
    outputQuality: number): Promise<boolean> {
    try {
        const team = await this.teamRepository.findOneBy({teamID: createPlayerDto.teamID})
        if(!team) {
            throw new HttpException(
                'This team does not exist',
                HttpStatus.NOT_FOUND,
              );
        }
        const compressedImageBuffer = await sharp(inputBuffer)
        .jpeg({ quality: outputQuality }) // Adjust quality as needed
        .toBuffer();
        const player_to_save = this.playerRepository.create({
            name: createPlayerDto.name,
            lastName: createPlayerDto.lastName,
            phone: createPlayerDto.phone,
            position:createPlayerDto.position,
            team: team,
            image: compressedImageBuffer.toString('base64'),
        })
        await this.playerRepository.save(player_to_save);
        return true;
    } catch (error) {
        throw new HttpException(error.message, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
        
    }

}

public async updatePlayer(playerID: string, updatePlayerDto: UpdatePlayerDto): Promise<boolean> {
    try {
        const found_player = await this.playerRepository.findOneBy({playerID: playerID});
        if(!found_player){
            throw new HttpException(
                'Player not found',
            HttpStatus.NOT_FOUND
        );
        }
        const player = await this.playerRepository.preload({
            playerID,
            ... updatePlayerDto,
        })
        this.playerRepository.save(player);
        return true;
    } catch (error) {
        throw new HttpException(error, error.status ? error.status : 500)
    }
}

public async updatePlayerImage(
    playerID: string, 
    inputBuffer: Buffer, 
    outputQuality: number
): Promise<boolean> {
    try {
        const found_player = await this.playerRepository.findOneBy({playerID: playerID});
        if(!found_player){
            throw new HttpException(
                'Player not found',
            HttpStatus.NOT_FOUND
        )
        }
        const compressedImageBuffer = await sharp(inputBuffer)
        .jpeg({ quality: outputQuality }) // Adjust quality as needed
        .toBuffer();

        found_player.image = compressedImageBuffer.toString('base64');
        this.playerRepository.save(found_player);
        return true;

    } catch (error) {
        throw new HttpException(error, error.status ? error.status : 500)
    }
}

public async deletePlayer(playerID: string): Promise<boolean> {
    try {
        const found_player = await this.playerRepository.findOneBy({playerID: playerID});
        if(!found_player){
            throw new HttpException(
                'Player not found',
            HttpStatus.NOT_FOUND
        )
        }
       const player_deleted = await this.playerRepository.delete(playerID);
       if(player_deleted.affected === 0){
        throw new HttpException(
            "Couldn't delete the player",
            HttpStatus.BAD_REQUEST,
          );
       }
       return true;
    } catch (error) {
        throw new HttpException(error, error.status ? error.status : 500)

    }
}
}
