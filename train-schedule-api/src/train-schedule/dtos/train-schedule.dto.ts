import { Expose, Transform } from "class-transformer";
import { TrainScheduleEntity } from "../entities/train-schedule.entity";

export class TrainScheduleDto{
    @Expose()
    id: number

    @Expose()
    trainNumber: string

    @Expose()
    fromStation: string

    @Expose()
    toStation: string

    @Expose()
    departureTime: Date
       
    @Expose()
    arrivalTime: Date

    @Expose()
    createdAt: Date
} 