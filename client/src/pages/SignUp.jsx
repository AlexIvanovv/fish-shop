import {useState} from "react";
import {register} from "../api/userApi";
import {useNavigate} from "react-router";

const SignUpForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await register(name, email, password);
            if (data.success) {
                navigate("/");
                window.location.reload();
            }
        } catch (e) {
            setError('Възникна грешка, моля опитайте отново.');
        } finally {
            setLoading(false);
        }
    }

    return (<div className={'wrapper bg-image'}>
            <div className={'w-50 h-50 bg-white d-flex rounded align-items-center justify-content-center'}>
                <form onSubmit={onRegister} className={'w-50'}>
                    <h4 className={'mb-4'}>Регистрация на потребител</h4>
                    <input className="form-control mb-2" type="text" placeholder="Име" value={name} onChange={(e) => setName(e.target.value)} />
                    <input className="form-control mb-2" type="email" placeholder="Емейл" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="form-control mb-2" type="password" placeholder="Парола" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error ? <p className={'text-danger mb-2'}>{error}</p> : null}
                    <button className="btn btn-outline-success mt-2" type="submit" disabled={loading || !email || !password || !name}>{'Регистрация'}</button>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm;