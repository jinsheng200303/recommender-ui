import request from '@/utils/request'
import moment from "moment";

//浏览记录的新增/修改
export function recordBrowse(resourceId,userId) {
    return request({
        url: '/browse-records/save',
        method: 'post',
        data: {
            resourceId,
            userId,
            startTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        },
    })
}