import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateMatchDto {
    
    
    @ApiProperty()
    @IsString()
    date: string;
    
    @ApiProperty()
    @IsString()
    hour: string;
    
    @ApiProperty()
    @IsString()
    location: string;
    
    @ApiProperty()
    @IsString()
    homeTeam: string;
    
    @ApiProperty()
    @IsString()
    awayTeam: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    homeTeamScore?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    awayTeamScore?: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    status?: string;
}