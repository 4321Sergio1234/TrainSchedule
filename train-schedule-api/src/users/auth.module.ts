import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: ()=>({
        secret: "SUPERPUPERSTONGKEY",
        signOptions: {expiresIn: '1d'},
      })
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, JwtStrategy],
  exports: [UserService, AuthService]
})
export class AuthModule {}
