const { Schema, model } = require('mongoose');

const ItemSchema = Schema({
    razonSocial: {
        type: String,
        required: [true, 'La razonSocial es obligatoria desde Schema'],
        unique: true
    },
    ruc: {
        type: String,
        required: [true, 'El ruc es obligatorio desde Schema'],

    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria desde Schema']
    },
    linkEmpresa: {
        type: String,
    },
    direccion: {
    type: String,
    },
    telefono: {
        type: String,
        required: [true, 'El teléfono es obligatorio desde Schema']
    },
    email1: {
        type: String,
        required: [true, 'El email1 es obligatorio desde Schema']
    },
    email2: {
        type: String
    },/*
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },*/
});

ItemSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();      // desestructurar un objeto para mostrar los datos usuario
    return data;
}

module.exports = model('Item', ItemSchema);