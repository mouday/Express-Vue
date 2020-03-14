module.exports = {
    // 异常处理
    errorHandler(err, req, res, next) {
        // console.error(err.stack);
        res.status(500).send(err.message);
    },

    /**
     * 跨域处理
     */
    crossDomainHandler(req, res, next) {
        // 配置跨域请求头
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-type, Accept, X-Access-Token, X-Key");

        if ("OPTIONS" == req.method) {
            res.status(200).end();
        }
        else {
            next();
        }
    }
}