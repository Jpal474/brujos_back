import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from './admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(Administrator)
        private adminRepository: Repository<Administrator>
    ){}

    async createAdministrator(body: CreateAdminDto): Promise<boolean> {
        const mail = await this.adminRepository.findOne({
            where:{
              mail: body.mail
            }
          });
        if (mail) {
            throw new HttpException(
              'Mail already registered',
              HttpStatus.BAD_REQUEST,
            );
          }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(body.password, salt);
        body.password = hashedPassword;
        const admin = this.adminRepository.create(body);
        try {
          await this.adminRepository.save(admin);
          return true;
        } catch (error) {
        console.log(error);
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
      
    }
}
