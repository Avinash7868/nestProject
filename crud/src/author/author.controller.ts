import { Body, Controller,Get, Param, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from './schemas/author.schema';
import { createAuthorDto } from './dto/create_author.dto';


@Controller('author')
export class AuthorController {
    constructor(private authorservice: AuthorService) {}

    @Get()
    async getAll(): Promise<Author[]> {
      return await this.authorservice.findAll();
    }

    @Post()
    async createAPI(
      @Body()
      author: createAuthorDto,
      
    ): Promise<Author> {
    //   console.log(req.user)
      return await this.authorservice.create(author);
    }

    @Get(':id')
    async getById(
      @Param('id')
      id: string,
    ): Promise<Author> {
      return await this.authorservice.findById(id);
    }
  
}
