import {useCallback, useEffect, useState} from "react";
import { useParams } from "react-router"
import {getProducts} from "../api/productApi";

const useFetchProducts = () => {
    const params = useParams();
    const category = params.category;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getProducts(category);
            setProducts(data || []);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [category]);


    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    return {products, loading, error}

}

export default useFetchProducts;