const { Schema, model } = require('mongoose');

const commentSchema = {
    comment: {
        type: String,
        required: [true, 'El comment es requerido.']
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es requerido.']
    },
    createdAt: {
        type: String,
        required: [true, 'El usuario es requerido.']
    },
}

const postSchema = new Schema({
    image: {
        type: String,
        required: [true, 'La imagen es requerida.']
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es requerido.']
    },
    createdAt: {
        type: String,
        required: [true, 'La fecha es requerida.']
    },
    comments: [ commentSchema ]
});

module.exports = model('Post', postSchema);