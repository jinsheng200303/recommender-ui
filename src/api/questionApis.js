import request from '@/utils/request'

// 分页查询试题信息
export function getQuestionInfo(questionsInfo) {
    return request({
        url: '/questions/findQuestions',
        method: 'post',
        data: questionsInfo
    })
}

// 新增/修改试题信息
export function reviseQuestionInfo(questionsInfo) {
    return request({
        url: '/questions/addQuestionKnowledge',
        method: 'post',
        data: questionsInfo
    })
}

// 删除试题信息
export function deleteQuestionInfo(questionsInfo) {
    return request({
        url: '/questions/delBatchQuestionsAndOptions',
        method: 'post',
        data: questionsInfo
    })
}

//查询单个试题对应权限（分级查找）
export function findQuestionOptions(questionsId) {
    return request({
        url: '/questions/findQuestionOptions',
        method: 'post',
        data: questionsId
    })
}
