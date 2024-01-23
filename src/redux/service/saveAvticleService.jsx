import {UrlSaveArticle} from "../../context/connect.jsx";

export const getAllSaveArticle = async (userId) => {
    try {
        const res = await UrlSaveArticle().get("", {
            params: {
                userId: userId
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching saved articles:', error);
        throw error;
    }
};


export const save = async (status) => {
    const res = await UrlSaveArticle().post("", { status });
    return res.data;
}

export const remove = async (articleId, userId) => {
    try {
        const res = await UrlSaveArticle().delete(`${articleId}?userId=${userId}`);
        return res.data;
    }catch (error) {
        console.error('Error removing article:', error);
    }
}