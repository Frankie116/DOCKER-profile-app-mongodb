
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

# view current docker images
docker images

# edit server.js to use dockerurl instead of localurl (localhost:)

# build the image using the Dockefile
docker build -t my-app:2.1 .

# view current docker images
docker images
# run the docker image to create the app in a container
docker run -d my-app:2.1

## check running/stopped containers
docker ps

## login to AWS to enable the image to be pushed to AWS repo
aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 396057208705.dkr.ecr.eu-west-2.amazonaws.com

## tag the local image 
docker tag my-app:1.8 396057208705.dkr.ecr.eu-west-2.amazonaws.com/my-app:2.1

# verify local tag has changed
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



