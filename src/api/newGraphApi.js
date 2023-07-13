import request from '@/utils/request'

// 获取后端传入的对neo4j图数据库操作数据的接口
export function getEchartsData(id) {
    return request({
        url: '/recommender/v1/graph/base/getEntitiesById',
        method: 'get',
        params:{
            id: id,
        }
    })
}