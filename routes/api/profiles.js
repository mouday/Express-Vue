const express = require("express");
const Profile = require("../../models/Profile");
const passport = require("passport");

const router = express.Router();


router.get("/test", (req, res) => {
    res.json({ "msg": "profile works" })
})

/**
 * 添加数据 和 编辑数据
 */
router.post("/add", passport.authenticate('jwt', { session: false }), async (req, res) => {


    const data = {
        type: req.body.type || '',
        describe: req.body.describe || '',
        income: req.body.income || '',
        expend: req.body.expend || '',
        remark: req.body.remark || '',
        cash: req.body.cash || '',
    }
    const profile = await new Profile(data).save();

    res.json({ code: 0, msg: 'success', data: profile })
})

/**
 * 获取列表数据
 */
router.get("/list", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const list = await Profile.find()
    res.json({ code: 0, msg: 'success', data: list })
})

/**
 * 获取单条数据
 */
router.get("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const row = await Profile.findOne({ _id: req.params.id })
    res.json({ code: 0, msg: 'success', data: row })
})

/**
 * 编辑数据
 */
router.post("/edit/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const data = {
        type: req.body.type || '',
        describe: req.body.describe || '',
        income: req.body.income || '',
        expend: req.body.expend || '',
        remark: req.body.remark || '',
        cash: req.body.cash || '',
    }
    const ret = await Profile.updateOne({ _id: req.params.id }, {
        $set: data
    });
    res.json(ret)

})

/**
 * 删除单条数据
 */
router.delete("/delete/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const row = await Profile.deleteOne({ _id: req.params.id })
    res.json(row)
})

module.exports = router;
