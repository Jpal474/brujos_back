import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Team } from 'src/team/team/team.entity';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private playerRepository: Repository<Player>,
        @InjectRepository(Team)
        private teamRepository: Repository<Team>,
    ){}

public async createPlayer(teamID: string, createPlayerDto: CreatePlayerDto): Promise<boolean> {
    try {
        const team = await this.teamRepository.findOneBy({teamID: teamID})
        if(!team) {
            throw new HttpException(
                'This team does not exist',
                HttpStatus.NOT_FOUND,
              );
        }
        const player_to_save = this.playerRepository.create({
            name: createPlayerDto.name,
            lastName: createPlayerDto.lastName,
            phone: createPlayerDto.phone,
            position:createPlayerDto.position,
            team: team,
            image: createPlayerDto.image
        })
        await this.playerRepository.save(player_to_save);
        return true;
    } catch (error) {
        throw new HttpException(error.message, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
        
    }
}
}
