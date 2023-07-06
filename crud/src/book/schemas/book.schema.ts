import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Author } from '../../author/schemas/author.schema';
import { Customer } from 'src/customer/schemas/customer.schema';

export enum category {
  advanture = 'adventure',
  fantasy = 'fantasy',
  classic = 'classic',
  comedy = 'comedy',
}

@Schema({
  timestamps: true,
})


export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  category: category;

  @Prop()
  customerReviews : number;

  @Prop()
  soldCopies : number;

  @Prop([{type:mongoose.Schema.Types.ObjectId, ref:'Author'}])
  authorsArray: Author[];

  @Prop([{type:mongoose.Schema.Types.ObjectId, ref:'Customer'}])
  customersData: Customer[];

}

export const BookSchema = SchemaFactory.createForClass(Book);
