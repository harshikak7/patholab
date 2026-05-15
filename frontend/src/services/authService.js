import axios from 'axios';

const API=axios.create({
    baseURL:'http://localhost:5000',
    withCredentials:true
});

export const signupUser=async(userData)=>{
    return API.post('/users/signup',userData)
}