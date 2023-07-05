import request from '@/utils/request'

//用户注册获取验证码
export function getEmailCode(userRegisterDTO) {
    return request({
        url: '/person/registerCode',
        method: 'post',
        data: userRegisterDTO,
    })
}

//用户注册
export function userRegister(userRegisterDTO) {
    return request({
        url: '/person/register',
        method: 'post',
        data: userRegisterDTO,
    })
}