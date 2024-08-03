import { ApiProperty } from "@nestjs/swagger";
import { Team } from "src/team/team/team.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Match {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    matchID?: string;

    @Column()
    @ApiProperty()
    homeTeamScore: string;

    @Column()
    @ApiProperty()
    awayTeamScore: string;

    @Column()
    @ApiProperty()
    date: string;

    @Column()
    @ApiProperty()
    hour: string;

    @Column()
    @ApiProperty()
    location: string;

    @Column()
    @ApiProperty()
    status: string;

    @ManyToOne(() => Team, (team) => team.homeMatches) 
    @ApiProperty({type: () => Team})
    @JoinColumn({ name: 'home_team_id' })
    homeTeam: Team;

    @ManyToOne(() => Team, (team) => team.awayMatches)
    @ApiProperty({ type: () => Team})
    @JoinColumn({ name: 'away_team_id' })
    awayTeam: Team;


}