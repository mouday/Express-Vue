const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");

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

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get("/", (req, res) => {
    res.send("hello world!");
})

// 使用路由
app.use("/api/users", users)
app.use("/api/profiles", profiles)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server runing on http://127.0.0.1:${port}`);
})