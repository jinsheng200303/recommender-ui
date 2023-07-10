import request from '@/utils/request'

// 分页查询课堂
// pageInfo:{
//     className: "",
//     pageNum: 1,
//     pageSize: 4,
// }, 
export function classPage(pageInfo) {
    return request({
        url: '/classes/page',
        method: 'post',
        data: pageInfo,
    })
}

//删除课堂 课堂id数组
export function deleteClass(IDS) {
    return request({
        url: '/classes/delBatch',
        method: 'post',
        data: IDS,
    })
}

//新增课堂
// classes: {
//     classId: 0,
//     className: "",
//     classPicture: "",
//     createdTime: ""
// },
export function addClass(classes) {
    return request({
        url: '/classes/addClass',
        method: 'post',
        data: classes,
    })
}

//获取课堂学生或教师 id--roleId=1 学生，roleId=2 教师
export function getClassStudentId(classId,roleId) {
    return request({
        url: '/class-user/class-users-query',
        method: 'post',
        params:{
            classId,
            roleId,
        }
    })
}

//删除指定课堂学生  studentId为数组
export function deleteClassStudent(classId,studentId) {
    return request({
        url: '/class-user/class-student-del',
        method: 'post',
        params: {
            classId,
        },
        data:studentId,
    })
}

// 分页查询课堂及教师信息
export function getTeacherClassInfo(userClassInfo) {
        return request({
            url: '/classes/classInfoQuery',
            method: 'post',
            data: userClassInfo
        })
    }

    //新增/修改课堂（无图片）
export function newClass(classInfo) {
    return request({
        url: '/classes/addClass',
        method: 'post',
        data: classInfo,
    })
}
