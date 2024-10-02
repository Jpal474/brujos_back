import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { Repository } from 'typeorm';
import { Team } from 'src/team/team/team.entity';
import { CreateMatchDto } from './dto/create-match.dto';

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private matchRepository: Repository<Match>, 
        @InjectRepository(Team)
        private teamRespository: Repository<Team>,
    ) {}

    public async getMatchByID(matchID: string): 
    Promise<Match> {
        try {
            const found_match = this.matchRepository.findOneBy({
                matchID: matchID
            });

            if(!found_match) {
                throw new HttpException(
                    'The match does not exist',
                    HttpStatus.NOT_FOUND,
                );
            };

            return found_match;
        } catch (error) {
            throw new HttpException(error, error.status ? error.status : 500);
        }
    } 

    public async createMatch(
        createMatchDto: CreateMatchDto
    ): Promise<boolean> {
        try {
            const home_team = await this.teamRespository.findOneBy({
                teamID: createMatchDto.homeTeam
            });
            if(!home_team){
                throw new HttpException(
                    'The home team does not exist',
                    HttpStatus.NOT_FOUND,
                  );
            };
            const away_team = await this.teamRespository.findOneBy({
                teamID: createMatchDto.awayTeam
            });
            if(!away_team){
                throw new HttpException(
                    'The away team does not exist',
                    HttpStatus.NOT_FOUND,
                  );
            };
            const match = this.matchRepository.create({
                awayTeam: away_team,
                awayTeamScore: createMatchDto.awayTeamScore,
                homeTeam: home_team,
                homeTeamScore: createMatchDto.homeTeamScore,
                date: createMatchDto.date,
                hour: createMatchDto.hour,
                location: createMatchDto.location,
                status: createMatchDto.status
            });
            await this.matchRepository.save(match);
            return true;
        } catch (error) {
            throw new HttpException(error, error.status ? error.status : 500);
        }
    }

}
