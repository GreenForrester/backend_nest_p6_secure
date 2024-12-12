import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column()
  @IsEmail()
  username: string; //username is email

  @Column()
  password: string;

  @Column({ default: false })
  updateinmail: boolean;
}
