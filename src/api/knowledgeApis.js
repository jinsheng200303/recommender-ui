import request from '@/utils/request'

//知识点列表
export function getKnowledgeList() {
    return request({
        url: '/knowledge/list',
        method: 'get',
    })
}

//知识点查询
export function getKnowledgePage(knowledgeQuery) {
    return request({
        url: '/knowledge/page',
        method: 'post',
        data: knowledgeQuery,
    })
}

//知识点根据id批量删除
export function deleteKnowledgeById(IDS) {
    return request({
        url: '/knowledge/delBatch',
        method: 'post',
        data: IDS,
    })
}

//知识点数据保存或更新
export function updateKnowledge(knowledge) {
    return request({
        url: '/knowledge/save',
        method: 'post',
        data: knowledge,
    })
}