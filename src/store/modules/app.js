import {
  getList,
  getGameList,
  loginByUsername,
  getUserInfo
} from '@/api/app'

const app = {
    state:{

    },
    mutations: {

    },
    actions:{
        GetList({commit,state}){
            return new Promise((resolve,reject)=>{
                getList().then(res=>{
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        GetGameList({commit,state}){
            return new Promise((resolve,reject)=>{
                getGameList().then(res=>{
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        // 用户名登录
        LoginByUsername({ commit }, userInfo) {
            const username = userInfo.username.trim()
            // commit('SET_LOGIN_USERNAME', username)
            localStorage.setItem('username', username)
            // commit('SET_PASSWORD', userInfo.password)
            localStorage.setItem('password', userInfo.password)
            return new Promise((resolve, reject) => {
                loginByUsername(username, userInfo.password).then(response => {
                console.log(response)
                const res = response.data
                resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        getMe({commit,state}){
            return new Promise((resolve, reject) => {
                getUserInfo().then(response => {
                    const data = response.data.data.user
                    if (data.role && data.role != null) { // 验证返回的roles是否是一个非空数组
                        localStorage.setItem('permissions', JSON.stringify(data.permissions));
                    } else {
                        reject('getInfo: roles must be a non-null array !')
                    }
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
export default app;