import { SetMetadata } from '@nestjs/common';
import { ROLE_TYPE } from 'app.config';

export const Roles = (...roles: ROLE_TYPE[]) => SetMetadata('roles', roles);
