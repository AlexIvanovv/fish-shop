import app from "../helpers/axiosConfig";

export const getProducts = async (category) => {
    try {
        const res =  await app.get(category ? `api/products?category=${category}` : `api/products`);
        return res.data;
    } catch (error) {
        console.error(error)
        return Promise.reject(error);
    }
}