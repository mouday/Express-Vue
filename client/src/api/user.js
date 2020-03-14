import request from '@/uitls/request.js'

/**
 * 获取用户信息
 */
export function getUserInfo(id) {
    return request({
        url: '/api/users/info/' + id,
        method: 'get'
    })
}

/**
 * 获取用户列表
 */
export function getUserList() {
    return request({
        url: '/api/users/list',
        method: 'get'
    })
}

/**
 * 设置用户信息
 */
export function setUserInfo({ id, name, identity }) {
    const data = {
        id: id,
        name: name,
        identity: identity
    };
    return request({
        url: '/api/users/update',
        method: 'post',
        data
    })
}
