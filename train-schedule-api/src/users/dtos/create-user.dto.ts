import { IsEmail } from "class-validator";
import { IsString } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
  }