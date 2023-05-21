import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
  ) {}

  async create(createProjectInput: CreateProjectInput): Promise<Project> {
    let createProject = this.projectRepo.create(createProjectInput);
    return this.projectRepo.save(createProject);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepo.find({
      relations: ['employees'],
    });
  }

  async findOne(id: string): Promise<Project> {
    return this.projectRepo.findOne({ where: { id } });
  }

  update(id: string, updateProjectInput: UpdateProjectInput) {
    let project: Project = this.projectRepo.create(updateProjectInput);
    project.id = id;
    return this.projectRepo.save(project);
  }

  remove(id: string) {
    return this.projectRepo.delete(id);
  }
}
