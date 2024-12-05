const { validationResult } = require('express-validator')


const productsValidation = async (req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        next()
        return
    }

    res.status(500).json(errors.array()[0].msg)

}

module.exports = { productsValidation }