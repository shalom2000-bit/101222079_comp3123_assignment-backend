const mongoose = require('mongoose'); // Import Mongoose library for MongoDB object modeling

// Define the schema for the Employee model
const EmployeeSchema = new mongoose.Schema({
    // First name of the employee (required)
    first_name: { type: String, required: true },
    
    // Last name of the employee (required)
    last_name: { type: String, required: true },
    
    // Email address of the employee (required)
    email: { type: String, required: true },
    
    // Position of the employee within the company (required)
    position: { type: String, required: true },
    
    // Salary of the employee (required)
    salary: { type: Number, required: true },
    
    // Date when the employee joined the company (required)
    date_of_joining: { type: Date, required: true },
    
    // Department where the employee works (required)
    department: { type: String, required: true },
    
    // Timestamp for when the employee record was created (default to current date/time)
    created_at: { type: Date, default: Date.now },
    
    // Timestamp for when the employee record was last updated (default to current date/time)
    updated_at: { type: Date, default: Date.now },
});

// Export the Employee model based on the defined schema
module.exports = mongoose.model('Employee', EmployeeSchema);