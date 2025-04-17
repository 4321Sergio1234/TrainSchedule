import { Type } from "class-transformer";
import { IsString, IsDate, IsNumber } from "class-validator";

export class UpdateTrainScheduleDto{
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
    @IsNumber()
    userId: number;
    @IsString()
    trainNumber: string;
}