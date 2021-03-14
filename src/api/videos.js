import http from '@/utils/http';

const server = '/proxy-api';

// 请求视频列表：
// 班级列表
export function queryVideoList(query = {}) {
  return http.get(`${server}/v/queryList`, query);
}

// 获取视频
export function queryVideoDetail(id) {
  return http.post(`${server}/v/queryById?id=${id}`)
}