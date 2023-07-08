import request from '@/utils/request'

// 分页查询用户角色信息
export function getUserRoleInfo(userInfo) {
    return request({
        url: '/person/pageUserName',
        method: 'post',
        data: userInfo
    })
}

// 修改用户角色信息
export function reviceUserRole(userInfo) {
        return request({
            url: '/person-role/reviseUserRole',
            method: 'post',
            data: userInfo
        })
    }

// 删除用户角色信息
export function DeleteUserRole(userRoleInfo) {
        return request({
            url: '/person-role/delBatch',
            method: 'post',
            data: userRoleInfo
        })
    }

// 新增用户角色信息
export function AddUserRole(userInfo) {
        return request({
            url: '/person-role/addUserRole',
            method: 'post',
            data: userInfo
        })
    }

