import {IsDate, IsNotEmpty,IsString } from "class-validator";


export class createAuthorDto{
    @IsNotEmpty()
    @IsString()
    readonly  name: string;

    // @IsNotEmpty()
    // // @IsString()
    // readonly dob: string;

    @IsNotEmpty()
    @IsString()
    readonly gender:string;

    @IsNotEmpty()
    readonly country: string;

    // @IsDate()
    readonly DOB: Date;
}