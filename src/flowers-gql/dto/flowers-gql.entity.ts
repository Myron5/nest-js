import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FlowersModel {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'Name for flower example (Rose)' })
  name: string;

  @Field(() => String)
  color: string;

  @Field(() => Float)
  price: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
