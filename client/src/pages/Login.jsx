import {useState} from "react";
import {login} from "../api/userApi";
import {useNavigate} from "react-router";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await login(email, password);
            if (data.success) {
               navigate("/");
                window.location.reload();
            }
        } catch (e) {
            setError('Грешен емейл или парола');
        } finally {
            setLoading(false);
        }
    }

    return (<div className={'wrapper bg-image'}>
            <div className={'w-50 h-50 bg-white d-flex rounded align-items-center justify-content-center'}>
                <form onSubmit={onLogin} className={'w-50'}>
                    <h4 className={'mb-4'}>Вход в магазина</h4>
                    <input className="form-control mb-2" type="email" placeholder="Емейл" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="form-control mb-2" type="password" placeholder="Парола" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error ? <p className={'text-danger mb-2'}>{error}</p> : null}
            <button className="btn btn-outline-success mt-2" type="submit" disabled={loading || !email || !password}>{'Вход'}</button>
        </form>
    </div>
        </div>
    )
}

export default LoginForm;