import request from '@/utils/request'

// 获取echarts官网数据接口
export function getEchartsData() {
    return request({
        url: 'https://echarts.apache.org/examples/data/asset/data/les-miserables.json',
        method: 'get'
    })
}