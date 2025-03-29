import app from "../helpers/axiosConfig";

export const createOrder = async (data) => {
    try {
        const res =  await app.post(`api/orders`, {...data});
        return res.data;
    } catch (error) {
        console.error(error)
        return Promise.reject(error);
    }
}

export const getUserOrders = async () => {
    try {
        const res =  await app.get(`api/orders`);
        return res.data;
    } catch (error) {
        console.error(error)
        return Promise.reject(error);
    }
}