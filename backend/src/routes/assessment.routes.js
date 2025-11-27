const { Router } = require('express');
const { createNewAssessment , flagUserForCheating } = require('../controllers/assessment.controller.js');
const { verifyJWT } = require('../middlewares/auth.middleware.js');

const router = Router();

// Protect all assessment routes
router.use(verifyJWT);
router.route("/generate").post(createNewAssessment);
router.route("/flag").post(flagUserForCheating); 

module.exports = router;
