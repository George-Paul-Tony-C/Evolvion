const { Router } = require('express');
const { updateUserProgress } = require('../controllers/progress.controller.js');
const { verifyJWT } = require('../middlewares/auth.middleware.js');

const router = Router();

// All progress routes require a logged-in user
router.use(verifyJWT);

router.route("/update").post(updateUserProgress);

module.exports = router;
