import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from 'src/admin/admin/admin.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt.payload.interface';
import { SignUpDTO } from './dto/signup.dto';
import { MailService } from 'src/mail/mail/mail.service';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Administrator)
        private adminRepository: Repository<Administrator>,
        private jwtService: JwtService,
        private mailService: MailService,
    ){}

    async signUp(body: SignUpDTO): Promise<boolean> {
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
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
      
    }

    async signIn(loginDto: LoginDTO): Promise<{ accessToken: string}> {
        const { email, password } = loginDto;
        const user = await this.adminRepository.findOneBy({ mail: email});
        if(!user) {
            throw new HttpException(
                `Unauthorized: The email address entered is invalid. Please check your email and try again`,
                HttpStatus.UNAUTHORIZED,
              );
        }

        const valid_password = await this.checkPassword(password, user.password);
        if(!valid_password) {
          throw new HttpException(
          'Unauthorized: The password entered is invalid. Please verify your password and try again',
           HttpStatus.UNAUTHORIZED,
            );
        }
        const payload: JwtPayload = { 
            id: user.adminID,
            name: user.name,
            last_name: user.lastName,
            mail: user.mail,
        }
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    }

    public async sendVerificationMail(mail: string){
      try {
        const usuario = await this.adminRepository.findOneBy({mail:mail});
        if(!usuario){
          throw new HttpException(
            `Unauthorized: The email address entered is invalid. Please check your email and try again`,
            HttpStatus.UNAUTHORIZED,
          );
        }

        const htmlContent = `
        <h1>Bienvenido del Deportivo Axolotl</h1>
        <p>Para continuar por favor verifique su cuenta siguiendo el botón de abajo</p>
        <a class = 'btn btn-primary'> Verificar </a>`;
  
        await this.mailService.sendVerificationMail(
          mail,
          'Verificación de cuenta',
          htmlContent,
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }


    private async checkPassword(
        password: string,
        passwordDB: string,
      ): Promise<boolean> {
        return await bcrypt.compare(password, passwordDB);
      }
}
