import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Administrator {
@PrimaryGeneratedColumn('uuid')
@ApiProperty()
adminID: string;

@Column()
@ApiProperty()
name: string;

@Column()
@ApiProperty()
lastName: string;

@Column()
@ApiProperty()
mail: string;

@Column()
@ApiProperty()
phone: string;

@Column()
@ApiProperty()
password: string;

@Column({ default: ''})
@ApiProperty()
profileImage?: string;

}