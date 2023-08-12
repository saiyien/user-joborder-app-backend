const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const User = require('../models/userModel');

module.exports = app => {
    // list
    app.get("/users", authMiddleware, async (req, res) => {
        try {
            const users = await userController.listUsersWithPagination(req, res);

            res.json(users);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

    });

    // update
    app.put("/users/:id", authMiddleware, async (req, res) => {
        try {
            const user = await userController.updateUserWithJobOrder(req, res);
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

    });

    // create
    app.post("/users", async (req, res) => {
        try {
            const user = await userController.createUser(req, res);

            res.json(user);
        } catch (err) {
            if (err.code === 11000 && err.keyPattern.email) {
                res.status(400).json({ error: 'Email address is already in use.' });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    });

    app.delete("/users/:id", authMiddleware, async (req, res) => {    
        try {          
            const result = await userController.deleteUser(req, res);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }        
    });

    app.post('/login', async (req, res) => {
        const { email, password } = req.body;

        try {
            // Find the user by email
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }

            // User authentication is successful
            const token = authController.generateJWT(user); // Generate JWT token
            res.json({ token }); // Send the token in the response
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
