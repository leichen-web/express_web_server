const express = require('express')

const router = express.Router()


const router_handle = require('../router_handle/artcate_handle')

// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { update_art, delete_art } = require('../schma/art_cate')


//获取文章类别
router.get('/cate', router_handle.getArtcate)
// 更新文章类别
router.post('/update', expressJoi(update_art), router_handle.updateArtcate)
//删除文章类别
router.get('/delete/:id', expressJoi(delete_art), router_handle.deleteArtcate)
//根据id获取文章分类
router.get('/ArtcateById/:id', expressJoi(delete_art), router_handle.setArtcate)

//根据id更新文章分类
router.post('/updateArticleById', router_handle.updateArtcateById)
module.exports = router