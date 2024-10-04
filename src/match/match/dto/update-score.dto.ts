import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class updateScoreDto {
    @ApiProperty()
    @IsString()
    homeTeamScore: string;

    @ApiProperty()
    @IsString()
    awayTeamScore: string;
}