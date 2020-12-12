//导入mysql操作中间件

const { func } = require('@hapi/joi')
const db = require('../db/index')

//获取文章分类
exports.getArtcate = function(req, res) {
    const sql = 'select * from ev_art_cate where is_delete=0 order by Id asc'

    db.query(sql, (err, result) => {

        if (err) return res.cc(err)

        res.send({
            status: 0,
            message: '获取文章列表成功',
            date: result
        })

    })
}


//更新文章分类
exports.updateArtcate = function(req, res) {

    const sql = 'select * from ev_art_cate where name=? or alias =?'

    db.query(sql, [req.body.name, req.body.alias], (err, result) => {

        if (err) return res.cc(err)

        if (result.length == 2) return res.cc('文章名称和别名已经被占用')

        if (result.length == 1 && result[0].name == req.body.name && result[0].alias == req.body.alias) {
            return res.cc('文章名称和别名已经被占用')
        }

        if (result.length == 1 && result[0].name == req.body.name) return res.cc('文章名称被占用')

        if (result.length == 1 && req.body.alias == result[0].alias) return res.cc('文章别名被占用')

        const sqlStr = 'insert into ev_art_cate set ?'

        db.query(sqlStr, req.body, (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows == 1) {
                res.cc('插入分类成功', 0)
            }
        })

    })

}

//删除文章分类

exports.deleteArtcate = function(req, res) {

    const sql = 'update ev_art_cate set is_delete =1 where ?'
    db.query(sql, req.params, (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows == 1) {
            res.cc('删除成功!')
        }
    })
}

//根据id获取文章类别

exports.setArtcate = function(req, res) {
    const sql = 'select * from ev_art_cate where ?'
    db.query(sql, req.params, (err, result) => {

        if (err) return res.cc(err)

        if (result.length !== 1) return res.cc('获取文章类别失败')

        res.send({
            status: 0,
            message: '获取文章类别成功',
            data: result[0]

        })

    })
}

//根据id更新文章类别

exports.updateArtcateById = function(req, res) {
    const sql = 'select * from ev_art_cate where Id<>? and(name =? or alias =?)'
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, result) => {
        if (err) return res.cc(err)

        if (result.length == 2) return res.cc('分类名称和别名被占用')

        if (result.length == 1 && result[0].name == req.body.name) return res.cc('文章名称被占用')

        if (result.length == 1 && result[0].alias == req.body.alias) return res.cc('文章别名被占用')

        const sqlStr = 'update ev_art_cate set ? where Id=?'

        db.query(sqlStr, [req.body, req.body.Id], (err, result) => {

            if (err) return res.cc(err)

            if (result.affectedRows !== 1) return res.cc('更新失败')

            res.cc('更新成功', 0)

        })

    })



}