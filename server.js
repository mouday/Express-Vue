const express = require("express");
// 捕获异常
require('express-async-errors');

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// 引入路由
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const articles = require("./routes/api/articles");
const auths = require("./routes/api/auths");



// 配置
const db = require("./config/keys").mongoURL;

// 连接mongodb
const mongoOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(db, mongoOptions).then(() => {
    console.log("mongodb connect");
}).catch((err) => {
    console.log(err);
})

const app = express();


/**
 * 使用 body-parser 中间件
 */
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// 解析 application/json
app.use(bodyParser.json());

// passport 初始化
app.use(passport.initialize());

require("./config/passport")(passport);


app.get("/", (req, res) => {
    res.send("hello world!");
})

// 使用路由
app.use("/api/auths", auths)
app.use("/api/profiles", profiles)
app.use("/api/users", passport.authenticate('jwt', { session: false }), users)
app.use("/api/articles", passport.authenticate('jwt', { session: false }), articles)

// 异常处理
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
}

app.use(errorHandler);


// 配置端口，启用监听
const port = 5000;

app.listen(port, () => {
    console.log(`Server runing on http://127.0.0.1:${port}`);
})
