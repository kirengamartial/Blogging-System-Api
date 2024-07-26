# Blogging System API

## Overview

This project is a Node.js based blogging system API that provides essential functionalities required for managing a blogging platform. It includes features such as user authentication, basic models for data management, and CRUD (Create, Read, Update, Delete) operations.

## Features

- **User Authentication**: Implemented secure authentication mechanisms to protect user data and control access.
- **Basic Models**: Defined fundamental data models to manage various entities within the blogging system.
- **CRUD Operations**: Comprehensive support for Create, Read, Update, and Delete operations to manage content effectively.

## Technologies Used

- **Node.js**: JavaScript runtime used to build the backend of the application.
- **Express.js**: Frameworks used to structure the application, providing a clean and maintainable architecture.
- **MongoDB**: NoSQL database for storing data.
- **JWT**: JSON Web Tokens for secure user authentication.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **Jest**: JavaScript testing framework for unit and integration tests.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 14 or above)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SugiraVinc/Summative-Project_DevOps.git
   cd Summative-Project_DevOps
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/blogging-system
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Run tests:
   ```bash
   npm test
   ```

### API Endpoints

- **Authentication**

  - `POST /api/users/register` - Register a new user
  - `POST /api/users/login` - Authenticate a user and retrieve a token

- **Blog Posts**
  - `GET /api/blogs` - Retrieve all blog posts
  - `POST /api/blogs/create` - Create a new blog post
  - `GET /api/blogs/:id` - Retrieve a single blog post by ID
  - `PUT /api/blogs/edit/:id` - Update a blog post by ID
  - `DELETE /api/blogs/delete/:id` - Delete a blog post by ID

## Contributing

We welcome contributions from the community. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.
