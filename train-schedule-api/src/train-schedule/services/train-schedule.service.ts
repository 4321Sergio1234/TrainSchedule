import { Injectable } from '@nestjs/common';
import { TrainScheduleEntity } from '../entities/train-schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateTrainScheduleDto } from '../dtos/create-train-schedule.dto';
import { UpdateTrainScheduleDto } from '../dtos/update-train-schedule.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { TrainScheduleDto } from '../dtos/train-schedule.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TrainScheduleService {
    constructor(
        @InjectRepository(TrainScheduleEntity)
        private trainsRepository: Repository<TrainScheduleEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
      ) {}
      
      async findAll(): Promise<TrainScheduleDto[]> {
        return (await this.trainsRepository.find()).map(e => plainToInstance(TrainScheduleDto,e,{excludeExtraneousValues:true}));
      }
      
      async findOne(id: number): Promise<TrainScheduleDto> {
        const train = await this.trainsRepository.findOneBy({ id });
        if (!train) {
          throw new NotFoundException(`Train with ID ${id} not found`);
        }

        return plainToInstance(TrainScheduleDto, train, {excludeExtraneousValues: true});
      }
      
      async create(createTrainDto: CreateTrainScheduleDto): Promise<TrainScheduleDto> {
        const user = await this.userRepository.findOneBy({id: createTrainDto.userId});

        if (!user) {
            throw new NotFoundException(`User with ID ${createTrainDto.userId} not found`);
        }

        const train = this.trainsRepository.create({...createTrainDto, user: user});
        const newTrShdl = await this.trainsRepository.save(train);

        return plainToInstance(TrainScheduleDto, newTrShdl, {excludeExtraneousValues: true})
      }
      
      async update(id: number, updateTrainDto: UpdateTrainScheduleDto): Promise<TrainScheduleDto> {
        const train = await this.trainsRepository.findOneBy({id});
        const user = await this.userRepository.findOneBy({id: updateTrainDto.userId})

        const updatedTrain = {
          ...train,
          ...updateTrainDto,
          
        };
        
        await this.trainsRepository.update(id,updatedTrain);
        return plainToInstance(TrainScheduleDto,await this.findOne(id), {excludeExtraneousValues: true});
      }
      
      async remove(id: number): Promise<void> {
        const result = await this.trainsRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`Train with ID ${id} not found`);
        }
      }
}
