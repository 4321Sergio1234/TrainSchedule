import { Module } from '@nestjs/common';
import { TrainScheduleController } from './train-schedule.controller';
import { TrainScheduleService } from './services/train-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainScheduleEntity } from './entities/train-schedule.entity';
import { AuthModule } from 'src/users/auth.module';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainScheduleEntity, UserEntity])],
  controllers: [TrainScheduleController],
  providers: [TrainScheduleService],
  exports: [TrainScheduleService]
})
export class TrainScheduleModule {}
