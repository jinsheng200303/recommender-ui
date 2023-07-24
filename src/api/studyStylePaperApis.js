import request from '@/utils/request'

//用户风格测试数据存储信息查询
export function getStylePaper() {
    return request({
        url: '/study-style-paper/list',
        method: 'get',
    })
}