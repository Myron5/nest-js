import { Module } from '@nestjs/common';

import { FlowersService } from 'src/flowers/flowers.service';
import { FlowersGqlResolver } from './flowers-gql.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [FlowersGqlResolver, FlowersService, PrismaService],
})
export class FlowersGqlModule {}
