
# check running containers
docker ps    

# check running/stopped containers
docker ps -a 

# start containers in detatched mode
docker-compose -f mongo.yaml up -d    


# To start the node front end...

node server.js


# stop containers in detatched mode
docker-compose -f mongo.yaml down