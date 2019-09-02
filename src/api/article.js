import request from '@/utils/request'

export function getArticleList(params) {
    return request({
        url: '/article',
        method: 'get',
        params
    })
}
export function getArticleDetail(id) {
    return request({
        url: `/article/${id}`,
        method: 'get'
    })
}

export function deleteById(id) {
    return request({
        url: `/article/${id}`,
        method: 'delete'
    })
}

export function addArticle(params) {
    return request({
        url: '/article',
        method: 'post',
        data: params
    })
}
export function updateArticle(id, params) {
    return request({
        url: `/article/${id}`,
        method: 'patch',
        data: params
    })
}