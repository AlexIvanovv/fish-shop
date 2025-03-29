import Logo from '../assets/logo192.svg';
import Kolichka from '../assets/kolichka.svg';
import {Link, NavLink, useLocation, useNavigate} from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import useOrders from "../hooks/useOrders";

const Navbar = ({categories}) => {
    const {user} = useAuthUser();
    const {orders} = useOrders();
    const navigate = useNavigate();
    const location = useLocation();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <div className="container-fluid">

                <Link className="navbar-brand" to="/">
                    <img width={50} height={50} src={Logo} alt='logo' className={'mr-2'}/>
                    <span>Рибарски магазин Алекс</span>
                </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                        {categories.map(category => (
                            <li className="nav-item" key={category.id}>
                                <NavLink
                                    className="nav-link"
                                    active={location.pathname === `/products/${category.id}`}
                                    to={`/products/${category.id}`}
                                >{category.label}</NavLink>
                            </li>
                        ))}
                        {user?.role === 'admin' ? <li className="nav-item">
                            <NavLink className="nav-link" active={location.pathname === '/admin'} to="/admin">Админ панел</NavLink>
                        </li> : null}
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className={'nav-item'}>
                            {user ? <NavLink className={'nav-link mr-2'} active={location.pathname === '/orders'} to={'/orders'} >
                                <img width={30} height={30} src={Kolichka} alt='kolichka' />
                                <span id="kolichka" className="badge badge-pill badge-light">{orders.length}</span>
                            </NavLink> : <NavLink className={'nav-link'} active={location.pathname === '/login'} to={'/login'}>Вход</NavLink>}
                        </li>
                        <li>
                            {user ? <NavLink to='' className={'nav-link'} onClick={logoutHandler}>Изход</NavLink> : <NavLink className={'nav-link'} active={location.pathname === '/signup'} to={'/signup'}>Регистрация</NavLink>}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;