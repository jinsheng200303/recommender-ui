import request from '@/utils/request'

// 用户登录
export function userLogin(loginPerson) {
    return request({
        url: '/person/login',
        method: 'post',
        data: loginPerson,
    })
}

//获取学生信息--id数组
export function getUserArrayInfo(IDS) {
    return request({
        url: '/person/UserList',
        method: 'post',
        data: IDS
    })
}