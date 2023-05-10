import request from '@/utils/request'

// 获取测试数据接口1
export function getTestData1() {
    return request({
        url: '/recommender/test1',
        method: 'get'
    })
}

// 获取测试数据接口2
export function getTestData2() {
    return request({
        url: '/recommender/test2',
        method: 'get'
    })
}