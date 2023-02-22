import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  nickname: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  // @Column()
  // @Field(() => String)
  // gender: string;

  // @Column()
  // @Field(() => String)
  // age: string;

  @Column()
  @Field(() => String)
  phone_number: string;

  @Column()
  @Field(() => String)
  grade: string;

  @Column()
  @Field(() => String)
  profileImage: string;

  @Column()
  @Field(() => String)
  mbti: string;

  @Column()
  @Field(() => String)
  intro: string;
}
