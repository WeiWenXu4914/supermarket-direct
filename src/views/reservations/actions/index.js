import request from '@/utils/request';

// 获取文章详情
export const AppointmentOrderDetail = (id) => {
    return request('/api/AppointmentOrderDetail', 'GET', { id: id })
}