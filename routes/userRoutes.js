const express = require('express');
const { registerUser, loginUser, currentUser,currentUserBalance,currentUserBetRequest,currentUserResultRequest,currentUserRollbackrequest } = require('../controllers/userController');
const validateToken = require("../middleware/validateTokenHandler");


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/',validateToken, currentUser);
router.post('/balance',validateToken, currentUserBalance);
router.post('/betrequest',validateToken, currentUserBetRequest);
router.post('/resultrequest',validateToken, currentUserResultRequest);
router.post('/rollbackrequest',validateToken, currentUserRollbackrequest);


module.exports = router;