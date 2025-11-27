const { Router } = require('express');
const { getEmployeeDashboardData } = require('../controllers/employee.controller.js');
const { verifyJWT } = require('../middlewares/auth.middleware.js');

const router = Router();

// This line applies the verifyJWT middleware to all routes in this file.
// Any request to these routes must have a valid access token.
router.use(verifyJWT);

// Define the dashboard route
router.route("/dashboard").get(getEmployeeDashboardData);

module.exports = router;
