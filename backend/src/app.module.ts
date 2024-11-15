import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
//import { PlayerModule } from './modules/player/player.module';
//import { PlayerModule } from './player/player.module';
//import { ScoreModule } from './score/score.module';

@Module({ 
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'gamesm_db',
        autoLoadEntities: true,
        synchronize: true,
    }),
    RedisModule.forRoot({
        config: {
           host:'localhost',
           port: 6379,
        },
    
    }),
    MongooseModule.forRoot('mongodb://localhost/gameScoreManager'),
    UsersModule,
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
