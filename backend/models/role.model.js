const mongoose = require('mongoose');

// Define the Role schema
const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Role name is required'],
        unique: true,
        trim: true,
    },
    permissions: [
        {
            type: String,
            required: true,
        },
    ],
}, { timestamps: true });

// Export the Role model
module.exports = mongoose.model('Role', roleSchema);
