import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team-dto';
import { Category } from 'src/category/category/category.entity';
import * as sharp from 'sharp';
import { UpdateTeamDto } from './dto/update-team.dto';
import { UpdateStatsDto } from './dto/update-stats.dto';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private teamRepository: Repository<Team>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ){}

    public async getAllTeamsByCategory(pageSize: number, pageNumber: number, categoryID: string): Promise<{teams: Team[], pages: number}> {
        try {
        const all_teams = await this.teamRepository
                          .createQueryBuilder("team")
                          .orderBy("team.points", "DESC")
                          .addOrderBy("team.goalDifference", "DESC")
                          .addOrderBy("team.goalsFor", "DESC")
                          .addOrderBy("team.goalsAgainst", "ASC")
                          .addOrderBy("team.name", "ASC")
                          .getMany();
        if(!all_teams){
            throw new HttpException(
                'This category does not exist',
                HttpStatus.NOT_FOUND,
              );
        }        
      const pages = Math.ceil(all_teams.length / pageSize);
      const teams = all_teams.slice(
        (pageNumber - 1) * pageSize,
        pageNumber * pageSize,
      );      
      return { teams , pages };
        } catch (error) {
        throw new HttpException(error, error.status ? error.status : 500);
            
        }
    }

    public async createTeam(createTeamDTO: CreateTeamDto): Promise<true> {
        try {
          const foundTeam = await this.teamRepository.findOneBy({ name: createTeamDTO.name });
          if (foundTeam) {
            throw new HttpException('Team already registered', HttpStatus.BAD_REQUEST);
          }
    
          const category = await this.categoryRepository.findOneBy({ categoryID: createTeamDTO.category });
          if (!category) {
            throw new HttpException('This category does not exist', HttpStatus.NOT_FOUND);
          }
 
           const teamToSave = this.teamRepository.create({
            name: createTeamDTO.name,
            category: category,
          });
          await this.teamRepository.save(teamToSave);
          return true;
        } catch (error) {
          throw new HttpException(error.message, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

public async updateName(updateTeamDto: UpdateTeamDto, teamID:string): Promise<boolean> {
    try{

        const found_team = await  this.teamRepository.findOneBy({name: updateTeamDto.name});
        if (found_team && found_team.teamID !== teamID) {
          throw new HttpException(
            'Name already registered',
            HttpStatus.BAD_REQUEST,
          );
        }
        const team = await this.teamRepository.preload({
          teamID,
          ... updateTeamDto,
        });
        if(!team) {
          throw new NotFoundException(`Team not found`);
        }
        this.teamRepository.save(team);
        return true;
    }
    catch(error){      
        throw new HttpException(error, error.status ? error.status : 500);
    }
}

 public async updateTeamStats(teamID: string, updateStatsDto: UpdateStatsDto): Promise<boolean> {
  const found_team = await this.teamRepository.findOneBy({teamID: teamID})
  if (!found_team) {
    throw new HttpException(
      'Team not found',
      HttpStatus.NOT_FOUND,
    );
  }
  const team = await this.teamRepository.preload({
    teamID,
    ... updateStatsDto,
  });
  this.teamRepository.save(team);
  return true;

 }

public async deleteTeam(id: string): Promise<boolean>{
    try {
        const result = await this.teamRepository.delete(id);
        if (result.affected === 0) {
            throw new HttpException(
                'This category does not exist',
                HttpStatus.NOT_FOUND,
              );
        }
        return true;
    }
    catch(error){
        throw new HttpException(error, error.status ? error.status : 500);
    }
}

public async uploadImage(
    inputBuffer: Buffer,
    outputQuality: number,
    id: string,
  ): Promise<boolean> {
    try {
      const team = await this.teamRepository.findOneBy({teamID: id});
      const compressedImageBuffer = await sharp(inputBuffer)
        .jpeg({ quality: outputQuality }) // Adjust quality as needed
        .toBuffer();
      team.shieldImage = compressedImageBuffer.toString('base64');
      await this.teamRepository.save(team);
      return true;
    } catch (error) {
        throw new HttpException(error, error.status ? error.status : 500);
    }
  }

}
