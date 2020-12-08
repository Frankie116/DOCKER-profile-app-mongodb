
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

# build the image using the Dockefile
docker build -t my-app:1.1 .

# view current docker images
docker images
# run the docker image to create the app in a container
docker run -d my-app:1.1

## check running/stopped containers
docker ps

## browse


## push image to AWS ECR
aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 396057208705.dkr.ecr.eu-west-2.amazonaws.com

docker tag my-app:1.0 396057208705.dkr.ecr.eu-west-2.amazonaws.com/my-app:1.0  

