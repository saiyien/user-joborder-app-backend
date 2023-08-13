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
    const { name, image, companyName, email, remarks, jobOrder } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                name: name,
                image: image,
                companyName: companyName,
                email: email,
                remarks: remarks,
            },
            $push: { jobOrders: jobOrder },
        },
        { new: true }
    );

    if (!updatedUser) {
        return { error: "User not found" };
    }

    return updatedUser;
};

// 3) Add a new user to the list of user information
const createUser = async (req, res) => {
    const userData = req.body;

    // Parse the jobOrders JSON string
    const jobOrders = JSON.parse(userData.jobOrders);

    // Construct the final document
    const document = {
        name: userData.name,
        image: userData.image,
        companyName: userData.companyName,
        email: userData.email,
        remarks: userData.remarks,
        jobOrders: [
            {
                pickup: {
                    latitude: jobOrders.pickup.latitude,
                    longitude: jobOrders.pickup.longitude,
                    address: jobOrders.pickup.address
                },
                dropoff: {
                    latitude: jobOrders.dropoff.latitude,
                    longitude: jobOrders.dropoff.longitude,
                    address: jobOrders.dropoff.address
                }
            }
        ]
    };

    const user = await User.create(document);
    return user;
};

// 4) Delete a user from the list of user information
const deleteUser = async (req, res) => {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);
    if (user == null)
        return { message: 'No User delete' };
    else
        return { message: 'User deleted successfully' };
};

// 4) Get a user from the list of user information
const getUser = async (req, res) => {
    const userId = req.params.id;
    const user = await User.findOne({ "_id": userId });
    return user;
};

module.exports = { listUsersWithPagination, updateUserWithJobOrder, createUser, deleteUser, getUser };
