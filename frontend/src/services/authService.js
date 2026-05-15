import axios from 'axios';

const API=axios.create({
    baseURL:'http://localhost:5000',
    withCredentials:true
});

export const signupUser=async(userData)=>{
    return API.post('/users/signup',userData)
}

export const loginUser=async(userData)=>{
    return API.post('/users/login',userData)
}

export const checkAuth=async()=>{
    return API.get('users/check-auth')
}