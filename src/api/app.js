import request from '@/utils/request'


export function getList() {
    return request({
        url: '/api/getnews',
        method:'get',
    })
}

export function getGameList() {
    return request({
        url: '/api/getgamelist',
        method:'get',
    })
}

export function loginByUsername(username, password) {
    const data = {
        username,
        password
    }
    return request({
        url: '/api/login',
        method: 'post',
        data
    })
}

export function getUserInfo() {
    return request({
        url: '/api/me',
        method: 'post',
    })
}