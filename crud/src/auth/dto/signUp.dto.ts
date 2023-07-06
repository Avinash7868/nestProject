import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";


export class signUpDto{
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail({},{message:"Please enter a valid email id"})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;

    
}