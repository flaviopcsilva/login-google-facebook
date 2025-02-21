import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { FacebookStrategy } from './facebook.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'google' }),
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret: process.env.JWT_SECRET, // <-- Defina no `.env`
            signOptions: { expiresIn: '1h' },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, GoogleStrategy, FacebookStrategy],
    exports: [AuthService]
})
export class AuthModule { }
