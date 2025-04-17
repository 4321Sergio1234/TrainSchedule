export class CreateTrainScheduleDto{
  fromStation: string = "";
  toStation: string = "";
  departureTime: string = "";
  arrivalTime: string = "";
  userId: number = -1;
  trainNumber: string = "";
}