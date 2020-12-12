const joi = require('@hapi/joi')

const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()


const nickname = joi.string().min(1).required()
const email = joi.string().email().required()


const oldPwd = password
const newPwd = joi.not(joi.ref('oldPwd')).concat(password)


const avatar = joi.string().dataUri().required()


const name = joi.string().required()
const alias = joi.string().alphanum().required()

const id = joi.number().integer().min(1).required()

//暴露验证表单

//验证用户名和密码
module.exports.reg_log_schma = {

    body: {
        username,
        password
    }


}

//验证昵称和邮箱
module.exports.userinfo_schma = {

    body: {
        nickname,
        email
    }
}

//验证新旧密码
module.exports.updatePwd = {

    body: {
        oldPwd,
        newPwd
    }
}

//验证头像数据格式
module.exports.update_avatar = {

    body: {
        avatar
    }

}

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