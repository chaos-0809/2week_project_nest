import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @IsNotEmpty()
  @Matches(/^[a-z A-Z 0-9 !? @]*$/, {
    message: 'password only accepts english and number and !? and @',
  })
  readonly password: string;
}
