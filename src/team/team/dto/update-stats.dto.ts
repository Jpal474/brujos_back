import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateStatsDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    points: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    goalsFor: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    goalsAgainst: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    goalDifference: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    matchesPlayed: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    wins: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    draws: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    losses: number;
}