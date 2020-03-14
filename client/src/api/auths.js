

import request from '@/uitls/request.js'

/**
 * 登录
 */
export function userLogin({ email, password }) {
    return request({
        url: '/api/auths/login',
        method: 'post',
        data: { email, password }
    })
}

/**
 * 注册
 */
export function userRegister({ name, email, password }) {
    return request({
        url: '/api/auths/register',
        method: 'post',
        data: { name, email, password }
    })
}
