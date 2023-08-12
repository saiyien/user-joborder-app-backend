// config.js
module.exports = {
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://icon:iCon100&@icondb.n39xt.mongodb.net/user-joborder-app?retryWrites=true&w=majority',    
    //databaseUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/user-joborder-app',
    jwtSecret: '123',
};
