const { Router } = require('express');
const { getAllUsers , getSystemMetrics} = require('../controllers/admin.controller.js');
const { verifyJWT } = require('../middlewares/auth.middleware.js');
const { verifyAdmin } = require('../middlewares/role.middleware.js');

const router = Router();

router.use(verifyJWT, verifyAdmin);

// This endpoint is protected by two layers of middleware.
// A user must be logged in (verifyJWT) AND be an admin (verifyAdmin).
router.route("/users").get(getAllUsers);
router.route("/metrics").get(getSystemMetrics);

module.exports = router;
