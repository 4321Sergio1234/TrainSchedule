import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './users/auth.module';
import { TrainScheduleModule } from './train-schedule/train-schedule.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'TrainScheduleAPI',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule, TrainScheduleModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
