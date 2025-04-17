import { Link } from 'react-router-dom';
import { TrainScheduleDto } from '../utils/dto/TrainScheduleDto';
import TrainScheduleItem from './TrainScheduleItem';
import classes from './TrainScheduleTable.module.css'
import { readToken } from '../utils/tokenUtil';

interface TrainScheduleTableProps {
  schedules: TrainScheduleDto[];
}

export default function TrainScheduleTable({ schedules }: TrainScheduleTableProps) {
  return (
    <div className={classes.scheduleTable}>
      {readToken() ? <Link to='add'>Додати</Link> : undefined}
      {schedules.map(schedule => (
        <TrainScheduleItem key={schedule.id} schedule={schedule} />
      ))}
    </div>
  );
}