import { Field, InputType, OmitType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends OmitType(
  User,
  ['id', 'profileImage'],
  InputType,
) {
  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  profileImage: string;
}
