const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const User = require('../models/user');
const Constraint = require('../models/constraint');

exports.getConstraints = (req, res, next) => {
  Constraint.find()
    .then((constraints) => {
      res
        .status(200)
        .json({ message: 'Constraints fetched', constraints: constraints }); // 200 = success
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.createConstraints = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode = 422;
    throw error;
  }
  const requerente = req.body.requerente;
  const prioridade = req.body.prioridade;
  const tipo = req.body.tipo;
  const status = req.body.status;
  const ultima_atualizacao = req.body.ultima_atualizacao;
  const log = req.body.log;

  const constraint = new Constraint({
    requerente: requerente,
    prioridade: prioridade,
    tipo: tipo,
    status: status,
    ultima_atualizacao: ultima_atualizacao,
    log: log,
  });

  constraint
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Constraints created successfully',
        constraint: constraint,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.updateConstraints = (req, res, next) => {
  const requerente = req.body.requerente;
  const prioridade = req.body.prioridade;
  const tipo = req.body.tipo;
  const status = req.body.status;
  const ultima_atualizacao = req.body.ultima_atualizacao;
  const log = req.body.log;

  const constraint = new Constraint({
    requerente: requerente,
    prioridade: prioridade,
    tipo: tipo,
    status: status,
    ultima_atualizacao: ultima_atualizacao,
    log: log,
  });

  constraint
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Constraints updated successfully',
        constraint: constraint,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};