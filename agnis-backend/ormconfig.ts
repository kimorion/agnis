import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'agnis',
  synchronize: false,
  entities: ['dist/src/Infrastructure/Entities/**/*.{js,ts}'],
  migrations: ['dist/src/Infrastructure/Migrations/*.{js,ts}'],
  cli: {
    entitiesDir: 'src/Infrastructure/Entities',
    migrationsDir: 'src/Infrastructure/Migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export = config;
