import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Information } from './info.entity';
import { Repository } from 'typeorm';
import { InfoDto } from './dto/create-info.dto';

@Injectable()
export class InfoService {
    constructor(
        @InjectRepository(Information)
        private infoRepository: Repository<Information>,
    ){}

    public async createInfo(createInfoDto: InfoDto): Promise<boolean> {
        try {
            const info = this.infoRepository.create(createInfoDto);
            await this.infoRepository.save(info);
            return true;
        } catch (error) {
            throw new HttpException(error, error.status ? error.status : 500);
            
        }
    }

    public async updateInfo(infoID: string, updateInfoDto:InfoDto): Promise<boolean> {
        try {
            const found_info = await this.infoRepository.findOneBy(
                {infoID: infoID}
            );
            if(!found_info){
                throw new HttpException(
                    'Player not found',
                HttpStatus.NOT_FOUND
            );
            }
            const info = await this.infoRepository.preload({
                infoID,
                ...updateInfoDto
            });
            this.infoRepository.save(info)
            return true;
        } catch (error) {
            throw new HttpException(
                'Player not found',
            HttpStatus.NOT_FOUND
        );
        }
    }
}
