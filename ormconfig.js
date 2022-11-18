module.exports = {
  "type": "mysql",
  "host": '127.0.0.1',
  "port": 3306,
  "username": "admin",
  "password": "admin321",
  "database": "music_db",
  "synchronize": true,
  "logging": false,
  "entities": ["dist/**/*.entity{.ts,.js}", "src/**/*.entity{.ts,.js}"],
  "migrations": ["dist/migration/**/*.js"],
  "subscribers": ["dist/**/*.subscriber.js"],
  "cli": {
    "entitiesDir": "src/entities",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}
