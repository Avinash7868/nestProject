import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.stratrgy';

@Module({
  imports:[

    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService) =>{
        return{
          secret: config.get<string>('JWT_SECRET'),
          signOptions:{
            expiresIn:config.get<string | number>('JWT_EXPIRE')
          },
        }
      }
    }),
    MongooseModule.forFeature([{name:'Users',schema:UserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports: [JwtStrategy,PassportModule]
})
export class AuthModule {}
