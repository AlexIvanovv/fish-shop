import useOrders from "../hooks/useOrders";
import OrdersTable from "../components/OrdersTable";

const Orders = () => {
    const {orders} = useOrders();


    return <div>
        <h3 className={'text-center mb-5 mt-5'}>Вашите поръчки</h3>
        <div className="container">
            <div className="row row-cols-sm-1">
                {orders.length > 0 ? <OrdersTable orders={orders} /> : <h4 className={'text-center mt-5'}>Вие нямате поръчки</h4>}
            </div>
        </div>
    </div>
}

export default Orders;