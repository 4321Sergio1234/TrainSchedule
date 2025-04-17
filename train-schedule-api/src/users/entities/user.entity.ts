import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { TrainScheduleEntity } from 'src/train-schedule/entities/train-schedule.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => TrainScheduleEntity, trainSchedule => trainSchedule.user)
  trainSchedule:TrainScheduleEntity[]; 

  @CreateDateColumn()
  createdAt: Date;
}