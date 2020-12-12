//导入mysql操作中间件

const db = require('../db/index')

//导入token第三方包
const jsonwebtoken = require('jsonwebtoken')

//导入密码加密中间件

const bcrypt = require('bcryptjs')

const config = require('../config')

module.exports = {
    // 用户登录处理逻辑

    user_login: function(req, res) {

        const userInfo = req.body

        let sqlStr = `select * from ev_user where username = ?`
        db.query(sqlStr, userInfo.username, (err, results) => {
            //sql语句有误
            if (err) return res.cc(err)
            //查询结果不存在
            if (results.length !== 1) {
                return res.cc('用户名不正确')
            }

            // 验证密码
            bcrypt.compare(userInfo.password, results[0].password, (err, flag) => {
                if (err) return res.send('比对失败' + err)
                if (!flag) return res.send('密码不正确')

                const user = { ...results[0], password: '', user_pic: '' }
                const token = jsonwebtoken.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
                res.send({
                    status: 0,
                    message: '登录成功',
                    token: 'Bearer' + ' ' + token
                })


            })
        })

    },


    //用户注册处理逻辑
    user_reguser: function(req, res) {
        const userInfo = req.body
        //验证用户信息的合法性
        if (!userInfo.username || !userInfo.password) {
            return res.cc('用户输入信息不合法')
        }
        // 数据查询sql语句
        let sqlStr = 'select * from ev_user where username = ?'
        db.query(sqlStr, userInfo.username, (err, results) => {
            //数据库操作错误处理
            if (err) return res.cc(err)

            //检测用户名,如果检测结果不为空数组则表示有相同用户名存在
            if (results.length > 0) {
                return res.cc('用户名已存在')
            }
            //对用户密码进行加密处理
            userInfo.password = bcrypt.hashSync(userInfo.password, 10)
            //数据插入sql语句
            let sql = 'insert into ev_user set ?'
            db.query(sql, userInfo, (err, result) => {
                if (err) {
                    return res.send({
                        status: 1,
                        message: err.message
                    })

                }
                //影响行数不为1时表示插入数据失败
                if (result.affectedRows !== 1) {
                    return res.cc('用户注册失败')
                }

                res.cc('注册成功', 0)
            })

        })

    }

}