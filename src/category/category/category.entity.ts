import { ApiProperty } from "@nestjs/swagger";
import { Team } from "src/team/team/team.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    categoryID: string;

    @Column({ unique: true})
    @ApiProperty()
    categoryName: string;

    @OneToMany(() => Team, (team) => team.category)
    @ApiProperty({ type: () => Team})
    team:Team[];
}