const { response } = require('express');
const moment = require('moment');

const Post = require('../models/post');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const getPosts = async( req, res = response ) => {

    const { limit = 5, at = 0 } = req.query;
    const query = { status:  true };

    try {
        const [ total, posts ] = await Promise.all([
            Post.countDocuments(query),
            Post.find( query )
                .skip( Number( at ) )
                .limit( Number( limit ) )
                .populate( 'createdBy', 'name' )
        ]);
       return  res.json({
            total,
            posts
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Error server :c call my creator pls' 
        });
    }
}

const getPostById = async(req, res = response ) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id)
                                     .populate('createdBy', 'name')
                                     .populate('category', 'name');
        return res.json( post );
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Error server :c call my creator pls' 
        })
    }
}

const createPost = async( req, res = response ) => {
    const { tempFilePath } = req.files.file;
    try {
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
        const data = {
            image: secure_url,
            createdBy: req.user._id,
            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')
        }
        const post = new Post(data);
        await post.save();
        return res.json(post);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Error al subir la imagen'
        })
    }
}

const updatePost = async( req, res = response ) => {
    const { comments, ...data } = req.body;
    const { id } = req.params;
    
    comments[ comments.length - 1].createdBy = req.user._id;
    comments[ comments.length - 1].createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    
    data.comments = comments;
    try {
        let postUpdated = await Post.findByIdAndUpdate(id, data, { new: true });
        return res.json(postUpdated);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Error al subir la actualizar el post'
        })
    }
}

module.exports = {
    createPost,
    getPosts,
    getPostById,
    createPost, 
    updatePost
}