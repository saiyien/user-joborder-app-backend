# User and Job Order Management Application

This is a Node.js application for managing user information and job orders. It provides functionalities to list, create, update, and delete users along with their associated job orders. The application can be run using Docker for easy deployment and testing.

## Getting Started

### Prerequisites

- Docker (latest version)
- Docker Compose (latest version)

### Installation and Setup

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/your-username/user-joborder-app.git
   ```

2. Navigate to the project directory:

   ```
   cd user-joborder-app
   ```

### Running the Application with Docker

1. Build and start the Docker containers:

   ```bash
   docker-compose up --build
   ```

   Docker Compose will build the application image using the provided `Dockerfile`, start the MongoDB container, and connect them together.

2. The application will be accessible at:

   ```
   http://localhost:3000
   ```

### API Endpoints

- `GET /users` - List all users with pagination
- `PUT /users/:id` - Update a user with a new job order
- `POST /users` - Create a new user
- `DELETE /users/:id` - Delete a user

### Authentication

- Protected routes require a valid JWT token. Obtain a token by logging in via the `/login` endpoint.

### Testing

To run unit tests:

```bash
npx mocha test/*.test.js
```
