const  fieldsValidator  = require('../middlewares/fields-validators');
const  jwtValidator = require('../middlewares/jwt-validator');
const roleValidator  = require('../middlewares/role-validator');
const fileValidator = require('../middlewares/file-validator')

module.exports = {
    ...fileValidator,
    ...fieldsValidator,
    ...jwtValidator,
    ...roleValidator
}