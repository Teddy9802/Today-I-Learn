import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
@ObjectType()
export class PickList {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;
}
