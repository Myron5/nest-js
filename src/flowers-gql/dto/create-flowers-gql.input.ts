import { Field, Float, InputType, PickType } from '@nestjs/graphql';

import { FlowersModel } from './flowers-gql.entity';

@InputType()
export class CreateFlowersGqlInput extends PickType(
  FlowersModel,
  ['name', 'price'] as const,
  InputType,
) {
  // Redefinition
  @Field(() => String, { nullable: true })
  color?: string;
}
