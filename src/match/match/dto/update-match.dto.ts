import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateMatchDto {
    
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

}