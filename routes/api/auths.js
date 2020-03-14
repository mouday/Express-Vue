
const express = require("express");
const User = require("../../models/User");
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const keys = require('../../config/keys')
const jwt = require('jsonwebtoken')

const router = express.Router();

/**
* 密码加密
* https://www.npmjs.com/package/bcrypt
*/
function getPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt)
}

/**
 * 处理头像
 * https://www.npmjs.com/package/gravatar
 */
function getAvatar(email) {
    return gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
}


/**
 * 用户注册
 */
router.post("/register", async (req, res) => {
    // 查询数据库中是否有这个邮箱
    const user = await User.findOne({ 'email': req.body.email })

    if (user) {
        return res.json({ "msg": "邮箱已被注册", code: -1 })
    } else {
        const password = getPassword(req.body.password)

        var avatar = getAvatar(req.body.email)

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password,
            identity: 'employee'
        })

        try {
            const result = await newUser.save()
            res.json({ msg: 'success', code: 0, data: {} });

        } catch (err) {
            res.json({ msg: err.message, code: -1, data: {} });
        }
    }
})

/**
 * 用户登录
 */
router.post("/login", async (req, res) => {
    console.log(req.body);

    // 查询数据库中是否有这个邮箱
    const user = await User.findOne({ 'email': req.body.email })

    // 用户校验
    if (!user) {
        res.json({ "msg": "用户不存在", code: -1 })
    } else {
        // 密码校验
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const data = {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                identity: user.identity
            };

            /**
             * jwt Bearer
             * https://www.npmjs.com/package/jsonwebtoken
             */
            // 过期时间 单位：秒 60 * 60 * 24
            let token = jwt.sign(data, keys.secretKey, { expiresIn: '7h' });

            res.json({ msg: "success", token: token, code: 0 })

        } else {
            res.json({ msg: "密码错误", code: -1 })
        }
    }
})

module.exports = router;
