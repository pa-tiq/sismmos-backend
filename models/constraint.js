const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const constraintSchema = new Schema(
  {
    requerente: {
      type: [String],
      required: false,
    },
    prioridade: {
      type: [String],
      required: false,
    },    
    tipo: {
      type: [String],
      required: false,
    },    
    status: {
      type: [String],
      required: false,
    },    
    ultima_atualizacao: {
      type: String,
      required: true,
    },    
    log: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Constraint", constraintSchema);
