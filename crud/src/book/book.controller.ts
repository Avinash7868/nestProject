import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book, BookSchema } from './schemas/book.schema';
import { createBookDto } from './dto/create_book.dto';
import { updateBookDto } from './dto/update_book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import mongoose from 'mongoose';

@Controller('book')
export class BookController {
  constructor(private bookservice: BookService) {}

  //Below code will call the get api and find/get all the data
  // @Get()
  // @UseGuards(AuthGuard())
  // async getAll(): Promise<Book[]> {
  //   return await this.bookservice.findAll();
  // }

  
  @Get()
  // @UseGuards(AuthGuard())
  async getAll(): Promise<Book[]> {
    return await this.bookservice.findAll2();
  }

  @Get('look')
  // @UseGuards(AuthGuard())
  async getAll2(): Promise<Book[]> {
    return await this.bookservice.manyToOne();
  }


  @Get('query1')
  // @UseGuards(AuthGuard())
  async getByQuery1(@Query() query: ExpressQuery): Promise<Book[]> {
    return await this.bookservice.findAllByQuery3(query);
  }


  @Get('query')
  async getByQuery(@Query() query: ExpressQuery): Promise<Book[]> {
    return await this.bookservice.findAllByQuery(query);
  }


  // @Post()
  // @UseGuards(AuthGuard())
  // async createAPI(
  //   @Body()
  //   book: createBookDto,

  //   @Req() req,
    
  // ): Promise<Book> {
  //   console.log(req.user)
  //   return await this.bookservice.create(book ,req.user);
  // }
  @Post()
  // @UseGuards(AuthGuard())
  async createAPI(
    @Body()
    book:Book,
  
    ): Promise<Book> {
    return await this.bookservice.create(book);
  }

  @Get(':id')
  async getById(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return await this.bookservice.findById(id);
  }

  @Get('date/:id')
  async getById2(
    @Param('id')
    id: string,
  ): Promise<any> {
    return await this.bookservice.findById(id);
  }

  @Put(':id')
  // @UseGuards(AuthGuard())
  async updateAPI(
    @Param('id')
    id: string,

    @Body()
    book: updateBookDto,
  ): Promise<Book> {
    return await this.bookservice.updateById(id, book);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard())
  async deleteAPI(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return await this.bookservice.deleteById(id);
  }
}
function handleError(err: any) {
  throw new Error('Function not implemented.');
}

