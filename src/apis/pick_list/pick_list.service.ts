import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PickList } from './entities/pick_list.entity';

@Injectable()
export class PickListService {
  constructor(
    @InjectRepository(PickList)
    private readonly PickListRepository: Repository<PickList>,
  ) {}
}
