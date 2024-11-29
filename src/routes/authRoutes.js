const express = require('express'); // Import the Express framework
const { signup, login } = require('../controllers/authController'); // Import signup and login controller functions

// Create a new router instance
const router = express.Router();

// Define the route for user signup
// This route will handle POST requests to /signup
router.post('/signup', signup);

// Define the route for user login
// This route will handle POST requests to /login
router.post('/login', login);

// Export the router to be used in other parts of the application
module.exports = router;