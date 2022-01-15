const { User, Role, Post } = require('../models');

const isValidRole = async( role = '' ) => {
    const existRol = await Role.findOne({ role });
    if ( !existRol ) {
        throw new Error(`The role ${ role } not found`)
    }
}


const emailExist = async( email = '' ) => {
    const emailExist = await User.findOne({ email });
    if ( emailExist ) {
        throw new Error(`The email ${ email } is already in use`);
    }
}

const existUserById = async( id = '' ) => {
    const existUser = await User.findById(id);
    if ( !existUser ) {
        throw new Error(`The id ${ id } not found`);
    }
}

const existPostById = async( id = '' ) => {
    const existPost = await Post.findById( id );
    if ( !existPost ) {
        throw new Error(`The id ${ id } not found`);
    }
}

module.exports = {
    isValidRole,
    emailExist,
    existUserById,
    existPostById,
}