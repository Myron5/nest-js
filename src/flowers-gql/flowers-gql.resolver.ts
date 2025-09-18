// import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

// import { AuthGuard, AuthGuardLevels } from 'src/common/Guards/AuthGuard';
import { GrapgQlError } from 'src/common/Decorators/graphql-errors.decorator';
import { FlowersService } from 'src/flowers/flowers.service';

import { CreateFlowersGqlInput } from './dto/create-flowers-gql.input';
import { FlowersModel } from './dto/flowers-gql.entity';
import { UpdateFlowersWithIdGqlInput } from './dto/update-flowers-gql.input';

// const { USER, ADMIN } = AuthGuardLevels;

@Resolver()
export class FlowersGqlResolver {
  constructor(private readonly flowersService: FlowersService) {
    this.flowersService.findOne = GrapgQlError(this.flowersService.findOne);
    this.flowersService.create = GrapgQlError(this.flowersService.create);
    this.flowersService.update = GrapgQlError(this.flowersService.update);
    this.flowersService.remove = GrapgQlError(this.flowersService.remove);
  }

  @Mutation(() => FlowersModel, { nullable: true })
  createFlower(
    @Args('input', { type: () => CreateFlowersGqlInput })
    input: CreateFlowersGqlInput,
  ) {
    return this.flowersService.create(input);
  }

  @Mutation(() => [FlowersModel])
  createFlowers(
    @Args('inputs', { type: () => [CreateFlowersGqlInput] })
    inputs: CreateFlowersGqlInput[],
  ) {
    return this.flowersService.createMany(inputs);
  }

  // @UseGuards(AuthGuard(USER))
  @Query(() => FlowersModel, { nullable: true })
  async flower(@Args('id', { type: () => Int }) id: number) {
    return await this.flowersService.findOne(id);
  }

  @Query(() => [FlowersModel])
  // @UseGuards(AuthGuard(USER))
  async flowers(
    @Args('ids', { type: () => [Int], nullable: true }) ids?: number[],
  ) {
    if (ids) {
      return await this.flowersService.findMany(ids);
    }
    return await this.flowersService.findAll();
  }

  @Mutation(() => FlowersModel, { nullable: true })
  async updateFlower(
    @Args('input', { type: () => UpdateFlowersWithIdGqlInput })
    input: UpdateFlowersWithIdGqlInput,
  ) {
    return await this.flowersService.update(input);
  }

  @Mutation(() => [FlowersModel])
  async updateFlowers(
    @Args('inputs', { type: () => [UpdateFlowersWithIdGqlInput] })
    inputs: UpdateFlowersWithIdGqlInput[],
  ) {
    return await this.flowersService.updateMany(inputs);
  }

  @Mutation(() => FlowersModel, { nullable: true })
  async removeFlower(@Args('id', { type: () => Int }) id: number) {
    return await this.flowersService.remove(id);
  }

  @Mutation(() => [FlowersModel])
  async removeFlowers(@Args('ids', { type: () => [Int] }) ids: number[]) {
    return await this.flowersService.removeMany(ids);
  }
}
