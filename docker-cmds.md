# commands

## create docker network
docker network create mongo-network

## start mongodb --- CONTAINER NEEDS TO BE NAMED 'mongodb'
docker run -d \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=password \
--net mongo-network \
--name mongodb \
mongo

## start mongo-express
docker run -d \
-p 8081:8081 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
-e ME_CONFIG_MONGODB_SERVER=mongodb \
--net mongo-network \
--name mongo-express \
mongo-express


## start my-app
docker run -d \
-p 3000:3000 \
--net mongo-network \
--name my-app2 \
396057208705.dkr.ecr.eu-west-2.amazonaws.com/my-app:local3.0



## start mongo-express
docker run -d \
-p 3000:3000 \
--net mongo-network \
--name my-app \
396057208705.dkr.ecr.eu-west-2.amazonaws.com/my-app:docker3.0


## -------------------------------------------------

## check running containers
docker ps    

## check running/stopped containers
docker ps -a 

## start containers in detatched mode
docker-compose -f mongo.yaml up -d    

## To start the node front end...
node server.js

## stop containers in detatched mode
docker-compose -f mongo.yaml down

## view current docker images
docker images

## edit server.js to use dockerurl instead of localurl (localhost:)

## build the image using the Dockefile
docker build -t my-app:2.1 .

## view current docker images
docker images

## run the docker image to create the app in a container
docker run -d my-app:2.1

## check running/stopped containers
docker ps

## login to AWS to enable the image to be pushed to AWS repo
aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 396057208705.dkr.ecr.eu-west-2.amazonaws.com

## tag the local image 
docker tag my-app:1.8 396057208705.dkr.ecr.eu-west-2.amazonaws.com/my-app:2.1

## verify local tag has changed
docker images

## push image to AWS ECR
docker push 396057208705.dkr.ecr.eu-west-2.amazonaws.com/my-app:2.1

## update docker-compose file (mongo.yaml) to pull the my-app image from AWS ECR...
## and run the container using ports 3000:3000

## run image on dev server (need to have logged into aws)
docker-compose -f mongo.yaml up -d 

## browse/update the following url's on local server (which containers are running on):
## localhost:8080 - mongo-express
## localhost:3000 - my-app (update profile)
## localhost:27017 - mongodb
