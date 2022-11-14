const express = require('express');
const { body } = require('express-validator');

const orderController = require('../controllers/order_controller');
const isAuth = require('../util/is-auth');

const router = express.Router();

router.get('/orders', orderController.getOrders); // GET /orders/orders

router.get('/order/:orderId', isAuth, orderController.getOrder);

router.post(
  '/order',
  [
    body('material').not().isEmpty(),
    body('requerente').not().isEmpty(),
    body('prioridade').not().isEmpty(),
    body('tipo').not().isEmpty(),
    body('status').not().isEmpty(),
    body('ultima_atualizacao').not().isEmpty(),
    body('log').not().isEmpty(),
  ],
  orderController.createOrder
); // POST /orders/order

router.put(
  '/order/:orderId',
  isAuth,
  [
    body('material').not().isEmpty(),
    body('requerente').not().isEmpty(),
    body('prioridade').not().isEmpty(),
    body('tipo').not().isEmpty(),
    body('status').not().isEmpty(),
    body('ultima_atualizacao').not().isEmpty(),
    body('log').not().isEmpty(),
  ],
  orderController.updateOrder
);

router.delete('/order/:orderId', isAuth, orderController.deleteOrder);

module.exports = router;
