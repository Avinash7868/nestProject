import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schemas/book.schema';
import { AuthModule } from '../auth/auth.module';
import { AuthorModule } from 'src/author/author.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports:[
    AuthModule,AuthorModule,CustomerModule,
    MongooseModule.forFeature( [{name:'Book', schema:BookSchema}]),
    ],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
