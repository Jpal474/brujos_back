import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { PlayerPosition } from "../player-position.enum";

export class UpdatePlayerDto {
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
    @IsEnum(PlayerPosition)
    position: PlayerPosition;
}