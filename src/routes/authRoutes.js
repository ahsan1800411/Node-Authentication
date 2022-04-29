const {
  register,
  login,
  update,
  deleteUser,
} = require('../controllers/authControllers');
const { authMiddleware } = require('../middlewares/auth');

const router = require('express').Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/:id').patch(update).delete(authMiddleware, deleteUser);

module.exports = router;
