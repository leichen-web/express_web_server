const express = require('express')

const app = express()

const cors = require('cors')

const expressJWT = require('express-jwt')

const config = require('./config')

const path = require('path')


//挂载静态资源

app.use('/upload', express.static(path.join('/upload', './uploads')))

//解决跨域问题
app.use(cors())

//post数据解析
app.use(express.urlencoded({ extended: false }))


//导入验证表单中间件
const joi = require('@hapi/joi')

//路由之前注册一个错误响应函数

app.use(function(req, res, next) {

    res.cc = (err, status = 1) => {
        return res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})


//配置解析用户信息的全局中间件

app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api/] }))



//路由
const router = require('./router/user')

app.use('/api', router)

//用户信息路由
const userinfoRouter = require('./router/userinfo')

app.use('/my', userinfoRouter)

//文章类别列表路由

const art_cate = require('./router/artcate')

app.use('/my/article', art_cate)

//文章发表路由
const article = require('./router/article')

app.use('/my/article', article)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc(err)

    if (err.name == 'UnauthorizedError') {
        return res.cc('验证失败')
    }
    if (err instanceof multer.MulterError) {
        return res.cc(err)
    }
    // 未知的错误
    res.cc(err.message)


})


app.listen(3000, () => {

    console.log('server is running at http://127.0.0.1:3000');
})