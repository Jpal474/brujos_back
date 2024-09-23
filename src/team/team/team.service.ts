import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team-dto';
import { Category } from 'src/category/category/category.entity';
import * as sharp from 'sharp';

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
        const query = await this.teamRepository.createQueryBuilder('teams');
        const all_teams = await this.teamRepository.find({where: {
            category: {
                categoryID: categoryID
            }
        }})
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
          console.log(error, 'error');
          throw new HttpException(error.message, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

public async updateName(name: string, teamID:string): Promise<boolean> {
    try{

        const found_team = await  this.teamRepository.findOneBy({name: name});
        if(found_team && found_team.teamID !== teamID){
            throw new HttpException(
                'Name already in use',
                HttpStatus.BAD_REQUEST,
            );
        }
        
        found_team.name = name;
        this.teamRepository.save(found_team);
        return true;
    }
    catch(error){
        throw new HttpException(error, error.status ? error.status : 500);
    }
}

// public async updateStats()

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
