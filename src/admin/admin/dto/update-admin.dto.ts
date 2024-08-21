import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';


export class UpdateAdminDto{

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string; 

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    mail: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;

} 