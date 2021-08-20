import request from '@/utils/request'

export function getClassifyList(params) {
    return request({
        url: '/classify',
        method: 'get',
        params
    })
}

export function deleteById(id) {
    return request({
        url: `/classify/${id}`,
        method: 'delete'
    })
}

export function addClassify(params) {
    return request({
        url: '/classify',
        method: 'post',
        data: params
    })
}