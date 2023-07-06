import {IsDate, IsNotEmpty,IsString } from "class-validator";


export class createCustomerDto{

    @IsNotEmpty()
    @IsString()
    readonly  name: string;

    @IsNotEmpty()
    // @IsString()
    readonly mobile: number;

    @IsNotEmpty()
    @IsString()
    readonly gender:string;

    @IsNotEmpty()
    readonly address: string;
}