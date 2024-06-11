# Use the official Node.js 14 image as base
FROM node:18

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

COPY .eslintrc.js \
.prettierrc \
nest-cli.json \
tsconfig.json \
tsconfig.build.json \
.env ./

COPY ./public ./public
COPY ./src ./src
COPY ./test ./test

COPY ./ssl /usr/src/app/ssl

# Expose the port that your app runs on
EXPOSE 443
EXPOSE 80
EXPOSE 8081


# Command to run your app
CMD ["npm", "run", "start:dev --max-old-space-size=4096"]
