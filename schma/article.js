const joi = require('@hapi/joi')

const title = joi.string().min(1).required()

const content = joi.string().required().allow('')

const cate_id = joi.number().integer().required()

const state = joi.string().valid('已发布', '草稿').required()


exports.addArticle = {

    body: {
        title,
        content,
        cate_id,
        state
    }

}