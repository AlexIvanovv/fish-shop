import app from "../helpers/axiosConfig";

export const fetchUserData = async () => {
    try {
       const res =  await app.get(`api/users`, {});
       return res.data;
    } catch (error) {
        console.error(error)
        return Promise.reject(error);
    }
}

export const login = async (email, password) => {
    try {
        const res = await app.post(`api/users/login`, {email, password});
        if (res.data.success) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(
                res.data.user
            ));
        }
        return res.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const register = async (name, email, password) => {
    try {
        const res = await app.post(`api/users/register`, {name, email, password, role: 'user', orders: []});
        if (res.data.success) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(
                res.data.user
            ));
        }
        return res.data;
    } catch (error) {
        return Promise.reject(error);
    }
}