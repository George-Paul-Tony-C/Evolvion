const { Router } = require('express');
const { submitSorryRequest, approveSorryRequest } = require('../controllers/request.controller.js');
const { verifyJWT } = require('../middlewares/auth.middleware.js');
const { verifyAdmin } = require('../middlewares/role.middleware.js');

const router = Router();

// Employee endpoint: Must be logged in to submit
router.route("/submit").post(verifyJWT, submitSorryRequest);

// Admin endpoint: Must be logged in AND be an admin to approve
router.route("/approve").post(verifyJWT, verifyAdmin, approveSorryRequest);

module.exports = router;
