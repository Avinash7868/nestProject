import { Body, Controller, Post ,Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signUp.dto';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor( private authService:AuthService){}

    @Post('/signup')
    Signup(
        @Body() signUpDto:signUpDto
    ):Promise<{ token:string    }>{
        return this.authService.signUp(signUpDto);
    }

    @Get('/login')
    login(
        @Body() loginDto:loginDto
    ):Promise<{ token:string    }>{
        return this.authService.login(loginDto);
    }
}
