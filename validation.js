const { check } = require('express-validator')

const name = check('name')
    .exists()
    .withMessage('Name es obligatorio')
    .notEmpty()
    .withMessage('Name no debe estar vacio')
    .isString()
    .withMessage('Name debe ser un STRING')
    .isLength({ max: 50 })
    .withMessage('Name debe tener máximo 50 caracteres')

const price = check('price')
    .exists()
    .withMessage('Price es obligatorio')
    .notEmpty()
    .withMessage('Price no debe estar vacio')
    .isNumeric()
    .withMessage('Price debe ser un NUMBER')
    .isLength({ max: 50 })
    .withMessage('Name debe tener máximo 50 caracteres')


const description = check('description')
    .exists()
    .withMessage('Description obligatorio')
    .notEmpty()
    .withMessage('Description no debe estar vacio')
    .isString()
    .withMessage('Description debe ser un STRING')
    .isLength({ max: 100 })
    .withMessage('Description debe tener máximo 100 caracteres')

const stock = check('stock')
    .exists()
    .withMessage(' stock es obligatorio')
    .notEmpty()
    .withMessage(' stock no debe estar vacio')
    .isNumeric()
    .withMessage(' stock debe ser un NUMBER')
    .isLength({ max: 50 })
    .withMessage(' stock debe tener máximo 50 caracteres')



const spec = check('spec')
    .exists()
    .withMessage('spec es obligatorio')
    .notEmpty()
    .withMessage('spec no debe estar vacio')
    .isString()
    .withMessage('spec debe ser un string')
    .isLength({ max: 50 })
    .withMessage('spec debe tener máximo 50 caracteres')


const brand = check('brand')
    .exists()
    .withMessage('brand obligatorio')
    .notEmpty()
    .withMessage('brand no debe estar vacio')
    .isString()
    .withMessage('brand debe ser un string')
    .isLength({ max: 50 })
    .withMessage('brand debe tener máximo 50 caracteres')



const store_id = check('store_id')
    .exists()
    .withMessage(' store_id es obligatorio')
    .notEmpty()
    .withMessage(' store_id no debe estar vacio')
    .isNumeric()
    .withMessage(' store_id debe ser un NUMBER')
    .isLength({ max: 50 })
    .withMessage(' store_id debe tener máximo 50 caracteres')

module.exports = {
    name, price, description, stock, brand, spec, store_id
}