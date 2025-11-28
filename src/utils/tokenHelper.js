/**
 * → Token save/get/remove functions
 */

export const saveToken = (token) => localStorage.setItem("token", token);
// console.log('token', token)

export const getToken = () => localStorage.getItem("token");

export const removeToken = () => localStorage.removeItem("token");
