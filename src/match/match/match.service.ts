import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { Repository } from 'typeorm';
import { Team } from 'src/team/team/team.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { updateScoreDto } from './dto/update-score.dto';
import { updateScoreAndStatusDto } from './dto/update-score-status.dto';

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

    public async getAllMatchesByTeamID(teamID: string)
    :Promise<Match[]> {
        try {
            const found_team = this.teamRespository.findOneBy(
                {
                    teamID:teamID
                }
            )
            if(!found_team) {
                throw new HttpException(
                    'The team does not exist',
                    HttpStatus.NOT_FOUND
                )
            }

            const matches = await this.matchRepository.find({
                where: {
                    awayTeam: {
                        teamID: teamID
                    },
                    homeTeam: {
                        teamID: teamID
                    }
                }
            })
            if(!matches) {
                throw new HttpException(
                    'There are no matches registered for the team',
                    HttpStatus.NOT_FOUND
                )
            }

            return matches;
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

    public async updateMatchData(
        matchID: string, 
        updateMatchDto: UpdateMatchDto
    ): Promise<boolean>
    {
        try {
            const found_match = await this.matchRepository.findOneBy(
                {
                    matchID: matchID
                }
            );

            if(!found_match) {
                throw new HttpException(
                    'Match not found',
                    HttpStatus.NOT_FOUND
                )
            };

            const home_team = await this.teamRespository.findOneBy({
               teamID: updateMatchDto.homeTeam 
            });

            if(!home_team) {
                throw new HttpException(
                    'Home team not found',
                    HttpStatus.NOT_FOUND
                )
            };

            const away_team = await this.teamRespository.findOneBy({
                teamID: updateMatchDto.homeTeam 
             });
 
             if(!away_team) {
                 throw new HttpException(
                     'Away team not found',
                     HttpStatus.NOT_FOUND
                 )
             };

             found_match.awayTeam = away_team;
             found_match.homeTeam = home_team;
             found_match.date = updateMatchDto.date;
             found_match.hour = updateMatchDto.hour;
             found_match.location = updateMatchDto.location;
             await this.matchRepository.save(found_match);
             return true;

        } catch (error) {
            throw new HttpException(error, error.status ? error.status : 500);
        }

    }

    public async updateMatchScoreAndStatus(
        matchID: string,
        updateStatusAndScorDto: updateScoreAndStatusDto
    ): Promise<boolean>{
        try {
            const found_match = await this.matchRepository.findOneBy(
                {
                    matchID: matchID,
                }
            );

            if(!found_match){
                throw new HttpException(
                    'Match not found',
                    HttpStatus.NOT_FOUND
                )
            };

            const match = await this.matchRepository.preload({
                matchID, 
                ... updateStatusAndScorDto
            });

            await this.matchRepository.save(match);
            return true;
        } catch (error) {
            
        }
    }
    
    public async updateMatchScore(
        matchID: string, 
        updateScoreDto: updateScoreDto
    ): Promise<boolean> {
        try {
            const found_match = await this.matchRepository.findOneBy({
                matchID: matchID
            });

            if(!found_match){
                throw new HttpException(
                    'Match not found',
                    HttpStatus.NOT_FOUND
                );
            };

            const match = await this.matchRepository.preload({
                matchID,
                ... updateScoreDto
            });
            await this.matchRepository.save(match);
            return true;
        } catch (error) {
            throw new HttpException(error, error.status ? error.status : 500);
        }
    }


    public async deleteMatch(
        matchID: string
    ): Promise<boolean> {
        try {
            const result = await this.matchRepository.delete(matchID);
            if(result.affected === 0) {
                throw new HttpException(
                    'The match was not found',
                    HttpStatus.NOT_FOUND
                ) 
            }
            return true;

        } catch (error) {
            
        }
    }
}
