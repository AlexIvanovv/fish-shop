import useFetchProducts from "../hooks/useFetchProducts";
import Spinner from "../components/Spinner";
import ProductCard from "../components/ProductCard";

const Home = ({addNewOrder, orderLoading}) => {
    const {products, loading} = useFetchProducts();

    if (loading) {
        return <Spinner />;
    }

    return (
        <div>
            <h3 className={'text-center mb-5 mt-5'}>Добре дошли в рибарски магазин Алекс</h3>
            <div className="container">
                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1">
                    {products.map((product, index) => (<div className={'col'} key={index}><ProductCard product={product} addNewOrder={addNewOrder} laoding={orderLoading} /></div>))}
                </div>
            </div>
        </div>
    )
}

export default Home;