// File: backend/src/routes/user.routes.js
const { Router } = require('express');
const { getCurrentUser } = require('../controllers/user.controller.js');
const { verifyJWT } = require('../middlewares/auth.middleware.js');
const router = Router();
router.route("/current-user").get(verifyJWT, getCurrentUser);
module.exports = router;
