const router = require('express').Router();
const { body } = require('express-validator');
const FriendsController = require('../controllers/FriendsController');
const verifyToken = require('../middleware/verifyToken');

router.get('/get', verifyToken, FriendsController.get);
router.post('/accept', verifyToken, FriendsController.accept);
router.post('/remove', verifyToken, FriendsController.remove);
router.post('/request', verifyToken, FriendsController.request);
 
module.exports = router;