/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt.payload.interface';
import { Administrator } from 'src/admin/admin/admin.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Administrator)
    private adminRepository: Repository<Administrator>,
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Administrator> {
    const {mail}=payload;
    const user: Administrator = await this.adminRepository.findOneBy({mail:mail});
    if(!user){
        throw new UnauthorizedException('User not found, please check your mail');
    }
    return user;
  }
}
