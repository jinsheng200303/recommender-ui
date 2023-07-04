import request from '@/utils/request'

// 获取全部用户信息
export function getAllUser() {
    return request({
        url: '/person/list',
        method: 'get'
    })
}

// 分页查询用户信息
export function getUserInfo(pageInfo) {
    return request({
        url: '/person/page',
        method: 'post',
        data: pageInfo
    })
}

// 新增用户信息
export function addUser(userInfo) {
        return request({
            url: '/person/save',
            method: 'post',
            data: userInfo
        })
    }

// 删除用户信息
export function DeleteUser(userId) {
        return request({
            url: '/person/delBatch',
            method: 'post',
            data: userId
        })
    }

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