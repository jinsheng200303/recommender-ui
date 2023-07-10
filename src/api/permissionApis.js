import request from '@/utils/request'

// 分页查询角色信息
export function getRoleInfo(roleInfo) {
    return request({
        url: '/role/page',
        method: 'post',
        data: roleInfo
    })
}

// 查询单个角色权限信息
export function getRolePermissionInfo(roleIdAndPermission) {
    return request({
        url: '/role-permission/rolePermissions',
        method: 'post',
        data: roleIdAndPermission
    })
}

// 新增/修改角色信息
export function reviseRoleInfo(roleInfo) {
    return request({
        url: '/role/save',
        method: 'post',
        data: roleInfo
    })
}

// 删除角色信息
export function deleteRoleInfo(roleInfo) {
    return request({
        url: '/role/delBatch',
        method: 'post',
        data: roleInfo
    })
}

//查询单个角色对应权限（分级查找）
export function findRolePermission(roleId) {
    return request({
        url: '/Permission/findAllPermission',
        method: 'post',
        data: roleId
    })
}

//修改单个角色对应权限
export function reviseRolePermission(roleId,permissionId) {
    return request({
        url: '/role-permission/reviseRolePermissions',
        method: 'post',
        data: permissionId,
        params: {roleId},
    })
}