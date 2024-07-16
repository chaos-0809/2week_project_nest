import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(15)
  public readonly username: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z A-Z 0-9 !? @]*$/, {
    message: 'password only accepts english and number and !? and @',
  })
  @MinLength(4)
  @MaxLength(15)
  public readonly password: string;

  @Column({ unique: true })
  @IsEmail() // 이메일 양식확인
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'email :(',
  })
  public readonly email: string;
}
