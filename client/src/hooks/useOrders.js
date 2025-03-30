import {useCallback, useEffect, useState} from "react";
import {createOrder, deleteOrder, getUserOrders} from "../api/ordersApi";

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(false);

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true)
           const data =  await getUserOrders();
           setOrders(data);
           setInitialLoad(true);
            document.getElementById('kolichka').innerHTML = data.length;
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false)
        }
    }, []);


    const addNewOrder = async (data) => {
        setLoading(true);
        try {
            await createOrder(data);
            await fetchOrders();
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const removeOrder = async (id) => {
        try {
            await deleteOrder(id)
            await fetchOrders()
        } catch (error) {
            setError('Поръчката не може да бъде изтрита. Моля, опитайте по-късно.');
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !initialLoad) {
            fetchOrders();
        }
    }, [initialLoad]);


    return {orders, addNewOrder, removeOrder, fetchOrders, loading, error};
}

export default useOrders;