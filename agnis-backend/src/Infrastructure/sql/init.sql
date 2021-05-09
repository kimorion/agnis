CREATE DATABASE agnis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users
(
    id         uuid PRIMARY KEY,
    first_name varchar(100),
    last_name  varchar(100),
    birthdate  date,
    bio        varchar(200)
);

CREATE TABLE blogs
(
    id      uuid PRIMARY KEY,
    user_id uuid,
    name    varchar(200)
);


