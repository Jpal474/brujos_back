import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { MatchStatus } from "../match-status.enum";

export class updateScoreAndStatusDto {
    @ApiProperty()
    @IsString()
    homeTeamScore: string;

    @ApiProperty()
    @IsString()
    awayTeamScore: string;

    @ApiProperty()
    @IsEnum(MatchStatus)
    status: string;
}