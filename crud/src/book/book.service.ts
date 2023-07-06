import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private BookModel: mongoose.Model<Book>,
  ) {}

  //Below code will find all the data in database
  async findAll(): Promise<Book[]> {
    const all = await this.BookModel.find();
    return all;
  }

  //Working code below for aggregate lookup
  async findAll1(): Promise<Book[]> {
    const all = await this.BookModel.aggregate([
      {
        $lookup: {
          from: 'authors',
          localField: 'author',
          foreignField: '_id',
          as: 'Author_Data',
        },
      },
    ]).exec();
    return all;
  }

  //Below code will filter author as well as books and match if dob is > than 1975
  //cons: it will not going to show the books also if $match condition does not stisfy
  // async findAll2() : Promise<Book[]>{
  //     const all= await this.BookModel.aggregate([
  //         {
  //             $lookup: {
  //               from: 'authors',
  //               localField: 'author',
  //               foreignField: '_id',
  //               as: 'Author_Data',
  //             },
  //           },
  //           {
  //             $match: {
  //               'Author_Data.DOB': { $gt: new Date('1975-01-01') },
  //             },
  //           },
  //     ]).exec()
  //     return all;
  // }

  //Below code is build using Projection stage and it is working
  // async findAll2(): Promise<Book[]> {
  //     const books = await this.BookModel.aggregate([
  //       {
  //         $lookup: {
  //           from: 'authors',
  //           localField: 'author',
  //           foreignField: '_id',
  //           as: 'Author_Data',
  //         },
  //       },
  //       {
  //         $project: {
  //           title: 1,
  //           description: 1,
  //           price: 1,
  //           category: 1,
  //           author: 1,
  //           createdAt: 1,
  //           updatedAt: 1,
  //           Author_Data: {
  //             $cond: {
  //               if: {
  //                 $gte: [
  //                   { $arrayElemAt: ['$Author_Data.DOB', 0] },
  //                   new Date('1975-01-01'),
  //                 ],
  //               },
  //               then: '$Author_Data',
  //               else: [],
  //             },
  //           },
  //         },
  //       },
  //     ]).exec();

  //     return books;
  //   }


  async findAll2(): Promise<Book[]> {
    const books = await this.BookModel.aggregate([
      {
        $lookup: {
          from: 'authors',
          let: {
            authorIds: '$authorsArray',
            date: new Date('1950-01-01')
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  // $eq:['$_id', '$$authorIds'],
                  $and: [
                    { $in: ['$_id', '$$authorIds'] },
                    // { $gte: ['$DOB', '$$date'] } 
                  ]
                }
              }
            }
          ],
          as: 'Author_Data'
        },
        
      },

    ]).exec();
  
    return books;
  }


  async manyToOne(): Promise<Book[]> {
    const books = await this.BookModel.aggregate([
      {
        $lookup: {
          from: 'authors',
          let: {
            authorIds: '$authorsArray',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: ['$_id', '$$authorIds'] }
                  ]
                }
              }
            }
          ],
          as: 'Author_Data'
        }
    },
    {
      $lookup:
      {
        from: "customers",
        localField: "customersData",
        foreignField: "_id",
        as: "customersField"
      }
    },
    {
      $match: {
        soldCopies: { $gte: 2 }
      }
    },
    ]).exec();
    return books;
  }
  
  



  //It is working and it will going to show the title and author field if i fire the in my api controller
  async findAllByQuery2(query: Query): Promise<Book[]> {
    const projection: any = {
      title: 1,
      author: 1,
    };

    const all = await this.BookModel.find({}, projection);
    return all;
  }

  //It is working and it will going to take values from users in the fields (key) and if user gives two fields it will split the , from it and show the fields the user wants
  async findAllByQuery3(query: Query): Promise<Book[]> {
    const fields = query.fields as string;

    const projection: any = {};

    if (fields) {
      const selectedFields = fields.split(',');
      for (const field of selectedFields) {
        projection[field.trim()] = 1;
      }
    }

    const all = await this.BookModel.find({}, projection);
    return all;
  }

  async findAllByQuery(query: Query): Promise<Book[]> {
    const resPerpage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerpage * (currentPage - 1);

    console.log(query);

    const keyword = query.author
      ? {
          author: {
            $regex: query.author,
            $options: 'i',
          },
        }
      : {};
    const all = await this.BookModel.find({ ...keyword })
      .limit(resPerpage)
      .skip(skip);
    return all;
  }

  // the below code is working
  // async create(book:Book, user:Users) : Promise<Book>{
  //     console.log(user)
  //     const data = Object.assign(book, {user : user._id})
  //     const bookCreate = await this.BookModel.create(data)
  //     return bookCreate;
  // }
  // async create(book:Book, user:Users) : Promise<Book>{
  //     console.log(user)

  //     const data = Object.assign(book, {user})
  //     const bookCreate = await this.BookModel.create(data)
  //     return bookCreate;
  // }

  async create(book: Book): Promise<Book> {
    // console.log(user)

    // const data = Object.assign(book, {user})
    const bookCreate = await this.BookModel.create(book);
    return bookCreate;
  }

  async findById(id: string): Promise<Book> {
    const isValid = mongoose.isValidObjectId(id);
    if (!isValid) {
      throw new BadRequestException('Please Enter a Valid id');
    }
    const findBook = await this.BookModel.findById(id);
    if (!findBook) {
      throw new NotFoundException('Alas Data is not present in my collection');
    }
    return findBook;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    return await this.BookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }


  async deleteById(id: string): Promise<Book> {
    return await this.BookModel.findByIdAndDelete(id);
  }

   
}
