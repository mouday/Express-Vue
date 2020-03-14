/**
 * node app.js
 * 
 * 文件名不是app.js会出现异常
 * address already in use
 * 
 */
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// 引入路由
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const articles = require("./routes/api/articles");
const auths = require("./routes/api/auths");

// 捕获异常
require('express-async-errors');

const handler = require("./routes/handler")
const path = require('path')
const serveStatic = require('serve-static')

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});


// 配置
const mongoURL = require("./config/keys").mongoURL;

// 连接mongodb
const mongoOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(mongoURL, mongoOptions).then(() => {
    console.log("mongodb connect");
}).catch((err) => {
    console.log(err);
})

const app = express();

// 静态文件
app.use(serveStatic(path.join(__dirname, 'client/dist')))

// 实现CORS(跨域)
app.all("*", handler.crossDomainHandler);

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

// 使用路由
app.use("/api/auths", auths)
app.use("/api/profiles", profiles)
app.use("/api/users", passport.authenticate('jwt', { session: false }), users)
app.use("/api/articles", passport.authenticate('jwt', { session: false }), articles)

// 异常处理
app.use(handler.errorHandler);


// 配置端口，启用监听
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server runing on http://127.0.0.1:${port}`);
})
