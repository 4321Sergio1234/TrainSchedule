import { Link, useRouteLoaderData } from 'react-router-dom';
import { TrainScheduleDto } from '../utils/dto/TrainScheduleDto';
import classes from './TrainScheduleItem.module.css'

interface TrainScheduleItemProps {
  schedule: TrainScheduleDto;
}

export default function TrainScheduleItem({ schedule }: TrainScheduleItemProps) {
  const token = useRouteLoaderData('root');

  return (
    <div className={classes.scheduleItem}>
      <h3>{schedule.trainNumber}</h3>
      <p>{schedule.fromStation} → {schedule.toStation}</p>
      <p>Departure: {new Date(schedule.departureTime).toLocaleString()}</p>
      {token ? <Link to={`${schedule.id}`}>Детальніше</Link> : undefined}
    </div>
  );
}