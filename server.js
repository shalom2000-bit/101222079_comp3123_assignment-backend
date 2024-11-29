// Import the Express application from the app module
const app = require('./src/app');

// Define the port number for the server to listen on
// It will use the PORT environment variable if defined, otherwise defaults to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`) // Log a message to the console when the server starts
);