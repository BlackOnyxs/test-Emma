const { Router } = require('express');
const { check } = require('express-validator');

const { getPosts, getPostById, createPost, updatePost } = require('../controllers/post');
const { existPostById, isAdmin } = require('../helpers/db-validators');
const { fieldsValidator, hasRole, jwtValidate, fileValidator } = require('../middlewares');

const router = Router();

router.get('/', [
    jwtValidate,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    fieldsValidator
], getPosts );

router.get('/:id', [
    jwtValidate,
    hasRole('ADMIN_ROLE', 'SALE_ROLE'), //TODO: Dynamic
    check('id', 'Error Id').isMongoId(),
    check('id').custom( existPostById ),
    fieldsValidator,
], getPostById );

router.post('/', [
    fileValidator,
    jwtValidate,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    fieldsValidator
], createPost );

router.put('/:id', [
    jwtValidate,
    hasRole('USER_ROLE', 'ADMIN_ROLE'),
    check('id', 'Error Id').isMongoId(),
    check('id').custom( existPostById ),
    fieldsValidator
], updatePost )



module.exports = router;