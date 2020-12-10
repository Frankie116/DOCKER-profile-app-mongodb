## -----------------------------------------------------------------------------------
# Project: lab051a-build-docker-image
## Purpose: Creates three interconnected docker containers which make up a sample app.
   Author: Frank Effrim-Botchey
## -----------------------------------------------------------------------------------


- Mongodb - standard container pulled from dockerhub
- Mongo-express - standard container pulled from dockerhub
- Custom - custom container built ontop of a node base which provides a simple user profile application. 

The docker image created is used by lab048-tf-fargate thich spins up 2 fargate instances hosting redundant loadbalanced versions of this app.



