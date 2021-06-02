
#define the latest nodejs image  to build from
FROM node:latest

# Set working directory for API yarn start
RUN mkdir /mlapi
WORKDIR /mlapi

# Bundle app source
COPY dist/ .

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 4001

# command to run when intantiate an image
CMD ["node","server.js"]
