// Importing mongoose library to interact with MongoDB
 const mongoose = require('mongoose');

// This is an asynchronous function that handles the database connection
const connectDB = async () => {
    try {
        // Attempting to connect to MongoDB using the URI stored in environment variable 'MONGO_URI'
        // mongoose.connect() is a method that returns a promise
        await mongoose.connect(process.env.MONGO_URI);

        // If connection is successful, this message is logged to the console
        console.log('MongoDB Connected...');
    } catch (err) {
        // If an error occurs during the connection attempt, this block is executed
        // The error message is logged to the console
        console.error('MongoDB connection error:', err.message);

        // After logging the error, the process is terminated with a failure status (1)
        // This is usually done to stop the application from running in an invalid state
        process.exit(1);
    }
};

// Exporting the connectDB function so it can be used in other parts of the application
 module.exports = connectDB;
