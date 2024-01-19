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

export const editComment= async(id,comment)=>{
    return await UrlStatus().put(`/comments/${id}`,comment)
        .then(res => res.data)
        .catch(e => {
            if (e.response.data){
                throw new Error(e.response.data.message)
            }else{
                throw new Error(e.response.data.status)
            }

    })
}

export const likeComment = async(id)=>{
   return  await UrlStatus().post(`/comments/${id}/like`)
}