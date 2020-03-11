const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// 配置数据模型
const ProfileSchema = new Schema({
    type: {
        type: String,
    },
    describe: {
        type: String,
    },
    income: {
        type: String,
        required: true,
    },
    expend: {
        type: String,
        required: true,
    },
    cash: {
        type: String,
        required: true,
    },
    remark: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = Profile = mongoose.model("Profile", ProfileSchema);