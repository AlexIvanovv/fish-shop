import useFetchProducts from "../hooks/useFetchProducts";
import Spinner from "../components/Spinner";

const Products = () => {
    const {products, loading} = useFetchProducts();

    if (loading) {
        return <Spinner />;
    }
    return (<div>Products per category</div>)
}

export default Products;