import { Form, Link, redirect } from 'react-router-dom';
import { TrainScheduleDto } from '../utils/dto/TrainScheduleDto';
import type { ActionFunctionArgs } from "react-router-dom";
import { readToken } from '../utils/tokenUtil';
import classes from './TrainScheduleForm.module.css'

interface TrainScheduleFormProps {
    initialData?: TrainScheduleDto;
}
  
export default function TrainScheduleForm({initialData}: TrainScheduleFormProps) {
 
  return (
    <Form method='post' className={classes.form}>
      <div className={classes.formGroup}>
        <label>From Station:</label>
        <select name="fromStation" defaultValue={initialData?.fromStation} required>
            <option value={'Львів'}>Львів</option>
            <option value={'Житомир'}>Житомир</option>
        </select>
      </div>
      
      <div className={classes.formGroup}>
        <label>To Station:</label>
        <select name="toStation" value={initialData?.toStation} required>
            <option value={'Київ'}>Київ</option>
            <option value={'Одеса'}>Одеса</option>
        </select>
      </div>

      <div className={classes.formGroup}>
        <label>Departure Time:</label>
        <input name='departureTime' type="datetime-local" defaultValue={initialData?.departureTime} required />
      </div>

      <div className={classes.formGroup}>
        <label>Arrival Time:</label>
        <input name='arrivalTime' type="datetime-local" defaultValue={initialData?.arrivalTime} required/>
      </div>

      <div className={classes.formGroup}>
        <label>Train Number:</label>
        <select name='trainNumber' defaultValue={initialData?.trainNumber} required>
            <option>№35</option>
            <option>№78</option>
        </select>
      </div>

      <button type="submit">Зберегти</button>
      <Link to='..' className={classes.button}>Назад</Link>
    </Form>
  );
}


export async function trainScheduleFormAction({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const fromStation = formData.get("fromStation")?.toString();
  const toStation = formData.get("toStation")?.toString();
  const departureTime = formData.get("departureTime")?.toString();
  const arrivalTime = formData.get("arrivalTime")?.toString();
  const trainNumber = formData.get("trainNumber")?.toString();

  const isEdit = params.id !== undefined;
  const method = isEdit ? "PATCH" : "POST";

  let body

  if(isEdit){
  body = JSON.stringify({
    id: params.id,
    fromStation,
    toStation,
    departureTime,
    arrivalTime,
    trainNumber, 
  })
}
  else{
    body = JSON.stringify({
      id: params.id,
      fromStation,
      toStation,
      departureTime,
      arrivalTime,
      trainNumber, 
      userId: 0
  })
}

  console.log(body)

  

  const url = isEdit
    ? `http://localhost:3000/train-schedule/${params.id}`
    : `http://localhost:3000/train-schedule`;

  
  console.log(url, method)

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+readToken(), 
    },
    body,
  });

  if (!response.ok) {
    return redirect('/train-schedule');
  }

  return redirect("/train-schedule");
}