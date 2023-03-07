# Rest Api with Unit tests | Supertest | NodeJS | Express | MongoDB

This project is a REST API with unit tests implemented using Supertest. The API is built with NodeJS and Express, and it interacts with a MongoDB database.
Requirements
NodeJS
MongoDB
Getting Started
Clone the repository
Install dependencies with npm install
Start the server with npm start
Running Tests
Run npm test to run all the tests
Run npm run test:unit to run the unit tests

Here are the endpoints for the video games API:

POST / : Creates a new video game
DELETE / : Deletes a video game
GET / : Returns all video games
GET /one : Returns a specific video game by ID
Deletes a specific user by ID

Unit Tests
The unit tests are implemented using Supertest and can be found in the test directory. They cover all the API endpoints and ensure that the responses are correct and that errors are handled properly.

Here are the scripts available in the project:

serve: Starts the development server with nodemon and automatically reloads the server when changes are detected
start: Starts the production server using node
test: Runs the Jest test suite
lint: Lints the entire project using ESLint
format: Formats the codebase using Prettier to ensure consistent code style.
