import { Form, Link } from 'react-router-dom';
import { TrainScheduleDto } from '../utils/dto/TrainScheduleDto';
import classes from './TrainScheduleItemInfo.module.css';

interface TrainScheduleItemInfoProps {
  schedule: TrainScheduleDto;
}

export default function TrainScheduleItemInfo({ schedule }: TrainScheduleItemInfoProps) {
  return (
    <div className={classes.scheduleDetails}>
      <h2>{schedule.fromStation} → {schedule.toStation}</h2>
      <div className={classes.detailRow}>
        <span>Потяг:</span>
        <span>{schedule.trainNumber}</span>
      </div>
      <div className={classes.detailRow}>
        <span>Маршрут:</span>
        <span>{schedule.fromStation} → {schedule.toStation}</span>
      </div>
      <div className={classes.detailRow}>
        <span>Відправлення:</span>
        <span>{new Date(schedule.departureTime).toLocaleString()}</span>
      </div>
      <div className={classes.detailRow}>
        <span>Прибуття:</span>
        <span>{new Date(schedule.arrivalTime).toLocaleString()}</span>
      </div>

      <Form action={`delete`} method='post'>
        <button type="submit">Скасувати</button>
      </Form>
      <Link to='edit' className={classes.button}>Редагувати</Link>
      <Link to='..' className={classes.button}>Назад</Link>
    </div>
  );
}
