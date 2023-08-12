const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB 
mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

console.log("\n>config.databaseUrl : " + JSON.stringify(config.databaseUrl));

// Middleware
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ limit: "4mb", extended: true }));

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

const echo = `backend-services`;
app.get('/', (req, res) => {
    res.end(echo);
});

// Routes
require('./src/routes/userRoutes')(app);
//app.use('/users', require('./src/routes/userRoutes'));
//app.use('/joborders', require('./routes/jobOrderRoutes'));

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
