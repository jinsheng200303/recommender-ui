import request from '@/utils/request'

// 获取测试数据接口1
export function getTestData1() {
    return request({
        url: '/person/list',
        method: 'get'
    })
}

// 获取测试数据接口2
export function getTestData2(personQuery) {
    return request({
        url: '/person/page',
        method: 'post',
        data: personQuery
    })
}