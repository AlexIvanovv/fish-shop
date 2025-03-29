import useFetchProducts from "../hooks/useFetchProducts";
import Spinner from "../components/Spinner";
import ProductCard from "../components/ProductCard";
import {categories} from "./Admin";
import {useParams} from "react-router";

const Products = () => {
    const params = useParams();
    const {products, loading} = useFetchProducts();

    const category = categories.find(category => category.id === params.category) || {};

    if (loading) {
        return <Spinner />;
    }

    return (<div className="container">
        <h3 className={'text-center mb-5 mt-5'}>Всички продукти от категория {category.label || ''} </h3>
        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1">
            {products.map((product, index) => (<div className={'col'} key={index}><ProductCard {...product} /></div>))}
        </div>
    </div>)
}

export default Products;