import request from '@/utils/request'

//学习资源查询
export function getResourcePage(pageNum,pageSize,resourcesName) {
    return request({
        url: '/resources/page',
        method: 'post',
        data:{
            pageNum,
            pageSize,
            resourcesName,
        },
    })
}