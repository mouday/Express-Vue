const express = require("express");
const User = require("../../models/User");
const response = require('../../utils/response');


const router = express.Router();

/**
 * @route  POST api/users/info/
 * @desc   验证通过后，获取当前用户信息
 * @access Private
 */
router.get("/info/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    let data = {}

    if (user) {
        data = {
            id: user.id,
            name: user.name,
            email: user.email,
            date: user.date,
            avatar: user.avatar,
            identity: user.identity
        }
    }

    res.json({ msg: "success", data: data, code: 0 })
})

/**
 * 注册用户列表
 */
router.get("/list", async (req, res) => {
    const page = parseInt(req.query.page || '1')
    const size = parseInt(req.query.size || '5')

    const _list = await User.find().skip((page - 1) * size).limit(size)

    const list = _list.map(item => {
        return {
            id: item._id,
            name: item.name,
            email: item.email,
            avatar: item.avatar,
            identity: item.identity,
            date: item.date,
        }
    })

    const count = await User.countDocuments()

    res.json(response.success({ count, list }))
})

/**
 * 修改用户信息
 */
router.post("/update", async (req, res) => {
    const data = {
        name: req.body.name,
        identity: req.body.identity,
    }
    const ret = await User.updateOne({ _id: req.body.id }, { $set: data });

    res.json({ msg: "success", data: ret, code: 0 })
})

/**
 * 删除用户信息
 */
router.delete("/delete", async (req, res) => {
    const id = req.query.id;

    const ret = await User.deleteOne({ _id: id })

    res.json(response.success(ret))
})


module.exports = router;

