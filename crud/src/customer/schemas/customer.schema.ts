import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()


export class Customer {

  @Prop()

  name: string;

  @Prop()
  mobile: number;

  @Prop()
  gender:string;

  @Prop()
  address: string;


}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
