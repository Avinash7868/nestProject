import { IsEmpty, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { category } from "../schemas/book.schema";
import { Author } from "../../author/schemas/author.schema";
import { Customer } from "src/customer/schemas/customer.schema";


export class updateBookDto{
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsNumber()
    readonly price: number;

    @IsOptional()
    @IsEnum(category,{message:"Please Enter a valid Category"})
    readonly category: category;



    @IsNumber()
    readonly customerReviews:number;

    @IsNumber()
    readonly soldCopies:number;

    readonly authorsArray: Author[];

    readonly customersData: Customer[];
}