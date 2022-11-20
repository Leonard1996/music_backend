# Run the application

    1. npm install
    2. download and start redis server on your machine
    3. create an .env file from .env_example
    4. download, install mysql server on your machine and create a db according to env variables
    5. inside redis.createClient at app.ts file (starting line 15) change host to "127.0.0.1"
    3. at ormconfig.js change host from 'db' to '127.0.0.1'
    5. npm run start from project root

# Run from docker (Updated)

    1. create an .env file from .env_example
    2. run docker-compose up from root of project (create a db according to your env inside a docker container)

# Archicture and functionalities

    Services includes are nodejs backend running express server on typescript and TypeOrm for db interactions, redis instance caching all suggestions and is populated asynchronously everytime a new search is made, mysql server as persistance layer having 3 tables (users, searchHistory, favorites).

    Most of api's are self explanatory, with the most complex being 'GET http://localhost:3001/songs?keyword=', as the result given back depends on favorites of the user, a weight is assigned to each song and the songs retrieved from the api are then ordered according to this weight.

# API keys

    API_URL=https://youtube-music1.p.rapidapi.com/v2/search
    API_KEY=c9af558b31mshf827de2663c0241p145d49jsn3a14b49d2752
    API_HOST=youtube-music1.p.rapidapi.com

# Useful Notes

    Mysql schemma attached under file 'db.png'
    Postman testing collection I used (might need a couple of changes ex. bearer token) attached under file 'postman.json'
