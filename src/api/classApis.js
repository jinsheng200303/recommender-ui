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
        url: '/classes/save',
        method: 'post',
        data: classes,
    })
}

//获取课堂学生或教师 id--roleId=1 学生，roleId=2 教师
export function getClassStudentId(classId,roleId) {
    return request({
        url: '/class-user/class-student-query',
        method: 'post',
        params:{
            classId,
            roleId,
        }
    })
}

//删除课堂用户关联信息  IDS用户id数组
export function deleteClassStudent(IDS) {
    return request({
        url: '/class-user/delBatch',
        method: 'post',
        data: IDS
    })
}