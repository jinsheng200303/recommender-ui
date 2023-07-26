import request from '@/utils/request'

//用户风格测试数据存储信息查询
export function getPersonStyleById(userId) {
    return request({
        url: '/person-style-paper/page',
        method: 'post',
        data:{
            pageNum: 1,
            pageSize: 3,
            userId,
        },
    })
}

//用户提交风格测试卷保存数据
export function updatePersonStyle(userId,answers) {
    return request({
        url: '/person-style-paper/save',
        method: 'post',
        data:{
            userId,
            answers,
        },
    })
}

//获取学习资源推荐
export function getRecommendResource(userId) {
    return request({
        url: '/person-style-paper/resource-recommend',
        method: 'post',
        params: {
            userId,
        },

    })
}

//获取学习资源推荐
export function getRecommendQuestion(userId) {
    return request({
        url: '/person-style-paper/question-recommend',
        method: 'post',
        params: {
            userId,
        },

    })
}