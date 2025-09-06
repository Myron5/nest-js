import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';

// export const AuthGuardLevels = {
//   USER: 'user',
//   ADMIN: 'admin',
// } as const;

// export type AuthGuardLevel =
//   (typeof AuthGuardLevels)[keyof typeof AuthGuardLevels];

export enum AuthGuardLevels {
  UNAUTHORIZED = 0,
  USER = 1,
  ADMIN = 10,
}

const getLevelName = (actualAcessLevel: AuthGuardLevels) => {
  return Object.keys(AuthGuardLevels).find(
    (key) => AuthGuardLevels[key] === actualAcessLevel,
  );
};

const simulationDB = (token: string | undefined) => {
  switch (token) {
    case 'secret': {
      return AuthGuardLevels.USER;
    }
    case 'admin_secret': {
      return AuthGuardLevels.ADMIN;
    }
    default: {
      return AuthGuardLevels.UNAUTHORIZED;
    }
  }
};

export const AuthGuard = (RequiredAuthGuardLevel: AuthGuardLevels) => {
  @Injectable()
  class AuthGuardImpl implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request: Request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
      const actualAcessLevel = simulationDB(authHeader);

      console.log('Actual Acess Level', getLevelName(actualAcessLevel));

      if (actualAcessLevel === AuthGuardLevels.UNAUTHORIZED)
        throw new UnauthorizedException('Not authorized');

      if (actualAcessLevel < RequiredAuthGuardLevel)
        throw new ForbiddenException('Not enough access rights');

      return true;
    }
  }

  return AuthGuardImpl;
};
