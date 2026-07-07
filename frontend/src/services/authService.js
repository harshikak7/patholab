import axios from 'axios';
const API=axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials:true
});

export const signupUser=async(userData)=>{
    return API.post('/users/signup',userData)
}

export const loginUser=async(userData)=>{
    return API.post('/users/login',userData)
}

export const checkAuth=async()=>{
    return API.get('/users/check-auth')
}

export const logoutUser=async()=>{
    return API.post('/users/logout')
}

export const forgotPassword=async(email)=>{
    console.log(email);
    return API.post('/users/forgot-Password',email)
}

export const resetPassword=async(data)=>{
    return API.post('/users/reset-password',data)
}

export const googleLogin=async(data)=>{
    return API.post('/users/google-login',data)
}