const User = require('../models/user'); // Import the User model
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for token management
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

// Controller function for user signup
exports.signup = async (req, res) => {
    // Destructure username, email, and password from the request body
    const { username, email, password } = req.body;
    try {
        // Create a new user instance with the provided details
        const user = new User({ username, email, password });
        // Save the new user to the database
        await user.save();
        // Respond with a success message and the newly created user's ID
        res.status(201).json({
            message: 'User  created successfully.',
            user_id: user._id, // Include the user ID here
        });
    } catch (error) {
        // Handle any errors that occur during the user creation process
        res.status(400).json({ error: error.message });
    }
};

// Controller function for user login
exports.login = async (req, res) => {
    // Destructure email and password from the request body
    const { email, password } = req.body;
    try {
        // Attempt to find a user with the provided email
        const user = await User.findOne({ email });
        // If no user is found, respond with an error message
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        // If the passwords do not match, respond with an error message
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate a JSON Web Token (JWT) for the authenticated user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Respond with a success message and the generated token
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        // Handle any errors that occur during the login process
        res.status(400).json({ error: error.message });
    }
};