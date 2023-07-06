import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './schemas/customer.schema';
import { createCustomerDto } from './dto/create_customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService){}

    @Get()
    async getall():Promise<Customer[]>{
        const all = await this.customerService.findall();
        return all
    }

    @Post()
    async createAPI(
      @Body()
      customer: createCustomerDto,
    ): Promise<Customer> {
      return await this.customerService.create(customer);
    }
}
