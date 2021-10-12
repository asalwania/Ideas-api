import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdeaDto } from './idea.dto';
import { IdeaEntity } from './idea.entity';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
  ) {}

  // get all ideas
  public async showAll() {
    return await this.ideaRepository.find();
  }

  // create new idea
  public async create(data: IdeaDto) {
    const idea = await this.ideaRepository.create(data);
    await this.ideaRepository.save(idea);
    return idea;
  }

  // get idea by id
  public async read(id: string) {
    const idea = await this.ideaRepository.findOne({ where: { id } });
    if (!idea) {
      throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
    }
  }

  // update idea by id
  public async update(id: string, data: Partial<IdeaDto>) {
    const idea = await this.ideaRepository.findOne({ where: { id } });
    if (!idea) {
      throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
    }
    await this.ideaRepository.update({ id }, data);
    return await this.ideaRepository.findOne({ id });
  }

  // delete idea by id
  public async delete(id: string) {
    const idea = await this.ideaRepository.findOne({ where: { id } });
    if (!idea) {
      throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
    }
    await this.ideaRepository.delete({ id });
    return { deleted: true };
  }
}
