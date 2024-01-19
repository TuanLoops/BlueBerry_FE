import {UrlStatus} from "../../context/connect.jsx";

export const getAllComments=async (id)=>{
    try {
        let res = await UrlStatus().get(`${id}/comments`)
        return res.data;
    }catch (e) {
        console.log(e);
        return [];
    }
}
export const createComment = async(id,comment) => {
    try {
        let res= await UrlStatus().post(`${id}/comments`, comment)
        return res.data;
    }catch (e) {
        console.log(e.response.data.message)
    }
}

export const updateComment = async (id,comment) => {
    try {
        const res = await UrlStatus().put(`comments/${id}`,comment);
        return res.data;
    }catch (e){
        console.log(e)
    }
}

export const deleteComment = async (id) => {
    try {
        const  res  = await UrlStatus().delete(`comments/${id}`);
        return res.data;
    }catch (e){
        console.log(e)
    }
}