const express = require('express');
const { registerUser, loginUser, currentUser,currentUserBalance,currentUserBetRequest,currentUserResultRequest,currentUserRollbackrequest } = require('../controllers/userController');
const validateToken = require("../middleware/validateTokenHandler");


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/current',validateToken, currentUser);
router.post('/current/balance',validateToken, currentUserBalance);
router.post('/current/betrequest',validateToken, currentUserBetRequest);
router.post('/current/resultrequest',validateToken, currentUserResultRequest);
router.post('/current/rollbackrequest',validateToken, currentUserRollbackrequest);


module.exports = router;