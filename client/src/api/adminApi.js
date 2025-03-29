import app from "../helpers/axiosConfig";

export const createProduct = async (data) => {
    try {
        const res =  await app.post(`api/products`, {...data});
        return res.data;
    } catch (error) {
        console.error(error)
        return Promise.reject(error);
    }
}