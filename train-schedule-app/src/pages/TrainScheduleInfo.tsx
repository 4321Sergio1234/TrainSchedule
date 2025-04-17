import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import TrainScheduleItemInfo from "../components/TrainScheduleItemInfo";
import { TrainScheduleDto } from "../utils/dto/TrainScheduleDto";

export default function TrainScheduleInfo(){
    const data = useLoaderData() as TrainScheduleDto;

    return (
        <TrainScheduleItemInfo schedule={data}></TrainScheduleItemInfo>
    );
}

export async function loader({params}: LoaderFunctionArgs): Promise<TrainScheduleDto | null>{
    const response = await fetch('http://localhost:3000/train-schedule/' + params.id, {
        method: 'GET',
        headers:{
            Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdnQGdnLmNvbSIsInN1YiI6MSwiaWF0IjoxNzQ0ODg3NTk0LCJleHAiOjE3NDQ5NzM5OTR9.fvL6a_0ZGw7VVleRoXsrAoAbzmWbhHaAQJJc3tppeLI'
        }
    })

    const data = await response.json();

    return data;
} 