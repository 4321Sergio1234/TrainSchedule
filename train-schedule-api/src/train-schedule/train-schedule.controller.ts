import { Controller, Get, Post, Delete, Patch, Body, Param, Headers, ForbiddenException } from '@nestjs/common';
import { CreateTrainScheduleDto } from './dtos/create-train-schedule.dto';
import { JwtAuthGuard } from 'src/users/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { TrainScheduleService } from './services/train-schedule.service';
import { TrainScheduleEntity } from './entities/train-schedule.entity';
import { UpdateTrainScheduleDto } from './dtos/update-train-schedule.dto';
import { TrainScheduleDto } from './dtos/train-schedule.dto';
import * as jwt from 'jsonwebtoken';

@Controller('train-schedule')
export class TrainScheduleController {
    constructor(private readonly trainsService: TrainScheduleService) {}

    @Get()
    findAll(): Promise<TrainScheduleDto[]> {
        return this.trainsService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string): Promise<TrainScheduleDto> {
        return this.trainsService.findOne(+id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createTrainDto: CreateTrainScheduleDto, @Headers('authorization') authHeader: string): Promise<TrainScheduleDto> {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('No token provided');
          }
          
          // Отримуємо токен з заголовка
          const token = authHeader.split(' ')[1];
          
          try {
            // Декодуємо токен (без верифікації)
            const decodedToken = jwt.decode(token);
            
            if(decodedToken){
            // Тепер ви можете отримати будь-які дані з токена
                const userId = decodedToken.sub?.toString();

                if(userId){
                    createTrainDto.userId = Number.parseInt(userId);
                    return this.trainsService.create(createTrainDto);
                }
                else{
                    throw new ForbiddenException();
                }
            }
            else{
                throw new ForbiddenException();
            }
          } catch (error) {
            throw new Error('Invalid token');
          }
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateTrainDto: UpdateTrainScheduleDto, @Headers('authorization') authHeader: string): Promise<TrainScheduleDto> {
        return this.trainsService.update(+id, updateTrainDto);
           
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string): Promise<void> {
        return this.trainsService.remove(+id);
    }
}
