const express = require("express");
const TodoList = require("../../models/TodoList");
const response = require('../../utils/response');

const router = express.Router();


/**
 * 添加数据 和 编辑数据
 */
router.post("/add", async (req, res) => {

    const id = req.body.id;

    const data = {
        title: req.body.title,
        data: req.body.data,
    }

    let msg = '';
    let ret;

    // 有id就更新，没有就添加
    if (id) {
        ret = await TodoList.updateOne({
            _id: id
        }, {
            $set: data
        });
        msg = 'update'
    } else {
        ret = await new TodoList(data).save();
        msg = 'insert'
    }

    res.json({
        code: 0,
        msg: msg,
        data: ret
    })
})

/**
 * 获取列表数据
 */
router.get("/list", async (req, res) => {
    const page = parseInt(req.query.page || '1')
    const size = parseInt(req.query.size || '5')
    // console.log(page, size);

    const _list = await Article.find().skip((page - 1) * size).limit(size)
    const list = _list.map(item => {
        return {
            id: item._id,
            title: item.title,
            content: item.content,
            publish_time: item.publish_time
        }
    })

    const count = await Article.countDocuments()

    res.json(response.success({
        count,
        list
    }))
})

/**
 * 获取单条数据
 */
router.get("/get/:id", async (req, res) => {
    console.log(req.params.id);

    const row = await Article.findOne({
        _id: req.params.id
    })

    let data = {}
    if (row) {
        data = {
            id: row._id,
            title: row.title,
            content: row.content,
            publish_time: row.publish_time
        }
    }

    res.json({
        code: 0,
        msg: 'success',
        data
    })
})

/**
 * 删除单条数据
 */
router.delete("/delete/:id", async (req, res) => {
    const row = await Article.deleteOne({
        _id: req.params.id
    })
    res.json({
        code: 0,
        msg: 'success',
        data: row
    })
})

module.exports = router;