import {useState} from "react";
import {createProduct} from "../api/adminApi";

export const categories = [
    {label: "Кепове", id: "caps"},
    {label: "Въдици", id: "rods"},
    {label: "Куки", id: "hooks"}
]

const Admin = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [sku, setSku] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [errors, setErrors] = useState({});

    const validate = () => {
        if (price <= 0) {
            setErrors((errors) => ({...errors, price: 'Цената трябва да бъде положително число'}));
            return false;
        }
        if (!category) {
            setErrors((errors) => ({...errors, category: 'Поле категория е задължително'}));
            return false;
        }
        if (!title) {
            setErrors((errors) => ({...errors, title: 'Поле заглавие е задължително'}));
            return false;
        }
        if (!description) {
            setErrors((errors) => ({...errors, description: 'Пожоле описание е задължително'}));
            return false;
        }
        if (!sku) {
            setErrors((errors) => ({...errors, sku: 'Поле код на продукта е задлжително'}));
            return false;
        }
        if (!imageUrl) {
            setErrors((errors) => ({...errors, imageUrl: 'Снимката на продукта е задължителна'}));
            return false;
        }
        return true;
    }

    const resetForm = () => {
        setImageUrl('');
        setTitle('');
        setDescription('');
        setCategory('');
        setSku('');
        setErrors({});
        setIsValid(true);
    }

    const onCreate = async () => {
            const isValid = validate();
            setIsValid(isValid);
            if (!isValid) return;
            setLoading(true);
            try {
                const product = {
                    title,
                    category,
                    description,
                    sku,
                    price: Number(price),
                    image: imageUrl
                }
                await createProduct(product);
                resetForm();
            } catch (e) {
                setError("Възникна грешка, моля опитайте отново");
            } finally {
                setLoading(false);
            }
    }

    return (<div className={'wrapper bg-image'}>
        <div className={'w-75 h-75 bg-white d-flex rounded align-items-center justify-content-center'}>
            <form onSubmit={onCreate} className={'w-75'}>
                <h4 className={'mb-4'}>Създай нов продукт в магазина</h4>
                <input className="form-control mb-3" type="text" placeholder="Заглавие" value={title}
                       onChange={(e) => setTitle(e.target.value)}/>
                <span className={'text-danger  mb-2'}>{errors.title}</span>
                <div className="btn-group w-100 mb-3">
                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                            aria-expanded="false">
                        Избери категория
                    </button>
                    <div className="dropdown-menu">
                        <span className={`dropdown-item-text ${category === categories[0].id ? 'text-primary' : ''}`} onClick={() => setCategory(categories[0].id)}>{categories[0].label}</span>
                        <div className="dropdown-divider"></div>
                        <span className={`dropdown-item-text ${category === categories[1].id ? 'text-primary' : ''}`} onClick={() => setCategory(categories[1].id)}>{categories[1].label}</span>
                        <div className="dropdown-divider"></div>
                        <span className={`dropdown-item-text ${category === categories[2].id ? 'text-primary' : ''}`} onClick={() => setCategory(categories[2].id)}>{categories[2].label}</span>
                    </div>
                </div>
                <span className={'text-danger mb-2'}>{errors.category}</span>
                <textarea className="form-control mb-3" placeholder="Описание" value={description}
                       onChange={(e) => setDescription(e.target.value)}/>
                <span className={'text-danger mb-2'}>{errors.description}</span>
                <input className="form-control mb-3" type="text" placeholder="Код на продукта" value={sku}
                       onChange={(e) => setSku(e.target.value)}/>
                <span className={'text-danger mb-2'}>{errors.sku}</span>
                <input className="form-control mb-3" type="url" placeholder="Снимка на продукта" value={imageUrl}
                       onChange={(e) => setImageUrl(e.target.value)} />
                <span className={'text-danger mb-2'}>{errors.imageUrl}</span>
                <p>Цена:</p>
                <input className="form-control mb-3" type="number" value={price}
                       onChange={(e) => setPrice(e.target.value)}/>
                <span className={'text-danger mb-2'}>{errors.price}</span>
                {error ? <p className={'text-danger mb-2'}>{error}</p> : null}
                <button className="btn btn-outline-success mt-2" type="submit"
                        disabled={loading || !isValid}>{'Създай'}</button>
            </form>
        </div>
    </div>)
};


export default Admin;