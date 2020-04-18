const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// 配置数据模型
const TodoListSchema = new Schema({
    title: {
        type: String,
    },
    data: {
        type: Array,
    },
    create_time: {
        type: Date,
        default: Date.now,
    }
})

module.exports = TodoList = mongoose.model("TodoList", TodoListSchema);