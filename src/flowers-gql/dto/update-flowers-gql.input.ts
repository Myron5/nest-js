import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateFlowersGqlInput } from './create-flowers-gql.input';

@InputType()
export class UpdateFlowersGqlInput extends PartialType(CreateFlowersGqlInput) {}

@InputType()
export class UpdateFlowersWithIdGqlInput extends UpdateFlowersGqlInput {
  // @Field(() => ID)   always returns string. Only for uuid e.t.c
  @Field(() => Int)
  id!: number;
}
