const express = require('express');
const { body } = require('express-validator');

const constraintController = require('../controllers/constraint_controller');
const isAuth = require('../util/is-auth');

const router = express.Router();

router.get('', isAuth, constraintController.getConstraints); // GET /constraints

router.put(
  '',
  isAuth,
  [body('ultima_atualizacao').not().isEmpty(), body('log').not().isEmpty()],
  constraintController.createConstraints
); // PUT /constraints

router.patch('/:constraintId', isAuth, constraintController.updateConstraints);

module.exports = router;
