const express = require('express'); // Import the Express framework
const bodyParser = require('body-parser'); // Import body-parser middleware to parse incoming request bodies
const dotenv = require('dotenv'); // Import dotenv to manage environment variables
const connectDB = require('./config/db'); // Import the database connection function

// Load environment variables from .env file into process.env
dotenv.config();

// Connect to the database
connectDB();

// Import route modules for authentication and employee management
const authRoutes = require('./routes/authRoutes'); // Routes for user authentication
const employeeRoutes = require('./routes/employeeRoutes'); // Routes for employee management

// Create a new Express application
const app = express();

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define routes for the application
// All user-related routes will be prefixed with /api/v1/user
app.use('/api/v1/user', authRoutes);

// All employee-related routes will be prefixed with /api/v1/emp
app.use('/api/v1/emp', employeeRoutes);

// Export the Express application for use in other parts of the application (e.g., server file)
module.exports = app;