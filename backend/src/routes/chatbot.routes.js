const { Router } = require('express');
const { handleChatMessage } = require('../controllers/chatbot.controller.js');
const { verifyJWT } = require('../middlewares/auth.middleware.js');

const router = Router();

// All chatbot routes require a logged-in user
router.use(verifyJWT);

router.route("/send").post(handleChatMessage);

module.exports = router;
