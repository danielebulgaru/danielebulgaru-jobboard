import api from './api/axiosConfig';

export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function getToken() {
  return localStorage.getItem('token');
}

export function isLoggedIn() {
  return !!getToken();
}

export function hasRole(role) {
  const user = getUser();
  return user && user.role === role;
}

export async function login(email, password) {
  const res = await api.post('/auth/login', { email, password });
  const data = res.data;
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data));
  return data;
}

export async function register(formData) {
  const res = await api.post('/auth/register', formData);
  return res.data;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
}