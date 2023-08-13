// config.js
module.exports = {
    databaseUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/user-joborder-app',
    jwtSecret: '123',
};
