const mongoose = require('mongoose'); // Import Mongoose library for MongoDB object modeling
const bcrypt = require('bcryptjs'); // Import bcryptjs library for password hashing

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
    // Username of the user (required)
    username: { type: String, required: true },
    
    // Email address of the user (required and must be unique)
    email: { type: String, required: true, unique: true },
    
    // Password of the user (required)
    password: { type: String, required: true },
    
    // Timestamp for when the user record was created (default to current date/time)
    created_at: { type: Date, default: Date.now },
    
    // Timestamp for when the user record was last updated (default to current date/time)
    updated_at: { type: Date, default: Date.now },
});

// Pre-save middleware to hash the password before saving to the database
UserSchema.pre('save', async function (next) {
    // Check if the password field has been modified
    if (!this.isModified('password')) return next(); // If not modified, proceed to the next middleware

    // Hash the password using bcrypt with a salt round of 10
    this.password = await bcrypt.hash(this.password, 10);
    next(); // Proceed to the next middleware or save operation
});

// Export the User model based on the defined schema
module.exports = mongoose.model('User ', UserSchema);