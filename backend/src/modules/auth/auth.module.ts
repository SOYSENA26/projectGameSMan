import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
