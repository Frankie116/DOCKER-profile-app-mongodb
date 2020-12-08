FROM node:13-alpine

# set environment variables if required.  Its better to set variables in the docker-compose file for flexibility.
ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

# create directory inside the container
RUN mkdir -p /home/app

# copy current folder files from HOST to /home/app on CONTAINER. 
# multiple RUN commands can exist within Dockerfile.
COPY ./app /home/app

# execute the entrypoint linux command.  i.e start the app with "node server.js"
# only one entrypoint CMD can exist within Dockerfile
CMD ["node", "/home/app/server.js"]
