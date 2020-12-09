BRANCH "master" 
Changelog-001
Initial code configured 

Changelog 002
Updated mongo-express port to 8081

Changelog 003
Added readme.md

Changelog 004
Added node server. updated readme.md

Changelog 005
updated server.js to use dockerurl instead of localurl (localhost:).  
    - This is required when running app from container instead of starting server.js locally.
updated docker-compose file (mongo.yaml) to pull the my-app image from AWS ECR...
updated readme.md