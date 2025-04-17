import { IsString, IsNumber, IsDate, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { Int32 } from "typeorm";

export class CreateTrainScheduleDto{
    @IsString()
    fromStation: string;
    @IsString()
    toStation: string;
    @IsDate()
    @Type(() => Date)
    departureTime: Date
    @IsDate()
    @Type(() => Date)
    arrivalTime: Date
    @IsInt()
    userId: number;
    @IsString()
    trainNumber: string;
}