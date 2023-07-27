import request from '@/utils/request'

//学习资源查询
export function getResourcePage(resourcesQuery) {
    return request({
        url: '/resources/page',
        method: 'post',
        data:resourcesQuery,
    })
}

//学习资源数据保存或更新
export function updateResource(resources) {
    return request({
        url: '/resources/save',
        method: 'post',
        data:resources,
    })
}

//学习资源根据id批量删除
export function deleteResourceById(IDS) {
    return request({
        url: '/resources/delBatch',
        method: 'post',
        data:IDS,
    })
}