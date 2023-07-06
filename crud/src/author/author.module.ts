import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from './schemas/author.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'Author', schema:AuthorSchema}])],
  providers: [AuthorService],
  controllers: [AuthorController]
})
export class AuthorModule {}
