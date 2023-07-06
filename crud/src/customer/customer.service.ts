import { Injectable } from '@nestjs/common';
import { Customer } from './schemas/customer.schema';
import * as mongoose  from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CustomerService {
    constructor(@InjectModel(Customer.name)
    private cutomerModel:mongoose.Model<Customer>){}

    async findall():Promise<Customer[]>{
        const all = await this.cutomerModel.find()
        return all;
    }


    async create(customer:Customer):Promise<Customer>{
        const cr = await this.cutomerModel.create(customer)
        return cr
    }
}
