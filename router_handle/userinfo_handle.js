// 导入数据库操作模块
const db = require('../db/index')

// 导入处理密码的模块
const bcrypt = require('bcryptjs')

// 获取用户基本信息的处理函数
module.exports.getUserInfo = (req, res) => {
    // 定义查询用户信息的 SQL 语句
    const sql = `select id, username, nickname, email, user_pic from ev_user where id=?`
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.user.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询的结果可能为空
        if (results.length !== 1) return res.cc('获取用户信息失败！')

        // 用户信息获取成功
        res.send({
            status: 0,
            message: '获取用户信息成功！',
            data: results[0],
        })
    })
}


//更改用户信息
module.exports.updateUserInfo = (req, res) => {

    //定义更新用户信息的sql语句
    const sql = 'update ev_user set ? where id=?'

    db.query(sql, [req.body, req.user.id], (err, result) => {

        if (err) return res.cc(err)
        if (result.affectedRows !== 1) {
            return res.cc('用户信息更新失败')
        }
        res.cc('用户信息更新成功', 0)

    })

}


//修改用户密码

module.exports.updatePwd = (req, res) => {

    //定义检测旧密码是否正确的sql语句
    const sql = 'select * from ev_user where id =?'

    db.query(sql, req.user.id, (err, result) => {
        //sql语句错误的处理
        if (err) return res.cc(err)
        //查询结果为空的处理
        if (result.length == 0) return res.cc('用户不存在')

        const flag = bcrypt.compareSync(req.body.oldPwd, result[0].password)
        //旧密码不正确的处理
        if (!flag) {
            return res.cc('旧密码输入不正确!')
        }
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        const sql = 'update ev_user set password =? where id=?'
        db.query(sql, [newPwd, req.user.id], (err, result) => {

            if (err) return res.cc(err)

            if (result.affectedRows !== 1) {
                return res.cc('修改密码失败')
            }
            res.cc('修改密码成功', 0)
        })

    })

}

//修改用户头像

module.exports.updateAvatar = (req, res) => {
    //定义更新头像的sql语句
    const sql = 'update ev_user set user_pic =? where id=?'

    db.query(sql, [req.body.avatar, req.user.id], (err, result) => {

        if (err) return res.cc(err)

        if (result.affectedRows !== 1) return res.cc('用户头像更新失败!')

        res.cc('用户头像更新成功', 0)

    })



}