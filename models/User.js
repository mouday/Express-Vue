const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// 配置数据模型
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    avatar: {
        type: String
    },
    identity: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = User = mongoose.model("User", UserSchema);