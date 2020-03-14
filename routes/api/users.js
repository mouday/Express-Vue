const express = require("express");

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
            identity: user.identity
        }
    }

    res.json({ msg: "success", data: data, code: 0 })
})

/**
 * 注册用户列表
 */
router.get("/list", async (req, res) => {

    const rows = await User.find()
    const data = []

    for (let row of rows) {
        const item = {
            id: row['id'],
            name: row['name'],
            email: row['email'],
            avatar: row['avatar'],
            identity: row['identity'],
            date: row['date'],
        }

        data.push(item)
    }
    res.json({ msg: "success", data: data, code: 0 })
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
module.exports = router;
