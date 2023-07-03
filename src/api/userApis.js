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