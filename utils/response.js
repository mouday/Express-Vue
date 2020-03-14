// 通用的响应体
const response = {
    data(data, code, msg) {
        return { data, code, msg }
    },

    success(data) {
        return this.data(data, code = 0, msg = "success")
    },

    error(data) {
        return this.data(data, code = -1, msg = "error")
    }
}

module.exports = response