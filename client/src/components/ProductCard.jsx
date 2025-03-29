import {useState} from "react";
import useOrders from "../hooks/useOrders";

const ProductCard = (product) => {
    const {loading, error, addNewOrder} = useOrders();
    const {title, description, price, image, sku} = product;
    const [qty, setQty] = useState(0);
    const [displayFullText, setDisplayFullText] = useState(false);

    const toggleTextDisplay = () => {
        setDisplayFullText(!displayFullText);
    };

    const onOrderClick = async () => {
        await addNewOrder({items: [{product: sku, quantity: Number(qty), price: Number(price)}]});
        setQty(0);
    }

    return (
        <div className="card mb-5">
            <img width={200} height={200} src={image} className="card-img-top" alt={title}/>
            <hr/>
            <div className="card-body" style={displayFullText ? {} : {height: '200px'}}>
                <h5 className="card-title">{title}</h5>
                <span className="card-text mr-2">{displayFullText ? description : `${description.slice(0, 100)}...`}</span>
                    <a className='text-secondary' style={{cursor: 'pointer'}} onClick={toggleTextDisplay}>
                        {!displayFullText ? "Повече" : "По-малко"}
                    </a>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Цена: {price} BGN</li>
            </ul>
            <div className="card-body">
                <div className="container">
                    <div className="row row-cols-2 align-items-center" >
                        <div className="col">
                            <h6>Брой</h6>
                            <input type={'number'} className='w-75' placeholder={'Qty'} onChange={(e) => {
                                setQty(e.target.value)
                            }} value={qty}/>
                        </div>
                        <div className="col">
                                <button className="btn btn-primary mr-3" disabled={!qty || loading} onClick={onOrderClick}>Поръчай</button>
                            </div>

                            </div>
                        </div>
                    </div>
                </div>
                )
                }

                export default ProductCard;