import { useLoaderData } from "react-router-dom";
import TrainScheduleTable from "../components/TrainScheduleTable";
import { TrainScheduleDto } from "../utils/dto/TrainScheduleDto";
import { readToken } from "../utils/tokenUtil";

export default function TrainSchedule(){
    const schedule = useLoaderData() as TrainScheduleDto[];

    return (
        <TrainScheduleTable schedules={schedule}></TrainScheduleTable>
    );
}

export async function loader(): Promise<TrainScheduleDto[] | null>{
  const response = await fetch('http://localhost:3000/train-schedule', {
    method: 'GET',
    headers: {
        Authorization: 'Bearer ' + readToken()
    }
  });
  
  console.log(response)

  const data = response.json()
  
  return data;
}