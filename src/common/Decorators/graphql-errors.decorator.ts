import { GraphQLError } from 'graphql';

export function GrapgQlError(originalClbck: Function) {
  return async function (...args: any[]) {
    try {
      return await originalClbck.apply(this, args);
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }

      throw new GraphQLError(error?.message || '', {
        extensions: { code: error?.statusCode || 500 || 'INTERNAL_ERROR' },
      });
    }
  };
}
