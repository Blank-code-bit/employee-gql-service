import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Employee } from './entities/employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeCreateDto } from './dto/create-employee.input';
import { Project } from 'src/project/entities/project.entity';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}

  @Query(() => [Employee], { name: 'getAllEmployees' })
  findAll() {
    return this.employeeService.findAll();
  }

  @Mutation(() => Employee, { name: 'createEmployee' })
  create(@Args('employeeInput') employeeInput: EmployeeCreateDto) {
    return this.employeeService.create(employeeInput);
  }

  @Query(() => Employee)
  findOne(@Args('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @ResolveField(() => Project)
  project(@Parent() employee: Employee) {
    return this.employeeService.getProject(employee.projectId);
  }
}
