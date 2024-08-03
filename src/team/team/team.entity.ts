import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/category/category/category.entity";
import { Match } from "src/match/match/match.entity";
import { Player } from "src/player/player/player.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Team {

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    teamID: string

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    ponits: number;

    @Column()
    @ApiProperty()
    goalsFor: number;

    @Column()
    @ApiProperty()
    goalsAgainst: number;

    @Column()
    @ApiProperty()
    goalDifference: number;

    @Column()
    @ApiProperty()
    matchesPlayed: number;

    @Column()
    @ApiProperty()
    wins: number;

    @Column()
    @ApiProperty()
    draws: number;

    @Column()
    @ApiProperty()
    losses: number;

    @OneToMany(() => Player, (player) => player.team)
    @ApiProperty()
    player: Player[];

    @ManyToOne(() => Category, (category) => category.team)
    @ApiProperty()
    @JoinColumn()
    category: Category;

    @OneToMany(() => Match, (match) => match.homeTeam)
    @ApiProperty()
    homeMatches: Match[];

    @OneToMany(() => Match, (match) => match.awayTeam)
    @ApiProperty()
    awayMatches: Match[];



}