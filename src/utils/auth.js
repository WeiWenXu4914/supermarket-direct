// token
// 约定value  json字符串  {token:'',refresh_token:''}
const KEY = 'LeHome-user-auth'
const KEYS = 'Authorization'

// 获取
export const getUser = () => {
    return JSON.parse(window.localStorage.getItem(KEY) || '{}')
}

// 设置
export const setUser = (user) => {
    window.localStorage.setItem(KEY, JSON.stringify(user))
    window.localStorage.setItem(KEYS, user.token)
}

// 修改
export const upUser = (val) => {
    var list = JSON.parse(window.localStorage.getItem(KEY));
    list[val.key] = val.val;
    window.localStorage.setItem(KEY, JSON.stringify(list));
    if(val.val == 'token'){
        window.localStorage.setItem(KEYS, val.val);
    }
}

// 删除
export const delUser = () => {
    window.localStorage.removeItem(KEY)
    window.localStorage.removeItem(KEYS)
}

// 获取
export const getMerchantsId = () => {
    return JSON.parse(window.localStorage.getItem('merchantsId') || '[]')
}

// 设置
export const setMerchantsId = (merchantsId) => {
    window.localStorage.setItem('merchantsId', merchantsId)
}

// 删除
export const delMerchantsId = () => {
    window.localStorage.removeItem('merchantsId')
}

export const getMerchants = () => {
    return JSON.parse(window.localStorage.getItem('merchantsRouter') || '[]')
}

// 设置
export const setMerchants = (merchants) => {
    window.localStorage.setItem('merchants', merchants)
}