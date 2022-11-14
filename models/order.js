const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    material: {
      type: String,
      required: true,
    },
    requerente: {
      type: String,
      required: true,
    },
    prioridade: {
      type: String,
      required: true,
    },    
    tipo: {
      type: String,
      required: true,
    },    
    status: {
      type: String,
      required: true,
    },    
    ultima_atualizacao: {
      type: String,
      required: true,
    },    
    log: {
      type: [String],
      required: true,
    },
    criador: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
