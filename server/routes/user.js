const router = require('express').Router();
const { body } = require('express-validator');
const UserController = require('../controllers/UserController');
const verifyToken = require('../middleware/verifyToken');

router.get('/me', verifyToken, UserController.me);
router.get('/get-online/:_id', verifyToken, UserController.getOnline);
 
module.exports = router;