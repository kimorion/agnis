import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'agnis',
  synchronize: false,
  entities: ['src/Infrastructure/Entities/**/*.{js,ts}'],
  migrations: ['src/Infrastructure/Migrations/*.{js,ts}'],
  cli: {
    entitiesDir: 'src/Infrastructure/Entities',
    migrationsDir: 'src/Infrastructure/Migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
};
