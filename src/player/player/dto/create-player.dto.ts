import { ApiProperty } from "@nestjs/swagger";
import { PlayerPosition } from "../player-position.enum";
import { IsEnum, IsString } from "class-validator";

export class CreatePlayerDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    teamID:string;

    @ApiProperty()
    @IsEnum(PlayerPosition)
    position: PlayerPosition;

    @ApiProperty()
    @IsString()
    image: string;
}
