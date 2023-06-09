import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { EmployeeCreateDto } from './dto/create-employee.input';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private projectService: ProjectService,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: string) {
    return this.employeeRepository.findOne({ where: { id } });
  }

  async create(employee: EmployeeCreateDto): Promise<Employee> {
    let emp = this.employeeRepository.create(employee);
    return this.employeeRepository.save(emp);
  }

  async getProject(id: string): Promise<Project> {
    return this.projectService.findOne(id);
  }
}
