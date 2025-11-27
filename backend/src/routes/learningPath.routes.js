const { Router } = require('express');
const { generateMyLearningPath , getMyLearningPath} = require('../controllers/learningPath.controller.js');
const { verifyJWT } = require('../middlewares/auth.middleware.js');

const router = Router();

router.use(verifyJWT);

router.route("/generate").post(generateMyLearningPath);
router.route("/my-path").get(getMyLearningPath);

module.exports = router;
