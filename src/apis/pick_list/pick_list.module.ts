import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickList } from './entities/pick_list.entity';
import { PickListResolver } from './pick_list.resolver';
import { PickListService } from './pick_list.service';

@Module({
  imports: [TypeOrmModule.forFeature([PickList])],
  providers: [PickListResolver, PickListService],
})
export class PickListModule {}
