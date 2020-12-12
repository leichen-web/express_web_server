const express = require('express')

const router = express.Router()

const path = require('path')

const multer = require('multer')

let upload = multer({ dest: path.join(__dirname, '../uploads') });

const router_handle = require('../router_handle/article_handle')

// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { addArticle } = require('../schma/article')


router.post('/addArticle', upload.single('cover_img'), expressJoi(addArticle), router_handle.addArticle)



module.exports = router