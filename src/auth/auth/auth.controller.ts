import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { SignUpDTO } from './dto/signup.dto';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    URL = 'http://localhost:4200';

    constructor (
    private authService: AuthService,
        
    ){}

    @Post('/signup')
    @ApiOperation({ summary: 'Signup'})
    @ApiBody({
        description: 'Data for thw register of the admin',
        type: SignUpDTO,
    })
    @ApiResponse({
        status: 200,
        description: 'Returns true if the admin has been registered',
        type: Boolean,
    })
    async signUp(@Body() signUpDTO: SignUpDTO): Promise<boolean> {
        return this.authService.signUp(signUpDTO);
    //     if(registro){
    //         return this.authService.sendVerificationMail(signUpDTO.mail);
    //     }
    //     return false;
    }

    @Post('/signin')
    @ApiOperation({ summary: 'Login'})
    @ApiBody({
        description: 'Data for the authentication of the user',
        type: LoginDTO
    })
    @ApiResponse({
        status: 200,
        description: 'Returns an auth token',
        type: String,
    })
   async signIn(
    @Body() LoginDTO: LoginDTO,
    ): Promise<{ accessToken: string}> {
        return this.authService.signIn(LoginDTO);
    }

    @Post('email/:destination')
    // @ApiOperation({ summary: 'Enviar correo para cambiar contraseña' })
    // @ApiParam({
    //   name: 'destinatario',
    //   description: 'Correo del usuario que ha pedido el cambio de vacaciones ',
    // })
    // @ApiResponse({
    //   status: 200,
    //   description: 'El mail ha sido enviado de forma correcta',
    //   type: Boolean,
    // })
    async enviarMail(@Param('destination') destination: string) {
      return this.authService.sendVerificationMail(destination);
    }

}
