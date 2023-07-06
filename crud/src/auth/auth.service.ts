import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import * as becrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { signUpDto } from './dto/signUp.dto';
import { loginDto } from './dto/login.dto';
import {UnauthorizedException} from '@nestjs/common'

@Injectable()
export class AuthService {
    constructor( @InjectModel(Users.name)
    private userModel: Model<Users>,
    private jwtService: JwtService){}

    async signUp(signUpDto:signUpDto):Promise<{ token: string}>{
        const {name ,email ,password} = signUpDto
        const hashedPassword = await becrypt.hash(password,10)

        const user= await this.userModel.create({
            name,
            email,
            password:hashedPassword
        })

        const token = this.jwtService.sign({id: user._id})

        return {token};
    }

    async login(loginDto:loginDto):Promise<{token:string}>{
        const {email ,password} = loginDto

        const user = await this.userModel.findOne({email});

        if(!user){
            throw new UnauthorizedException("Invalid email or password")
        }

        const isPasswordMatched = await becrypt.compare(password,user.password)
        
        if(!isPasswordMatched){
            throw new UnauthorizedException("Invalid email or password")
        }

        const token = this.jwtService.sign({id: user._id})

        return {token};

    }
}
