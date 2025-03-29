const OrdersTable = ({orders}) => {
    const totalPrice = orders.reduce((acc, cur) => acc + cur.total, 0);
    return (
        <table className="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Наименование на продукта</th>
                <th scope="col">Количество</th>
                <th scope="col">Ед. цена</th>
                <th scope="col">Сума</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order, index) => (
                <tr key={order.id}>
                    <th scope="row">{index+1}</th>
                <td>{order.name}</td>
                <td>{order.quantity}</td>
                <td>{order.price} BGN</td>
                    <td>{order.total} BGN</td>
                </tr>
            ))}
            <tr>
                <th scope="row"></th>
                <td className={'font-weight-bold'}>{'Общо дължима сума'} </td>
                <td></td>
                <td></td>
                <td className={'font-weight-bold'}>{totalPrice} BGN</td>
            </tr>
            </tbody>
        </table>
    )
};

export default OrdersTable;