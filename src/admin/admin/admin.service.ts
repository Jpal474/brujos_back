import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAdminDto } from './dto/update-admin.dto';
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

    async getAdministratorById(id: string): Promise<Administrator> {
      try {
        const administrator = await this.adminRepository.findOneBy({ adminID: id });
        if (!administrator) {
          throw new HttpException(
            `Unauthorized: The admin does not exists`,
            HttpStatus.UNAUTHORIZED,
          );
        }
        return administrator;
      } catch (error) {
        throw new HttpException(
          `BAD REQUEST: There was an error trying to find the admin`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    async updateAdminData(adminID: string, body: UpdateAdminDto): Promise<boolean> {
      try{
      const mail = await this.adminRepository.findOne({
        where:{
          mail: body.mail
        }
      });
    if (mail && mail.adminID !== adminID) {
        throw new HttpException(
          'Mail already registered',
          HttpStatus.BAD_REQUEST,
        );
      }
      const admin = await this.adminRepository.preload({
        adminID,
        ... body,
      });

      if(!admin) {
        throw new NotFoundException(`Admin not found`);
      }
       this.adminRepository.save(admin);
       return true;
    }
    catch(error) {
      throw new HttpException(error, error.status ? error.status : 500);
    }
  
  }

  async deleteAdmin(id: string): Promise<boolean> {
    try{
    const result = await this.adminRepository.delete(id); //finds the admin by id and deletes the register
    if (result.affected === 0) {
      throw new HttpException(
        'This admin does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return true;
  }
  catch(error) {
    throw new HttpException(error, error.status ? error.status : 500);
  }
  }
}
