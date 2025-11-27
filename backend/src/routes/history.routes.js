const { Router } = require('express');
const { getMyAssessmentHistory, getAssessmentDetails } = require('../controllers/history.controller.js');
const { verifyJWT } = require('../middlewares/auth.middleware.js');

const router = Router();

router.use(verifyJWT);

router.route("/").get(getMyAssessmentHistory); // For the list view
router.route("/:id").get(getAssessmentDetails); // For the detailed view

module.exports = router;
