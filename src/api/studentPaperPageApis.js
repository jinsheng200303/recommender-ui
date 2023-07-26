import request from '@/utils/request'

//学习资源查询
export function getStudentPaper(studentPaperQuery) {
    return request({
        url: '/student-paper/page',
        method: 'post',
        data:studentPaperQuery,
    })
}