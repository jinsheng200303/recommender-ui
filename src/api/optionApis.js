import request from '@/utils/request'

// 新增/修改选项信息
export function reviseOptionInfo(optionsInfo) {
    return request({
        url: '/options/save',
        method: 'post',
        data: optionsInfo
    })
}

// 删除选项信息
export function deleteOptionInfo(optionsInfo) {
    return request({
        url: '/options/delBatch',
        method: 'post',
        data: optionsInfo
    })
}