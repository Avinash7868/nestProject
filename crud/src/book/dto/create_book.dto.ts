import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { category } from "../schemas/book.schema";
import { Author } from "../../author/schemas/author.schema";
import { Customer } from "src/customer/schemas/customer.schema";


export class createBookDto{
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;
    
    @IsEnum(category,{message:"Please Enter a valid Category"})
    readonly category: category;

    @IsNotEmpty()
    @IsNumber()
    readonly customerReviews:number;

    @IsNotEmpty()
    @IsNumber()
    readonly soldCopies:number;



    readonly authorsArray: Author[];

    readonly customersData: Customer[];
}