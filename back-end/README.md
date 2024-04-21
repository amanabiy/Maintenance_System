# Maintenance System - Backend

Welcome to the Backend directory of the Maintenance System project!

## Installation

Before proceeding with the installation, ensure you have the following requirements:

- Docker installed on your machine. You can download and install Docker from [here](https://www.docker.com/get-started).
- Node.js and npm installed on your machine. You can download and install Node.js from [here](https://nodejs.org/).

Follow these steps for the initial setup:

1. **Navigate to the Backend directory:**

    If you're not already in the Backend directory, navigate to it using the `cd` command:

    ```bash
    cd back-end
    ```

2. **Install dependencies by running:**

    ```bash
    npm install
    ```

3. **Populate the parameters in the `.env` file by copying the sample and filling in the fields:**

    ```bash
    cp .env.sample .env
    ```

    Then, fill in the variables with your desired values.

4. **Finally, start the application using Docker Compose:**

    ```bash
    docker-compose up
    ```

## Usage

Once the setup is complete, use the following command to start the application, which will be hosted on localhost port 8081:

Also, find the Swagger documentation at the route `/api`, for example, `http://localhost:8081/api/`.

```bash
docker-compose up
```

## Contributing

Contributions are welcome! Please adhere to the guidelines outlined in the main README.md file. Feel free to submit pull requests and contribute to the improvement of the project. Thank you for your support!