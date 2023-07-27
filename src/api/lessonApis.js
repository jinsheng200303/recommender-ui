import request from '@/utils/request'

//课程查询
export function getLessonPage(lessonQuery) {
    return request({
        url: '/lesson/page',
        method: 'post',
        data: lessonQuery,
    })
}

//课程新增/修改
export function updateLesson(lesson) {
    return request({
        url: '/lesson/save',
        method: 'post',
        data: lesson,
    })
}

//删除课程
export function deleteLessonById(IDS) {
    return request({
        url: '/lesson/delBatch',
        method: 'post',
        data: IDS,
    })
}