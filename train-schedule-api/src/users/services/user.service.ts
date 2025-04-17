import { Injectable } from '@nestjs/common';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
      ) {}
    
      async findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
      }
    
      async findOne(id: number): Promise<UserEntity> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
      }
    
      async findByEmail(email: string): Promise<UserEntity | null> {
        return this.usersRepository.findOneBy({ email });
      }
    
      async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const { email, password } = createUserDto;
        
        // Check if user already exists
        const existingUser = await this.usersRepository.findOne({
          where: [{ email }],
        });
        
        if (existingUser) {
          throw new ConflictException('Username or email already exists');
        }
        
        // Hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create new user
        const user = this.usersRepository.create({
          email,
          password: hashedPassword,
        });
        
        return this.usersRepository.save(user);
      }
}
