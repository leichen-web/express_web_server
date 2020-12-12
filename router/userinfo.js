const express = require('express')

const router = express.Router()



// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 2. 导入需要的验证规则对象
const { userinfo_schma, updatePwd, update_avatar } = require('../schma/user')

//导入用户信息管理操作函数
const userinfo_handle = require('../router_handle/userinfo_handle')


//用户基本信息路由
router.get('/userinfo', userinfo_handle.getUserInfo)

//更新用户信息
router.post('/userinfo', expressJoi(userinfo_schma), userinfo_handle.updateUserInfo)

//修改用户密码
router.post('/update_user', expressJoi(updatePwd), userinfo_handle.updatePwd)


//修改用户头像
router.post('/update_avatar', expressJoi(update_avatar), userinfo_handle.updateAvatar)

//向外暴露router
module.exports = router