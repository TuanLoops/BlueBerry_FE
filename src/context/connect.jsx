import axios from "axios";

export const Url = () => {
    return axios.create({
        baseURL: 'http://localhost:8080'
    })
}

export const UrlUser = () => {
    let currentUser = JSON.parse(localStorage.getItem("users"));
    if (currentUser){
        return axios.create({
            baseURL: 'http://localhost:8080/users/api/auth',
            headers: {"authority" :  `Bearer ${currentUser.token}`}
        })
    }else {
        return axios.create({
            baseURL: 'http://localhost:8080/users/api/auth',
        })
    }
}