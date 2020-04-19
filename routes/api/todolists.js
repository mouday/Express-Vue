const express = require("express");
const TodoList = require("../../models/TodoList");
const response = require('../../utils/response');

const router = express.Router();


/**
 * 添加数据 和 编辑数据
 */
router.post("/edit", async (req, res) => {

    let id = req.body.id;

    const data = {
        title: req.body.title,
        water: req.body.water,
        run: req.body.run,
        skipping: req.body.skipping,
        sit_up: req.body.sit_up,
    }

    let msg = '';
    let ret = '';

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
        id = ret._id
    }
    // 返回id
    res.json(response.success({
        id
    }, 0, msg))

})

/**
 * 获取列表数据
 */
router.get("/list", async (req, res) => {
    const page = parseInt(req.query.page || '1')
    const size = parseInt(req.query.size || '7')
    // console.log(page, size);

    const _list = await TodoList.find().sort({
        'title': -1
    }).skip((page - 1) * size).limit(size)

    const list = _list.map(row => {
        return {
            id: row._id,
            title: row.title,
            water: row.water,
            run: row.run,
            skipping: row.skipping,
            sit_up: row.sit_up,
        }
    })
    const count = await TodoList.countDocuments()

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

    const row = await TodoList.findOne({
        _id: req.params.id
    })

    let data = {}
    if (row) {
        data = {
            id: row._id,
            title: row.title,
            water: row.water,
            run: row.run,
            skipping: row.skipping,
            sit_up: row.sit_up,
        }
    }

    res.json(response.success(data))
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