# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the Docker image
COPY package*.json ./

# Install the application's dependencies inside the Docker image
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Copy the rest of your application's source code into the Docker image
COPY . .

# Expose port 3000 in the Docker image
EXPOSE 8080

# Define the command that should be executed when the Docker image starts as a container
CMD [ "npm", "start" ]