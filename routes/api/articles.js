const express = require("express");
const Article = require("../../models/Article");
const response = require('../../utils/response');

const router = express.Router();


/**
 * 添加数据 和 编辑数据
 */
router.post("/add", async (req, res) => {

    const _id = req.body._id;

    const data = {
        title: req.body.title,
        content: req.body.content,
        publish_time: req.body.publish_time,
    }

    let msg = '';
    let ret;

    // 有id就更新，没有就添加
    if (_id) {
        ret = await Article.updateOne({ _id: _id }, { $set: data });
        msg = 'update'
    } else {
        ret = await new Article(data).save();
        msg = 'insert'
    }

    res.json({ code: 0, msg: msg, data: ret })
})

/**
 * 获取列表数据
 */
router.get("/list", async (req, res) => {
    const page = parseInt(req.query.page || '1')
    const size = parseInt(req.query.size || '5')
    // console.log(page, size);

    const list = await Article.find().skip((page - 1) * size).limit(size)
    const count = await Article.count()

    res.json(response.success({ count, list }))
})

/**
 * 获取单条数据
 */
router.get("/get/:id", async (req, res) => {
    console.log(req.params.id);

    const row = await Article.findOne({ _id: req.params.id })
    res.json({ code: 0, msg: 'success', data: row })
})

/**
 * 删除单条数据
 */
router.delete("/delete/:id", async (req, res) => {
    const row = await Article.deleteOne({ _id: req.params.id })
    res.json({ code: 0, msg: 'success', data: row })
})

module.exports = router;
