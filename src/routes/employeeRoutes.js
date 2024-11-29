const express = require('express'); // Import the Express framework
const {
    getAllEmployees, // Controller function to retrieve all employees
    createEmployee,   // Controller function to create a new employee
    getEmployeeById,  // Controller function to retrieve a specific employee by ID
    updateEmployee,   // Controller function to update an existing employee
    deleteEmployee,   // Controller function to delete an employee
} = require('../controllers/employeeController'); // Import all employee-related controller functions

const { verifyToken } = require('../middlewares/authMiddleware'); // Import middleware to verify authentication tokens

// Create a new router instance
const router = express.Router();

// Route to get all employees
// This route handles GET requests to /employees
// It requires a valid token for access
router.get('/employees', verifyToken, getAllEmployees);

// Route to create a new employee
// This route handles POST requests to /employees
// It also requires a valid token for access
router.post('/employees', verifyToken, createEmployee);

// Route to get a specific employee by ID
// This route handles GET requests to /employees/:id
// It requires a valid token for access
router.get('/employees/:id', verifyToken, getEmployeeById);

// Route to update an existing employee by ID
// This route handles PUT requests to /employees/:id
// It requires a valid token for access
router.put('/employees/:id', verifyToken, updateEmployee);

// Route to delete an employee
// This route handles DELETE requests to /employees
// It requires a valid token for access
router.delete('/employees', verifyToken, deleteEmployee);

// Export the router to be used in other parts of the application
module.exports = router;