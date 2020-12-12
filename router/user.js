const express = require('express')

const router = express.Router()

const user_handle = require('../router_handle/user_handle')


// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_log_schma } = require('../schma/user')


//用户注册路由
router.post('/reguser', expressJoi(reg_log_schma), user_handle.user_reguser)


//用户登录路由
router.post('/login', expressJoi(reg_log_schma), user_handle.user_login)



module.exports = router