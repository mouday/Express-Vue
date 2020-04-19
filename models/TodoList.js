const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// 配置数据模型
const TodoListSchema = new Schema({
    title: {
        type: String,
    },

    // 喝水
    water: {
        type: Number,
        default: 0
    },

    // 跑步
    run: {
        type: Number,
        default: 0
    },

    // 跳绳
    skipping: {
        type: Number,
        default: 0
    },

    // 仰卧起坐
    sit_up: {
        type: Number,
        default: 0
    },

    create_time: {
        type: Date,
        default: Date.now,
    }
})

module.exports = TodoList = mongoose.model("TodoList", TodoListSchema);