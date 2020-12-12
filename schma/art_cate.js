const joi = require('@hapi/joi')

const name = joi.string().required()
const alias = joi.string().alphanum().required()

const id = joi.number().integer().min(1).required()




//验证文章分类列表

module.exports.update_art = {
    body: {
        name,
        alias
    }
}

//验证id参数的规则对象

module.exports.delete_art = {

    params: {
        id
    }
}