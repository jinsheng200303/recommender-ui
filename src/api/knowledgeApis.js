import request from '@/utils/request'

//知识点列表
export function getKnowledgeList() {
    return request({
        url: '/knowledge/list',
        method: 'get',
    })
}