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

//课堂用户关联的新增/修改
export function joinClass(classUser) {
    return request({
        url: '/class-user/save',
        method: 'post',
        data: classUser
    })
}

//根据用户ID查找用户信息
export function getUserInfoById(userId) {
    return request({
        url: '/person/getById',
        method: 'get',
        params: {
            userId: userId,
        }
    })
}

//用户新增/修改
export function editUserInfo(userInfo) {
    return request({
        url: '/person/save',
        method: 'post',
        data: userInfo
    })
}

//根据用户ID查找其加入的课堂信息
export function getClassByuserId(userId) {
    return request({
        url: '/person/view/' + userId,
        method: 'get',
    })
}