import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from 'src/admin/admin/admin.entity';
import { MailService } from 'src/mail/mail/mail.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy:'jwt'}),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600, //time for expiring
      },
    }),
    TypeOrmModule.forFeature([Administrator]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, MailService],
})
export class AuthModule {}
