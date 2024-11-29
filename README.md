
---

# COMP3123 Assignment 1

## Overview

This is the repository for **COMP3123 Assignment 1**. The application is built using **Node.js**, **Mongodb** and **Express**, and it provides a **RESTful API** for managing employees and user authentication.

### Features
- **User Authentication**: Sign up and log in to the application.
- **CRUD Operations**: Manage employee records (Create, Read, Update, Delete).
- **Secure Password Storage**: Passwords are hashed using **bcryptjs**.
- **Token-based Authentication**: **JSON Web Tokens (JWT)** are used for user authentication.

## Technologies Used
- **Node.js**: JavaScript runtime for server-side programming.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for data storage (via **Mongoose**).
- **bcryptjs**: Library for hashing passwords.
- **jsonwebtoken**: Library for generating and verifying JWTs.
- **dotenv**: Loads environment variables from a `.env` file.
- **express-validator**: Middleware for validating and sanitizing user input.

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/comp3123-assignment1.git
   cd comp3123-assignment1
   ```

2. **Install Dependencies**:
   Install all required dependencies using `npm`:
   ```bash
   npm install
   ```

3. **Create a `.env` File**:
   In the root directory, create a `.env` file and add the following environment variables:
   ```plaintext
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

   - Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string.
   - Replace `your_jwt_secret` with a secret string used for signing JWT tokens. **Keep this secret safe**.

4. **Start the Application**:
   Run the application in development mode:
   ```bash
   npm start
   ```

   The app will run on `http://localhost:5000`.

---

## API Endpoints

### User Authentication
- **POST /api/v1/user/register**: Register a new user.
  - **Body**: 
    ```json
    {
      "username": "exampleuser",
      "email": "user@example.com",
      "password": "securepassword123"
    }
    ```
  - **Response**: 
    ```json
    {
      "message": "User created successfully.",
      "user_id": "user_id_value"
    }
    ```

- **POST /api/v1/user/login**: Log in an existing user.
  - **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword123"
    }
    ```
  - **Response**: 
    ```json
    {
      "message": "Login successful",
      "token": "JWT_token_here"
    }
    ```

### Employee Management
- **GET /api/v1/emp/employees**: Retrieve all employees.
  - **Response**: A list of all employees in the database.
    ```json
    [
      {
        "employee_id": "employee_id_1",
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@example.com",
        "position": "Software Engineer",
        "salary": 90000,
        "date_of_joining": "2023-08-01",
        "department": "Engineering"
      },
      ...
    ]
    ```

- **POST /api/v1/emp/employees**: Create a new employee.
  - **Body**:
    ```json
    {
      "first_name": "Alice",
      "last_name": "Smith",
      "email": "alicesmith@example.com",
      "position": "Designer",
      "salary": 85000,
      "date_of_joining": "2023-08-10",
      "department": "Design"
    }
    ```
  - **Response**: 
    ```json
    {
      "message": "Employee created successfully.",
      "employee_id": "new_employee_id"
    }
    ```

- **GET /api/v1/emp/employees/:id**: Retrieve a specific employee by ID.
  - **Response**:
    ```json
    {
      "employee_id": "employee_id_1",
      "first_name": "John",
      "last_name": "Doe",
      "email": "johndoe@example.com",
      "position": "Software Engineer",
      "salary": 90000,
      "date_of_joining": "2023-08-01",
      "department": "Engineering"
    }
    ```

- **PUT /api/v1/emp/employees/:id**: Update an existing employee by ID.
  - **Body**:
    ```json
    {
      "position": "Senior Software Engineer",
      "salary": 100000
    }
    ```
  - **Response**: 
    ```json
    {
      "message": "Employee details updated successfully."
    }
    ```

- **DELETE /api/v1/emp/employees**: Delete an employee by ID.
  - **Query Parameter**: `eid=employee_id`
  - **Response**:
    ```json
    {
      "message": "Employee deleted successfully."
    }
    ```

---

## Testing

For testing, Postman has been used to manually check API endpoints.

### Example Test Case (Login)
1. **Test login**:
   - **URL**: `POST http://localhost:5000/api/v1/user/login`
   - **Body**:
     ```json
     {
       "email": "user@example.com",
       "password": "securepassword123"
     }
     ```
   - **Expected Response**:
     ```json
     {
       "message": "Login successful",
       "token": "JWT_token_here"
     }
     ```

2. **Test protected endpoint** (Employee retrieval):
   - **URL**: `GET http://localhost:5000/api/v1/emp/employees`
   - **Headers**:
     - Key: `Authorization`
     - Value: `Bearer JWT_token_here`

---

## Notes
- **JWT Token**: For any API that requires authentication, pass the JWT token obtained from the `login` endpoint in the **Authorization header** as a `Bearer Token`.
  
- **Environment Variables**: Ensure that your `.env` file contains the correct values, especially for the MongoDB connection string (`MONGODB_URI`) and JWT secret (`JWT_SECRET`).

- **Postman**: Ensure you have tested all the endpoints using Postman and have saved your Postman collection for future use.

---

### Final Thoughts
- **Security Considerations**: Remember to hash passwords securely using **bcryptjs** and protect sensitive data, like the JWT secret, using environment variables.
- **Production Environment**: When deploying to production, make sure to configure your MongoDB URI and JWT secret properly. Also, use HTTPS for secure communication.
