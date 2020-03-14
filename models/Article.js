const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// 配置数据模型
const ArticleSchema = new Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    publish_time: {
        type: Date,
        default: Date.now,
    }
})

module.exports = Article = mongoose.model("Article", ArticleSchema);