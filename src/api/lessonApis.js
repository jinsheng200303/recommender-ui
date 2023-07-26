import request from '@/utils/request'

//课程查询
export function getLessonPage(lessonQuery) {
    return request({
        url: '/lesson/page',
        method: 'post',
        data: lessonQuery,
    })
}