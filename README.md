# frontend
Adifect Frontend React app.
# Node version 
```
nodejs version : v18.8.0
npm version : 8.18.0
```
# build steps in local 
clone this repo and execute the following command 
```
cd frontend 
npm start [ for running it in local development mode ]
npm build [ to build the static files and artifect for production deployment ]
npm test  [ to run the test script]
```
# Docker setup
to run the frontend in docker environment install docker in your system and follow the following steps.
```
cd frontend

docker build -t adifect-frontent:latest .  [build the latest docker image]
docker run -d --name adifect-frontend -p 80:80 adifect-frontent:latest  [ run the container from latest docker image]
docker ps -a [ to list the running container]

docker stop adifect-frontend [ stop the running container]
docker rm -f adifect-frontend [ deleting the container ]
```

