import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './schemas/author.schema';
import * as mongoose  from 'mongoose';

@Injectable()
export class AuthorService {
    constructor(@InjectModel(Author.name)
    private AuthorModel:mongoose.Model<Author>){}

    async findAll() : Promise<Author[]>{
        const all= await this.AuthorModel.find()
        return all;
    }

    async create(author:Author) : Promise<Author>{
        
        // const data = Object.assign(book, {user : user._id})
        const authorCreate = await this.AuthorModel.create(author)
        return authorCreate;
    }

    async findById(id: string ):Promise<Author>{
        const isValid = mongoose.isValidObjectId(id);
        if(!isValid){
            throw new BadRequestException("Please Enter a Valid id")
        }
        const findBook = await this.AuthorModel.findById(id)
        if(!findBook){
            throw new NotFoundException("Alas Data is not present in my collection")
        }
        return findBook;
    }
}
