const { Router } = require('express');
const { registerUser, loginUser } = require('../controllers/auth.controller.js');

const router = Router();

// Define the routes and link them to the controller functions
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
