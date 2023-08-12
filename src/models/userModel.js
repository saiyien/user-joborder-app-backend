const mongoose = require('mongoose');

const jobOrderSchema = new mongoose.Schema({
    pickup: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        address: { type: String, required: true },
    },
    dropoff: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        address: { type: String, required: true },
    },
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    companyName: { type: String },
    email: { type: String, required: true, unique: true },
    remarks: { type: String },
    jobOrders: [jobOrderSchema], // Embed job orders in the user schema
});

module.exports = mongoose.model('User', userSchema);
