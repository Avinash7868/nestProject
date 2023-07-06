import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


@Schema()


export class Author {
  @Prop()
  name: string;

  // @Prop()
  // dob: string;

  @Prop()
  gender:string;

  @Prop()
  country: string;

  @Prop({type:Date})
  DOB: Date;

}

export const AuthorSchema = SchemaFactory.createForClass(Author);
