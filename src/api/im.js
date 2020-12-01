import request from '@/utils/request'

export const getChatInfo = (data) => {
    return request('api/ImInfo', 'post', data)
}

//获取当前用户聊天信息
export const getUserChatInfo = (id) => {
    // return request('api/qureyMemberChatInfo', 'get')
    return request('api/GetImInfo?url=member_qureyMemberChatInfo&memid='+id, 'get')
}

//获取联系人信息
export const getLinkmanInfo = (id) => {
    // return request(':8080/lejia/im/queryLinkman','get')
    return request('api/GetImInfo?url=im_queryLinkman&memid='+id,'get')
}

// //获取群组信息
export const getGroupInfo = (id) => {
    // return request(':8080/lejia/im/queryGroups', 'get')
    return request('api/GetImInfo?url=im_queryGroups&memid='+id, 'get')
}

//查询我创建的群聊
export const getMyCreatGroupInfo = () => {
    // return request(':8080/lejia/im/queryMyCreatGroups','get')
    return request('api/GetImInfo?url=queryMyCreatGroups','get')
}
//创建顾客群聊
export const CreateGroupChat = (group) => {
    // return request(':8080/lejia/im/creatGroup','post',group)
    group.url = 'creatGroup';
    return request('api/GetImInfo','post',group)
}
//创建顾客群聊图片上传
export const GroupPortrait = (uuid,file) => {
    // return request(':8080/lejia/im/uploadGroupAvatat?groupId='+uuid,'post',file)
    return request('api/GetImInfo'+uuid,'post',file)
}