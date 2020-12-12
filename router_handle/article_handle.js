//导入mysql操作中间件

const db = require('../db/index')

const path = require('path')

exports.addArticle = function(req, res) {

    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面为必选参数')

    const dataArr = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
        pub_date: new Date(),
        author: req.user.id

    }

    const sql = 'select * from article where title=?'
    db.query(sql, req.body.title, (err, result) => {

        if (err) return res.cc(err)
        if (result.length !== 0) return res.cc('发表内容有重复')

        if (result.length !== 0 && result[0].title == req.body.title) return res.cc('文章标题重复')


        const sqlStr = 'insert into article set ?'

        db.query(sqlStr, dataArr, (err, result) => {
            if (err) return res.cc(err)

            if (result.affectedRows !== 1) res.cc('添加文章失败')
            console.log(req.file);
            res.cc('添加文章成功', 0)
        })

    })
}