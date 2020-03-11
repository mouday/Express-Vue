const express = require("express");
const User = require("../../models/User");
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");
const passport = require("passport");

const router = express.Router();


/**
 * 用户注册
 */
router.post("/register", async (req, res) => {
    console.log("注册信息：", req.body);
    console.log(req.body.email);

    // 查询数据库中是否有这个邮箱
    const user = await User.findOne({ 'email': req.body.email })
    console.log(user);

    if (user) {
        return res.json({ "msg": "邮箱已被注册", code: -1 })
    } else {
        /**
         * 密码加密
         * https://www.npmjs.com/package/bcrypt
         */
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt)

        /**
         * 处理头像
         * https://www.npmjs.com/package/gravatar
         */
        var avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password,
            identity: req.body.identity
        })

        try {
            const result = await newUser.save()
            res.json({ msg: 'success', code: 0 });

        } catch (err) {
            // console.log(err);
            res.json({ msg: err.message, code: -1 });
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
        res.status(404).json({ "msg": "用户不存在" })
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
             * jwt
             * https://www.npmjs.com/package/jsonwebtoken
             */
            // 过期时间：60分钟
            let token = jwt.sign(data, keys.secretKey, { expiresIn: 60 * 60 });

            res.json({ "msg": "success", "token": "Bearer " + token })

        } else {
            res.status(400).json({ "msg": "密码错误" })
        }
    }
})


/**
 * 验证通过后，获取当前用户信息
 */
router.get("/current", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        identity: req.user.identity,
        date: req.user.date,
    })
})

module.exports = router;
