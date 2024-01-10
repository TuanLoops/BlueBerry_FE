import axios from "axios";

export const Url = () => {
    return axios.create({
        baseURL: 'http://localhost:8080'
    })
}

export const UrlUser = () => {
    let currentUser = JSON.parse(localStorage.getItem("AccessToken"));
    if (currentUser){
        return axios.create({
            baseURL: 'http://localhost:8080/auth/api/users',
            headers: {"authority" :  `Bearer ${currentUser}`}
        })
    }else {
        return axios.create({
            baseURL: 'http://localhost:8080/auth/api/users',
        })
    }
}