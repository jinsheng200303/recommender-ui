import request from '@/utils/request'

//根据课堂ID查找考试
export function getExamsById(classId) {
    return request({
        url: '/exams/getById',
        method: 'get',
        params: {
            classExamsData
        },
    })
}

//exams分页查询
export function getExamsPage(examsQuery) {
    return request({
        url: '/exams/page',
        method: 'post',
        data: examsQuery,
    })
}

//exams 根据id批量删除
export function deleteExamsByIds(ids) {
    return request({
        url: '/exams/delBatch',
        method: 'post',
        data: ids,
    })
}

//exams 数据保存或更新
export function updateExam(exams) {
    return request({
        url: '/exams/save',
        method: 'post',
        data: exams,
    })
}

//exams 自动生成试卷
export function autoGenerateExam(generatePapersQuery) {
    return request({
        url: '/papers/autoTakePaper',
        method: 'post',
        data: generatePapersQuery,
    })
}

//学生提交考卷保存数据
export function examSubmit(userId,examId,paper) {
    return request({
        url: '/student-paper/save',
        method: 'post',
        data:{
            userId,
            examId,
            paper,
        }
    })
}