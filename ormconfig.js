require('dotenv').config()

module.exports = {
  "type": "mysql",
  "host": 'db',
  "port": process.env.DB_PORT,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB,
  "synchronize": true,
  "logging": process.env.LOGGING === 'true',
  "entities": ["dist/**/*.entity{.ts,.js}", "src/**/*.entity{.ts,.js}"],
  "migrations": ["dist/migration/**/*.js"],
  "subscribers": ["dist/**/*.subscriber.js"],
  "cli": {
    "entitiesDir": "src/entities",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}
