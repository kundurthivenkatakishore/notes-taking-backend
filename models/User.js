import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { collection: "Users" });

// Create a Mongoose model based on the schema
const User = mongoose.model('User', userSchema);

export default User;
