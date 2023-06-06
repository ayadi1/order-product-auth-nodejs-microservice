# Microservices Repository

This repository contains three microservice projects built with Node.js: `product`, `order`, and `auth`. Each project is containerized using Docker and has its own `Dockerfile` for easy deployment and scalability.

## Project Structure

The repository is organized as follows: ;

    - product/
        - Dockerfile
        - middleware
        - models
        - db.js
        - main.js

    - order/
        - Dockerfile
        - middleware
        - models
        - db.js
        - main.js

    - auth/
        - Dockerfile
        - models
        - db.js
        - main.js

## Getting Started

To get started with each microservice project, follow the instructions below.

### Product Microservice

1. Navigate to the `product` directory.
2. Build the Docker image for the product service.
3. Run the Docker container for the product service.
4. Access the product service API at `http://localhost:3000`.

### Order Microservice

1. Navigate to the `order` directory.
2. Build the Docker image for the order service.
3. Run the Docker container for the order service.
4. Access the order service API at `http://localhost:3001`.

### Auth Microservice

1. Navigate to the `auth` directory.
2. Build the Docker image for the authentication service.
3. Run the Docker container for the authentication service.
4. Access the authentication service API at `http://localhost:3002`.

## Additional Information

Each microservice project may have its own set of dependencies, configuration files, and specific usage instructions. Make sure to refer to the individual project's documentation for more details.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This repository is licensed under the [MIT License](LICENSE).
