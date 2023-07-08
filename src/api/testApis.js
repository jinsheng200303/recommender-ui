import request from '@/utils/request'

//题库列表
export function getQuestionBank() {
    return request({
        url: '/question-bank/list',
        method: 'get',
    })
}

//题库分页查询
// questionBankQuery: {
//     pageNum: 1,
//     pageSize: 4,
//     questionBankName: "",
// },
export function getQuestionBankPage(questionBankQuery) {
    return request({
        url: '/question-bank/page',
        method: 'post',
        data: questionBankQuery,
    })
}

//试题分页查询
// questionBankQuery: {
//     pageNum: 1,
//     pageSize: 4,
//     questionBankName: "",
//     bankId: 1,
// },
export function getQuestionPage(questionsQuery) {
    return request({
        url: '/questions/questionAndOptions',
        method: 'post',
        data: questionsQuery,
    })
}

//做题记录保存或更新
// {
// 	"answer": "",
// 	"examId": 0,
// 	"paperId": 0,
// 	"questionId": 0,
// 	"recordId": 0,
// 	"score": "",
// 	"status": 0,
// 	"userId": 0
// }
export function updateRecords(records) {
    return request({
        url: '/records/save',
        method: 'post',
        data: records,
    })
}