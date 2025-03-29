import {useCallback, useEffect, useState} from "react";
import {createOrder, getUserOrders} from "../api/ordersApi";

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true)
           const data =  await getUserOrders();
           setOrders(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false)
        }
    }, []);


    const addNewOrder = async (data) => {
        setLoading(true);
        try {
            const newOrder = await createOrder(data);
            const newOrders = [...orders, {...data, _id: newOrder.insertedIds[0]}]
            setOrders(newOrders);
            document.getElementById('kolichka').innerHTML = newOrders.length;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);


    return {orders, addNewOrder, fetchOrders, loading, error};
}

export default useOrders;