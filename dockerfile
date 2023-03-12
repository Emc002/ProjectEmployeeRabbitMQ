# Use an official Node.js runtime as a parent image
FROM node:19-slim

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Bundle the app's source code inside the Docker image
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
