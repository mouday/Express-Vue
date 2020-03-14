import request from '@/uitls/request.js'

/**
 * 获取文章列表
 */
export function getArticleList({ page = 1, size = 5 }) {
    return request({
        url: '/api/articles/list',
        method: 'get',
        params: { page, size }
    })
}

/**
 * 删除文章
 */
export function deleteArticle(id) {
    return request({
        url: "/api/articles/delete/" + id,
        method: 'get',
    })
}

/**
 * 获取一篇文章
 */
export function getArticleById(id) {
    return request({
        url: "/api/articles/get/" + id,
        method: 'get',
    })
}

/**
 * 添加或修改一篇文章
 */
export function addArticle({ id, title, content, publish_time }) {
    return request({
        url: "/api/articles/add",
        method: 'post',
        data: { id, title, content, publish_time }
    })
}




