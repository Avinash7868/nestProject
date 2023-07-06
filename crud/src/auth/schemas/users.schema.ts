import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps:true,
})

export class Users extends Document{
    @Prop()
    name:string;
    
    @Prop({unique: [true,'Duplicate email id'] })
    email:string;

    @Prop()
    password:string;
}

export const UserSchema = SchemaFactory.createForClass(Users);