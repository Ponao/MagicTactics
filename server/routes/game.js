const router = require('express').Router();
const { body } = require('express-validator');
const GameController = require('../controllers/GameController');
const verifyToken = require('../middleware/verifyToken');

router.get('/get', verifyToken, GameController.get);
router.post('/invite', verifyToken, GameController.invite);
router.post('/cancel-invite', verifyToken, GameController.cancelInvite);
router.post('/accept-invite', verifyToken, GameController.acceptInvite);
router.post('/pick-team', verifyToken, GameController.pickTeam);
router.post('/apply-skill', verifyToken, GameController.applySkill);
 
module.exports = router;