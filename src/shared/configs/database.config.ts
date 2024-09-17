import { registerAs } from '@nestjs/config';

import { DatabaseModuleParams } from '../database/database.module';

export type DatabaseConfig = DatabaseModuleParams;

export const parseDatabaseConfig = registerAs(
  'database',
  (): DatabaseConfig => {
    switch (process.env.DB_TYPE) {
      case 'mongodb':
      default:
        return {
          type: 'mongodb',
          mongoose: {
            uri: process.env.MONGODB_URI,
            options: {},
          },
        };
    }
  },
);

export const databaseConfig = parseDatabaseConfig();
