# Inherit image from node over linux alpine:
FROM node:18-alpine3.19

# Install nodemon:
RUN npm i -g nodemon

# Install ts-node:
RUN npm i -g ts-node

# Create app folder: 
WORKDIR /app

# Copy package.json + package-lock.json:
COPY package*.json /app

# Install node_modules: 
RUN npm i

# Copy entire backend:
COPY . /app

EXPOSE 8080

# Execute command for the container: 
ENTRYPOINT npm start

