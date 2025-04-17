import { useRouteLoaderData } from "react-router-dom";
import TrainScheduleForm from "../components/TrainScheduleForm";

export default function EditTrainSchedule(){
    const date = useRouteLoaderData('trainSchedule');

    return (
        <TrainScheduleForm initialData={date}></TrainScheduleForm>
    );
}