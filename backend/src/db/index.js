"use strict";
exports.__esModule = true;
var pg = require("pg");
var client = new pg.Client("postgress://localhost/tournament_tracker");
client
    .connect()
    .then(function () { return console.log("connected"); })["catch"](function (err) { return console.log(err); });
client.query("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";\n  DO\n  $do$\n  BEGIN\n    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'format') THEN\n      CREATE TYPE format as ENUM ('round-robin', 'single-elimination');\n    END IF;\n    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status') THEN\n      CREATE TYPE status as ENUM ('open', 'locked');\n    END IF;\n  CREATE TABLE IF NOT EXISTS tournaments \n  (id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), \n  title VARCHAR (255) NOT NULL, \n  format format NOT NULL, \n  avatar VARCHAR (255), \n  status status NOT NULL);\n  CREATE TABLE IF NOT EXISTS competitors(\n    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),\n    name VARCHAR (255),\n    avatar VARCHAR (255)\n  );\n  END;\n  $do$;\n  ");
