const { Router } = require('express');
const { processAssessmentResult } = require('../controllers/tracker.controller.js');
const { verifyJWT } = require('../middlewares/auth.middleware.js');

const router = Router();

router.use(verifyJWT);

router.route("/process-result").post(processAssessmentResult);

module.exports = router;
