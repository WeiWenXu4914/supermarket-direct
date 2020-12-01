import request from '@/utils/request'

/**
 * 获取消息
 */
export const messagePost = (data) => {
    return request('/api/messageCenter?class='+data, 'get')
}

/**
 * 清空所有未读消息
 */
export const readAll = () => {
    return request('/api/readAll', 'get')
}

// 我的关注
export const myAttention = () => {
    return request('/api/myAttention', 'post')
}

// //取消关注
// export function Unfollow(data){
//     return request({
//         url:'/api/memberAttention',
//         method:'post',
//         data:data
//     })
// }

// 用户信息
export const userInfo = () => {
    return request('/api/personalCenter', 'post')
}

// 我的粉丝
export const myFans = () => {
    return request('/api/myFans', 'post')
}

// 项目关注
export const memberAttention = (form) => {
    return request('/api/memberAttention', 'post', form)
}

// 个人主页
export const userIndex = (user_id) => {
    let res
    user_id ? res = request('/api/personalHome', 'post', { user_id: user_id }) : res = request('/api/personalHome', 'post')
    return res
}

// 个人中心
export const userHome = () => {
    return request('/api/personalCenter', 'post')
}

// 修改个人简介
export const userIntor = (val) => {
    return request('/api/userIntro', 'post', { val: val })
}
// 修改个人头像与昵称
export const userEdit = (val) => {
    return request('/api/userEdit', 'post', val)
}
/**
 * 点赞
 * @param {*} id 
 */
export const memberLike = (mem_like_id, mem_like_class, state) => {
    return request('/api/memberLike', 'post', { mem_like_id, mem_like_class, state })
}

/**
 * 转发文章
 * @param {*} id 
 */
export const forwardArticles = (mem_forward_id, mem_forward_class) => {
    return request('/api/memberForward', 'post', { mem_forward_id, mem_forward_class })
}

/**
 * 问题反馈
 * @param {*} phone,message,fileList,mem_id
 */
export const problemFeedback = (data) => {
    return request('/api/problemFeedback', 'post', data)
}
/**
 * 申请成为员工
 */
export const applyForEmployee = (data) => {
    return request('/api/applyForEmployee', 'post', data)
}
/**
 * 员工类型
 */
export const EmployeeType = () => {
    return request('/api/EmployeeType', 'get', )
}
/**
 * 发送验证码
 */
export const AliSms = (phone) => {
    return request('/api/AliSms', 'post', { mobile:phone } )
}

// 我的开团参团
export const MyOpenJoinGroupBuying = (val) => {
    return request('/api/MyOpenJoinGroupBuying?val='+val, 'get')
}

/***
 * 我的转发
*/
export const myforward = () => {
    return request('/api/myforward', 'post')
}
/***
 * 删除我的转发
*/
export const myforwarddel = (id) => {
    return request('/api/myforwarddel', 'post', { mfid: id })
}
/***
 * 我的评论
*/
export const myComment = () => {
    return request('/api/myComment', 'post')
}
/***
 * 删除我的评论
*/
export const myCommentdel = (id) => {
    return request('/api/myCommentdel', 'post', { mcid: id })
}
/***
 * 我的点赞
*/
export const myMemberLike = () => {
    return request('/api/myMemberLike', 'post', )
}
/***
 * 删除我的点赞
*/
export const myMemberLikeDel = (id) => {
    return request('/api/myMemberLikeDel', 'post', { mlid: id } )
}