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