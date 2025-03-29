import OrdersTable from "../components/OrdersTable";
import useOrders from "../hooks/useOrders";

const Orders = () => {

    const {orders, error, removeOrder} = useOrders();

    return <div>
        <h3 className={'text-center mb-5 mt-5'}>Вашите поръчки</h3>
        <div className="container">
            {error ? <div className={'text-danger text-center'}>{error}</div> : null}
            <div className="row row-cols-sm-1">
                {orders.length > 0 ? <OrdersTable orders={orders} removeOrder={removeOrder}/> : <h4 className={'text-center mt-5'}>Вие нямате поръчки</h4>}
            </div>
        </div>
    </div>
}

export default Orders;