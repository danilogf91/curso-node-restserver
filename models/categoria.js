const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
  tipo: {
    type: String,
    required: [true, "El tipo es obligatorio desde Schema"],
    unique: true,
  },
  descripcion: {
    type: String,
    required: [true, "La descripcion es obligatoria desde Schema"],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: String,
    default: "user",
    //required: [true, 'El usuario es obligatorio desde Schema']
  },
});

CategoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject(); // desestructurar un objeto para mostrar los datos usuario
  return data;
};

module.exports = model("Categoria", CategoriaSchema);
