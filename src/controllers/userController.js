const User = require('../models/userModel');

// 1) List all users and job orders with pagination
const listUsersWithPagination = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const users = await User.find()
        .skip((page - 1) * limit)
        .limit(limit);

    return users;   
};

// 2) Update a user and add a job order to the list of user information
const updateUserWithJobOrder = async (req, res) => {
    const userId = req.params.id;
    const { jobOrder } = req.body;

    const user = await User.findByIdAndUpdate(
        userId,
        { $push: { jobOrders: jobOrder } },
        { new: true }
    );

    return user;
};

// 3) Add a new user to the list of user information
const createUser = async (req, res) => {
    const userData = req.body;

    const user = await User.create(userData);
    return user;
};

// 4) Delete a user from the list of user information
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    
    const user =  await User.findByIdAndDelete(userId);
    if(user == null)
        return { message: 'No User delete' }; 
    else
        return { message: 'User deleted successfully' };    
};

module.exports = { listUsersWithPagination, updateUserWithJobOrder, createUser, deleteUser };
