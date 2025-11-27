const { Router } = require('express');
const { analyzeMyProfile , updateMyProfile } = require('../controllers/profile.controller.js');
const { verifyJWT } = require('../middlewares/auth.middleware.js');

const router = Router();

// All profile routes require a logged-in user
router.use(verifyJWT);

router.route("/analyze").post(analyzeMyProfile);
router.route("/update").put(updateMyProfile);

module.exports = router;
