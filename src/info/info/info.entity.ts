import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Information {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    infoID?: string;

    @Column()
    @ApiProperty()
    history: string;

    @Column()
    @ApiProperty()
    mission: string;

    @Column()
    @ApiProperty()
    vision: string;
}