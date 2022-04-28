const { register, login, update } = require('../controllers/authControllers');

const router = require('express').Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/:id').patch(update);

module.exports = router;
