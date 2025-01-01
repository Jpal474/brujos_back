import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class InfoDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    history: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    vision: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    mission: string;
}