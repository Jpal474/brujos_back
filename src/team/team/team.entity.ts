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

    @Column({ default: 0})
    @ApiProperty()
    points: number;

    @Column({ default: 0})
    @ApiProperty()
    goalsFor: number;

    @Column({ default: 0})
    @ApiProperty()
    goalsAgainst: number;

    @Column({ default: 0})
    @ApiProperty()
    goalDifference: number;

    @Column({ default: 0})
    @ApiProperty()
    matchesPlayed: number;

    @Column({ default: 0})
    @ApiProperty()
    wins: number;

    @Column({ default: 0})
    @ApiProperty()
    draws: number;

    @Column({ default: 0})
    @ApiProperty()
    losses: number;

    @Column({ default: ''})
    @ApiProperty()
    shieldImage: string;

    @OneToMany(() => Player, (player) => player.team)
    @ApiProperty()
    player: Player[];

    @ManyToOne(() => Category, (category) => category.team)
    @ApiProperty({ type: () => Category})
    @JoinColumn({ name: 'categoryID'})
    category: Category;

    @OneToMany(() => Match, (match) => match.homeTeam)
    @ApiProperty()
    homeMatches: Match[];

    @OneToMany(() => Match, (match) => match.awayTeam)
    @ApiProperty()
    awayMatches: Match[];



}