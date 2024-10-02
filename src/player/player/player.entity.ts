import { ApiProperty } from "@nestjs/swagger";
import { Team } from "src/team/team/team.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    playerID?: string;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    lastName: string;

    @Column()
    @ApiProperty()
    phone: string;

    @ManyToOne(() => Team, (team) => team.player)
    @JoinColumn()
    @ApiProperty({ type: () => Team})
    team: Team;

    @Column()
    @ApiProperty()
    position: string;

    @Column()
    @ApiProperty()
    image: string;

}