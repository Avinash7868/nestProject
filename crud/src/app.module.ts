import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    BookModule,
    AuthModule,
    AuthorModule,
    CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
