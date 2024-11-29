const Employee = require('../models/employee'); // Import the Employee model

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        // Fetch all employee records from the database
        const employees = await Employee.find();
        // Respond with a 200 status and the list of employees
        res.status(200).json(employees);
    } catch (error) {
        // Handle any errors that occur during the fetching process
        res.status(500).json({ message: error.message });
    }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
    // Destructure employee details from the request body
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    try {
        // Create a new employee instance with the provided details
        const employee = new Employee({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department,
        });
        // Save the new employee to the database
        await employee.save();
        // Respond with a success message and the newly created employee's ID
        res.status(201).json({ message: 'Employee created successfully.', employee_id: employee._id });
    } catch (error) {
        // Handle any errors that occur during the employee creation process
        res.status(400).json({ message: error.message });
    }
};

// Get employee details by ID
exports.getEmployeeById = async (req, res) => {
    try {
        // Fetch the employee record by ID from the request parameters
        const employee = await Employee.findById(req.params.id);
        // If no employee is found, respond with a 404 status
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        // Respond with a 200 status and the employee details
        res.status(200).json(employee);
    } catch (error) {
        // Handle any errors that occur during the fetching process
        res.status(500).json({ message: error.message });
    }
};

// Update employee details
exports.updateEmployee = async (req, res) => {
    try {
        // Update the employee record by ID with the new data from the request body
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // If no employee is found, respond with a 404 status
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        // Respond with a success message and the updated employee details
        res.status(200).json({ message: 'Employee details updated successfully.', employee });
    } catch (error) {
        // Handle any errors that occur during the updating process
        res.status(400).json({ message: error.message });
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
    try {
        // Get the employee ID from the query parameters
        const employeeId = req.query.eid; 
        // Attempt to find and delete the employee by ID
        const employee = await Employee.findByIdAndDelete(employeeId); 

        // If no employee is found, respond with a 404 status
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        // Respond with a success message upon successful deletion
        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        // Handle any errors that occur during the deletion process
        res.status(500).json({ message: error.message });
    }
};