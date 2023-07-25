import request from '@/utils/request'

// 统计不同政治面貌的人数(柱状表)
export function getEchartsUsersPolitics() {
        return request({
            url: '/echarts/politics',
            method: 'get'
        })
    }
    
    // 统计不同性别的人数(空心饼图)
    export function getEchartsUsersAge() {
        return request({
            url: '/echarts/age',
            method: 'get',
        })
    }

// 统计不同角色的人数(柱状表)
export function getUsersRole() {
        return request({
            url: '/echarts/role',
            method: 'get'
        })
    }

//根据用户ID查找其知识点掌握程度
export function getDinaById(userId) {
    return request({
        url: '/person/dina/' +userId,
        method: 'get',
    })
}