import http from '@/utils/http';

const server = '/proxy-api';

// register
export function registerUser(query) {
  return http.post(`${server}/user/register`, query);
}

// login
export function logInUser(query) {
  return http.post(`${server}/user/logIn`, query);
}