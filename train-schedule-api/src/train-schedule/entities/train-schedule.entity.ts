import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('schedule')
export class TrainScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  trainNumber: string

  @Column({ length: 100 })
  fromStation: string;

  @Column({ length: 100 })
  toStation: string;

  @Column('timestamp with time zone')
  departureTime: Date

  @Column('timestamp with time zone')
  arrivalTime: Date

  @ManyToOne(() => UserEntity, user => user.trainSchedule)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}

