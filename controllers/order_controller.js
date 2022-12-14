const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const Order = require('../models/order');
const User = require('../models/user');

exports.getOrders = (req, res, next) => {
  let totalItems;
  Order.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Order.find()
    })
    .then((orders) => {
      res
        .status(200)
        .json({ message: 'Orders fetched', orders: orders, totalItems: totalItems }); // 200 = success
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.getOrder = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error('Could not find order');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Order fetched', post: post });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.createOrder = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode = 422;
    throw error;
  }
  //if (!req.file) {
  //  const error = new Error('No image provided');
  //  error.statusCode = 422;
  //  throw error;
  //}
  //const imageUrl = req.file.path; //doesn't work in windows
  //const imageUrl = req.file.path.replace('\\', '/');
  const material = req.body.material;
  const requerente = req.body.requerente;
  const prioridade = req.body.prioridade;
  const tipo = req.body.tipo;
  const status = req.body.status;
  const ultima_atualizacao = req.body.ultima_atualizacao;
  const log = req.body.log;
  let creator;

  const order = new Order({
    material: material,
    requerente: requerente,
    prioridade: prioridade,
    tipo: tipo,
    status: status,
    ultima_atualizacao: ultima_atualizacao,
    log: log,
    criador: req.userId,
  });

  order
    .save()
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      creator = user;
      user.orders.push(order);
      return user.save();
    })
    .then((result) => {
      // 201 = success, a resource was created
      res.status(201).json({
        message: 'Order created successfully',
        order: order,
        criador: { _id: creator._id, name: creator.name, email: creator.email },
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.updateOrder = (req, res, next) => {
  const orderId = req.params.orderId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode = 422;
    throw error;
  }
  const material = req.body.material;
  const requerente = req.body.requerente;
  const prioridade = req.body.prioridade;
  const tipo = req.body.tipo;
  const status = req.body.status;
  const log = req.body.log;
  //let imageUrl = req.body.image; // no new image was picked
  //if (req.file) {
  //  // user picked a new image
  //  imageUrl = req.file.path.replace('\\', '/');
  //}
  //if (!imageUrl) {
  //  const error = new Error('No image provided');
  //  error.statusCode = 422;
  //  throw error;
  //}
  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        const error = new Error('Could not find order');
        error.statusCode = 404;
        throw error;
      }
      //if (order.criador.toString() !== req.userId) {
      //  const error = new Error('Not authorized');
      //  error.statusCode = 403;
      //  throw error;
      //}
      //if (imageUrl !== post.imageUrl) {
      //  // new image was uploaded
      //  deleteImage(post.imageUrl);
      //}
      order.material = material;
      order.requerente = requerente;
      order.prioridade = prioridade;
      order.tipo = tipo;
      order.status = status;
      order.log = log;
      //post.imageUrl = imageUrl;
      return order.save();
    })
    .then((result) => {
      res.status(200).json({ message: 'Order updated', order: result });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.deleteOrder = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        const error = new Error('Could not find order');
        error.statusCode = 404;
        throw error;
      }
      //if (order.creator.toString() !== req.userId) {
      //  const error = new Error('Not authorized');
      //  error.statusCode = 403;
      //  throw error;
      //}
      //// check logged in user
      //deleteImage(post.imageUrl);
      return Order.findByIdAndRemove(orderId);
    })
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.orders.pull(orderId);
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: 'Order deleted' });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

const deleteImage = (filePath) => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
